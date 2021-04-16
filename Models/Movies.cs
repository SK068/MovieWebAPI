using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MovieWebAPI.Models
{
    //Modal Name
    public class Movies
    {
        [Key]//primary key
        public int Id { get; set; }//ID
        public string Title { get; set; }//Movie's Title
        public string  Plot { get; set; }//Movie's plot
        public string Genre { get; set; }//Genre of movie
        public int Rating { get; set; }//Ratings of Movie

    }
}
