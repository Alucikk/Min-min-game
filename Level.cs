using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Restapi.Models
{
    [Table("Рівні")]
    public class Level
    {
        [Key]
        [Column("Код рівня")]
        public int Id { get; set; }

        [Column("Назва рівня")]
        public string Name { get; set; } = string.Empty;

        [Column("Складність")]
        public string Difficulty { get; set; } = "Easy";
    }
}