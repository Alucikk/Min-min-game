using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Restapi.Migrations
{
    /// <inheritdoc />
    public partial class InitialAccessSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Гравці",
                columns: table => new
                {
                    Кодгравця = table.Column<int>(name: "Код гравця", type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Назвагравця = table.Column<string>(name: "Назва гравця", type: "TEXT", nullable: false),
                    Датареєстрації = table.Column<DateTime>(name: "Дата реєстрації", type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Гравці", x => x.Кодгравця);
                });

            migrationBuilder.CreateTable(
                name: "Рівні",
                columns: table => new
                {
                    Кодрівня = table.Column<int>(name: "Код рівня", type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Назварівня = table.Column<string>(name: "Назва рівня", type: "TEXT", nullable: false),
                    Складність = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Рівні", x => x.Кодрівня);
                });

            migrationBuilder.CreateTable(
                name: "Рекорди",
                columns: table => new
                {
                    Кодрекорду = table.Column<int>(name: "Код рекорду", type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Очки = table.Column<int>(type: "INTEGER", nullable: false),
                    Датавстановлення = table.Column<string>(name: "Дата встановлення", type: "TEXT", nullable: false),
                    Кодгравця = table.Column<int>(name: "Код гравця", type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Рекорди", x => x.Кодрекорду);
                    table.ForeignKey(
                        name: "FK_Рекорди_Гравці_Код гравця",
                        column: x => x.Кодгравця,
                        principalTable: "Гравці",
                        principalColumn: "Код гравця",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Рекорди_Код гравця",
                table: "Рекорди",
                column: "Код гравця");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Рекорди");

            migrationBuilder.DropTable(
                name: "Рівні");

            migrationBuilder.DropTable(
                name: "Гравці");
        }
    }
}
