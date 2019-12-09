using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Framething.Web.Data
{
    public class GameItemDrop
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public GameItem Item;
        public string Location;
        public string Type;
        public string Rotation;
        public string Rarity;
        public decimal Chance;
    }
}
