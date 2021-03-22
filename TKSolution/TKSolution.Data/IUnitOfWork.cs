using System;
using TKSolution.Core.Interface;
using TKSolution.Core.Repository;

namespace TKSolution.Data
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<TEntity> GetRepository<TEntity>() where TEntity : class;
        int Commit();
        IDbContext GetDbContext();
    }
}
