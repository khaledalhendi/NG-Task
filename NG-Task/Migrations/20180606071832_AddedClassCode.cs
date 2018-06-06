using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace NGTask.Migrations
{
    public partial class AddedClassCode : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ClassCodes",
                columns: table => new
                {
                    Code = table.Column<string>(type: "char(3)", nullable: false),
                    AccountType = table.Column<string>(type: "char(2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClassCodes", x => x.Code);
                    table.ForeignKey(
                        name: "FK_ClassCodes_AccountTypes_AccountType",
                        column: x => x.AccountType,
                        principalTable: "AccountTypes",
                        principalColumn: "Type",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClassCodes_AccountType",
                table: "ClassCodes",
                column: "AccountType");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClassCodes");
        }
    }
}
