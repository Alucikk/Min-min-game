using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Restapi.Models;
[Table("Гравці")]
public class Player
{
    [Key]
    [Column("Код гравця")]
    public int Id { get; set; }

    [Column("Назва гравця")]
    public string Name { get; set; } = string.Empty;

    [Column("Дата реєстрації")]
    public DateTime RegisteredAt { get; set; } = DateTime.Now;
}