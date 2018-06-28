using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace NG_Task.Repository
{
    public class Repository<IEntity> : IRepository<IEntity> where IEntity : class
    {
        protected readonly DbContext Context;

        public Repository(DbContext context)
        {
            Context = context; 
        }

        public void Add(IEntity entity)
        {
            Context.Set<IEntity>().Add(entity); 
        }

        public void AddMany(IEnumerable<IEntity> entities)
        {
            Context.Set<IEntity>().AddRange(entities); 
        }

        public IEnumerable<IEntity> Find(Expression<Func<IEntity, bool>> predicate)
        {
            return Context.Set<IEntity>().Where(predicate); 
        }

        public IEntity Get(int id)
        {
            return Context.Set<IEntity>().Find(id); 
        }

        public IEnumerable<IEntity> GetAll()
        {
            return Context.Set<IEntity>().ToArray();
        }

        public void Remove(IEntity entity)
        {
            Context.Set<IEntity>().Remove(entity); 
        }

        public void RemoveMany(IEnumerable<IEntity> entities)
        {
            Context.Set<IEntity>().RemoveRange(entities); 
        }
    }
}
