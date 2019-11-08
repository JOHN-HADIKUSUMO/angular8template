using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Angular8Template.Models
{
    public class Gallery
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int GalleryId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string URL { get; set; }
        [Required]
        public decimal Price { get; set; }
    }
}
