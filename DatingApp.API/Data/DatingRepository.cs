using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Helpers;
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

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var user = _context.Users.Include(x => x.Photos)
                    .Where(user => user.Gender == userParams.Gender)
                    .Where(user => user.Id != userParams.UserId);
            if (userParams.MinAge != 18 || userParams.MaxAge != 99)
            {
                var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
                var maxDob = DateTime.Today.AddYears(-userParams.MinAge - 1);
                user = user.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);
            }
            return await PagedList<User>.CreateAsync(user, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}