using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ToDoApp.Data.Models;

namespace ToDoApp.WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private readonly ToDoAppContext _toDoAppContext;

        public ToDoController(ToDoAppContext toDoAppContext)
        {
            _toDoAppContext = toDoAppContext;
        }

        [HttpGet(Name = "GetToDoItems")]
        public IEnumerable<ToDoItem> GetToDoItems()
        {
            var items = (from t in _toDoAppContext.ToDoItems
                         select t).ToList();

            if (items == null)
            {
                return null;
            }
            else
            {
                return items;
            }
        }

        [HttpPost(Name = "AddToDoItem")]
        public int AddToDoItem([FromBody]ToDoItem toDoItem)
        {
            try
            {
                _toDoAppContext.ToDoItems.Add(toDoItem);
                _toDoAppContext.SaveChanges();
                return toDoItem.ToDoItemID;
            }
            catch (Exception ex) 
            {
                // log the error
                return 0;
            }
        }

        [HttpPost(Name = "UpdateToDoItem")]
        public int UpdateToDoItem(ToDoItem toDoItem)
        {
            try
            {
                var dbToDoItem = (from t in _toDoAppContext.ToDoItems
                                  where t.ToDoItemID == toDoItem.ToDoItemID
                                  select t).FirstOrDefault();

                if (dbToDoItem == null)
                {
                    return 0;
                }
                else
                {
                    dbToDoItem.Name = toDoItem.Name;
                    dbToDoItem.Description = toDoItem.Description;
                    dbToDoItem.Status = toDoItem.Status;
                    dbToDoItem.DueDate = toDoItem.DueDate;
                    dbToDoItem.LastModifiedDateTime = DateTime.Now;
                    _toDoAppContext.SaveChanges();
                    return dbToDoItem.ToDoItemID;
                }
            }
            catch (Exception ex) 
            { 
                // log the error
                return 0;
            }
        }

        [HttpPost(Name = "DeleteToDoItem")]
        public void DeleteToDoItem([FromBody] int id)
        {
            try
            {
                var dbToDoItem = (from t in _toDoAppContext.ToDoItems
                                  where t.ToDoItemID == id
                                  select t).FirstOrDefault();
                if (dbToDoItem == null)
                {
                    return;
                }
                else
                {
                    _toDoAppContext.ToDoItems.Remove(dbToDoItem);
                    _toDoAppContext.SaveChanges();
                    return;
                }
            }
            catch (System.Exception ex)
            {
                // log the error
            }
        }

    }
}
