using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Restapi.Models
{
    [Table("Рекорди")]
    public class Score
    {
        [Key]
        [Column("Код рекорду")]
        public int Id { get; set; }

        [Column("Очки")]
        public int Value { get; set; }

        [Column("Дата встановлення")]
        public string Date { get; set; } = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");

        [Column("Код гравця")]
        public int PlayerId { get; set; }

        [ForeignKey("PlayerId")]
        public Player? Player { get; set; }
    }
}