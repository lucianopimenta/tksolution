﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace TKSolution.Data.Migrations
{
    public partial class MudançadocampoTypeClassDocumentparaenum : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "class_document",
                table: "Professional",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "class_document",
                table: "Professional",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
