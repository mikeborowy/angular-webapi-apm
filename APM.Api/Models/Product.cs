using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace APM.WebAPI.Models
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }

        [Required(AllowEmptyStrings =false, ErrorMessage = "Product Name is required")]
        [MinLength(5, ErrorMessage = "Product Name min length is 5 characters")]
        [MaxLength(11, ErrorMessage = "Product Name max length is 11 characters")]
        public string ProductName { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Product Code is required")]
        [MinLength(6, ErrorMessage = "Product Code min length is 6 characters")]
        public string ProductCode { get; set; }
        public DateTime ReleaseDate { get; set; }

    }
}