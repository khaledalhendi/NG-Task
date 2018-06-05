using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace NGTask.Migrations
{
    public partial class AddedAccountType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Currencies",
                type: "varchar(25)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(10)");

            migrationBuilder.AddColumn<string>(
                name: "AccountType",
                table: "Accounts",
                type: "char(2)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "AccountType",
                columns: table => new
                {
                    Type = table.Column<string>(type: "char(2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccountType", x => x.Type);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_AccountType",
                table: "Accounts",
                column: "AccountType");

            migrationBuilder.AddForeignKey(
                name: "FK_Accounts_AccountType_AccountType",
                table: "Accounts",
                column: "AccountType",
                principalTable: "AccountType",
                principalColumn: "Type",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Accounts_AccountType_AccountType",
                table: "Accounts");

            migrationBuilder.DropTable(
                name: "AccountType");

            migrationBuilder.DropIndex(
                name: "IX_Accounts_AccountType",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "AccountType",
                table: "Accounts");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Currencies",
                type: "varchar(10)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(25)");
        }
    }
}
