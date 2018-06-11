using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace NGTask.Migrations
{
    public partial class revertingAddAccountMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Accounts_AccountType_AccountType",
                table: "Accounts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AccountType",
                table: "AccountType");

            migrationBuilder.RenameTable(
                name: "AccountType",
                newName: "AccountTypes");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AccountTypes",
                table: "AccountTypes",
                column: "Type");

            migrationBuilder.AddForeignKey(
                name: "FK_Accounts_AccountTypes_AccountType",
                table: "Accounts",
                column: "AccountType",
                principalTable: "AccountTypes",
                principalColumn: "Type",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Accounts_AccountTypes_AccountType",
                table: "Accounts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AccountTypes",
                table: "AccountTypes");

            migrationBuilder.RenameTable(
                name: "AccountTypes",
                newName: "AccountType");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AccountType",
                table: "AccountType",
                column: "Type");

            migrationBuilder.AddForeignKey(
                name: "FK_Accounts_AccountType_AccountType",
                table: "Accounts",
                column: "AccountType",
                principalTable: "AccountType",
                principalColumn: "Type",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
