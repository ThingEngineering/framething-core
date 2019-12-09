using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Framething.Web.Data
{
    public class GameItem
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string UniqueName { get; set; }
        public string ImageName { get; set; }
        public byte Category { get; set; }
        public byte SubCategory { get; set; }

        [InverseProperty("Item")]
        public List<GameItemComponent> Components { get; set; }
        public List<GameItemDrop> Drops { get; set; }
    }
}
