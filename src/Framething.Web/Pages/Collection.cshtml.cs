using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace Framething.Web.Pages
{
    public class CollectionModel : PageModel
    {
        private readonly ILogger<CollectionModel> _logger;

        public CollectionModel(ILogger<CollectionModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {

        }
    }
}
