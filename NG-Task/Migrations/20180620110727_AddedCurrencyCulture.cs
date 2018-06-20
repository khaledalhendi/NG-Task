using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace NGTask.Migrations
{
    public partial class AddedCurrencyCulture : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Culture",
                table: "Currencies",
                type: "varchar(5)",
                nullable: false,
                defaultValue: "error");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Culture",
                table: "Currencies");
        }
    }
}
