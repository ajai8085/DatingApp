using System.Linq;
using System.IO;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Security.Cryptography;

namespace DatingApp.API.Data
{
    public static class Seed
    {
        public static void SeedUsers(ApplicationDbContext context)
        {
            if (!context.Users.Any())
            {
                var userData = File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<Model.User>>(userData);
                foreach (var item in users)
                {
                    byte[] passwordHash, passwordSalt;
                    CreatePasswordHash("password", out passwordHash, out passwordSalt);
                    item.PasswordHash = passwordHash;
                    item.PasswordSalt = passwordSalt;
                    item.UserName = item.UserName.ToLower();
                    context.Users.Add(item);
                }
                context.SaveChanges();
            }
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}