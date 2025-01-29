using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace ToDoApp.AzureFunctions
{
    public class AddToDoItem
    {
        private readonly ILogger<AddToDoItem> _logger;

        public AddToDoItem(ILogger<AddToDoItem> logger)
        {
            _logger = logger;
        }

        [Function("AddToDoItem")]
        public IActionResult Run([HttpTrigger(AuthorizationLevel.Anonymous, "post")] HttpRequest req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");
            return new OkObjectResult("Welcome to Azure Functions!");
        }
    }
}
