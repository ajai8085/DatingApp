using System.Threading.Tasks;
using DatingApp.API.Model;

namespace DatingApp.API.Data
{
    public interface IAuthRepository
    {
        Task<User> Register(User userForRegisteration, string password);
        Task<User> Login(string userName, string password);
        Task<bool> UserExists(string userName);
    }
}