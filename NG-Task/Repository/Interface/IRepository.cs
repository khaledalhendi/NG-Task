using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace NG_Task.Repository
{
    public interface IRepository<IEntity> where IEntity : class
    {
        IEntity Get(int id);
        IEnumerable<IEntity> GetAll();

        IEnumerable<IEntity> Find(Expression<Func<IEntity, bool>> predicate);

        void Add(IEntity entity);
        void AddMany(IEnumerable<IEntity> entities);

        void Remove(IEntity entity);
        void RemoveMany(IEnumerable<IEntity> entities); 
    }
}
