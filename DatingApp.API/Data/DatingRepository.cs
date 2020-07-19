using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Model;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DatingRepository : IDatingRepository
    {
        private readonly ApplicationDbContext _context;
        public DatingRepository(ApplicationDbContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);

        }

        public Task<User> GetUser(int userId)
        {
            return _context.Users.Include(x => x.Photos).FirstAsync(user => user.Id == userId);
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _context.Users.Include(x => x.Photos).ToListAsync();
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}