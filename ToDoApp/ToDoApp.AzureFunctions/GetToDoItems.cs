using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using ToDoApp.Data.Models;

namespace ToDoApp.AzureFunctions
{
    public class GetToDoItems
    {
        private readonly ILogger<GetToDoItems> _logger;
        private readonly ToDoAppContext _toDoAppContext;

        public GetToDoItems(ILogger<GetToDoItems> logger, ToDoAppContext toDoAppContext)
        {
            _logger = logger;
            _toDoAppContext = toDoAppContext;
        }

        [Function("GetToDoItems")]
        public IActionResult Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequest req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            var toDoItems = (from t in _toDoAppContext.ToDoItems
                             select t).ToList();

            string jsonString = JsonSerializer.Serialize(toDoItems);

            return new OkObjectResult(jsonString);
        }
    }
}
