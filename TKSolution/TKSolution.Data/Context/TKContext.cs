using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using TKSolution.Core.Interface;
using TKSolution.Core.Service;
using TKSolution.Data.Entities;

namespace TKSolution.Data.Context
{
    public class TKContext : DbContext, IDbContext
    {
        public TKContext() { }

        public TKContext(DbContextOptions<TKContext> options) : base(options)
        {
            Database.SetCommandTimeout(300);
        }

        public virtual DbSet<Professional> Professional { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer(ConectionStringService.connectionString());
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Professional>(entity =>
            {
                entity.HasKey(e => e.Code)
                    .HasName("pk_professional");

                entity.Property(e => e.Code)
                    .HasColumnName("code")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                   .HasColumnName("name");

                entity.Property(e => e.CPF)
                    .IsRequired()
                    .HasMaxLength(11)
                   .HasColumnName("cpf");

                entity.Property(e => e.CPF)
                    .IsRequired()
                    .HasMaxLength(11)
                   .HasColumnName("cpf");

                entity.Property(e => e.TypeClassDocument)
                    .IsRequired()
                   .HasColumnName("class_document");

                entity.Property(e => e.TypeNumber)
                    .IsRequired()
                    .HasMaxLength(15)
                   .HasColumnName("number_class_document");

                entity.Property(e => e.Status)
                    .IsRequired()
                   .HasColumnName("status");

                entity.Property(e => e.CreatedDate)
                    .IsRequired()
                    .HasDefaultValueSql("(getdate())")
                    .HasColumnName("created_date");

                entity.Property(e => e.UpdateDate)
                    .HasColumnName("update_date");
            });
        }

        #region Transação
        public IDbContextTransaction BeginTransaction()
        {
            return Database.BeginTransaction();
        }
        public void Commit()
        {
            Database.CommitTransaction();
        }
        public DbContext Ctx()
        {
            return this;
        }
        public void Rollback()
        {
            Database.RollbackTransaction();
        }
        #endregion
    }
}
