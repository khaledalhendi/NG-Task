using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace NGTask.Migrations
{
    public partial class AddedClassCodeToAccount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ClassCode",
                table: "Accounts",
                type: "char(3)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_ClassCode",
                table: "Accounts",
                column: "ClassCode");

            migrationBuilder.AddForeignKey(
                name: "FK_Accounts_ClassCodes_ClassCode",
                table: "Accounts",
                column: "ClassCode",
                principalTable: "ClassCodes",
                principalColumn: "Code",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Accounts_ClassCodes_ClassCode",
                table: "Accounts");

            migrationBuilder.DropIndex(
                name: "IX_Accounts_ClassCode",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "ClassCode",
                table: "Accounts");
        }
    }
}
