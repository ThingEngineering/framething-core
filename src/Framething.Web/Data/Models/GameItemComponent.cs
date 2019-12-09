using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Framething.Web.Data
{
    public class GameItemComponent
    {
        public int ItemId { get; set; }
        public GameItem Item { get; set; }

        public int ComponentId { get; set; }
        public GameItem Component { get; set; }

        public int Count { get; set; }
        public bool IsResource { get; set; }
    }
}
