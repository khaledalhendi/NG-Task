﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using NG_Task.Entities;
using System;

namespace NGTask.Migrations
{
    [DbContext(typeof(NGContext))]
    [Migration("20180605115056_AddedAccountType")]
    partial class AddedAccountType
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.3-rtm-10026")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("NG_Task.Entities.Account", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AccountType")
                        .IsRequired()
                        .HasColumnType("char(2)");

                    b.Property<decimal>("Balance")
                        .HasColumnType("decimal(21,6)");

                    b.Property<string>("CurrencyISO")
                        .IsRequired()
                        .HasColumnType("char(3)");

                    b.Property<int>("CustomerId");

                    b.HasKey("Id");

                    b.HasIndex("AccountType");

                    b.HasIndex("CurrencyISO");

                    b.HasIndex("CustomerId");

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("NG_Task.Entities.AccountType", b =>
                {
                    b.Property<string>("Type")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(2)");

                    b.HasKey("Type");

                    b.ToTable("AccountType");
                });

            modelBuilder.Entity("NG_Task.Entities.Currency", b =>
                {
                    b.Property<string>("ISO")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(3)");

                    b.Property<decimal>("Multiplier")
                        .HasColumnType("decimal(21,6)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(25)");

                    b.HasKey("ISO");

                    b.ToTable("Currencies");
                });

            modelBuilder.Entity("NG_Task.Entities.Customer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasMaxLength(50);

                    b.Property<DateTime>("OpenDate")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("NG_Task.Entities.Account", b =>
                {
                    b.HasOne("NG_Task.Entities.AccountType", "Type")
                        .WithMany()
                        .HasForeignKey("AccountType")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("NG_Task.Entities.Currency", "Currency")
                        .WithMany()
                        .HasForeignKey("CurrencyISO")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("NG_Task.Entities.Customer", "Customer")
                        .WithMany("Accounts")
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
