using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace NGTask.Migrations
{
    public partial class addedCurrency : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CurrencyISO",
                table: "Accounts",
                type: "char(3)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Currencies",
                columns: table => new
                {
                    ISO = table.Column<string>(type: "char(3)", nullable: false),
                    Multiplier = table.Column<decimal>(type: "decimal(21,6)", nullable: false),
                    Name = table.Column<string>(type: "varchar(25)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Currencies", x => x.ISO);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_CurrencyISO",
                table: "Accounts",
                column: "CurrencyISO");

            migrationBuilder.AddForeignKey(
                name: "FK_Accounts_Currencies_CurrencyISO",
                table: "Accounts",
                column: "CurrencyISO",
                principalTable: "Currencies",
                principalColumn: "ISO",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Accounts_Currencies_CurrencyISO",
                table: "Accounts");

            migrationBuilder.DropTable(
                name: "Currencies");

            migrationBuilder.DropIndex(
                name: "IX_Accounts_CurrencyISO",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "CurrencyISO",
                table: "Accounts");
        }
    }
}
