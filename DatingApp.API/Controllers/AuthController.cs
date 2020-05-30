using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repository;
        private readonly IConfiguration _config;
        public AuthController(IAuthRepository repository, IConfiguration config)
        {
            _config = config;
            _repository = repository;
        }

        [HttpPost]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            if (await _repository.UserExists(userForRegisterDto.UserName))
                return BadRequest("User name already exists");

            var userToCreate = new User
            {
                UserName = userForRegisterDto.UserName,
            };

            var createdUser = await _repository.Register(userToCreate, userForRegisterDto.Password);
            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForRegisterDto userForLoginDto)
        {
            var userFormRepo = await _repository.Login(userForLoginDto.UserName.ToLower(), userForLoginDto.Password);

            if (userFormRepo == null)
                return Unauthorized();
            //2 bits at the momement , user's id and user's username 
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFormRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFormRepo.UserName)
            };

            var secret = _config.GetSection("AppSettings:Token").Value;
            // Generate the key for security , create a key 
            var key = new SymmetricSecurityKey(Encoding.UTF8
            .GetBytes(secret));

            //Create credentials out of the key 
            var credes = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            //Create token descriptor and add claims and signing credentials
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credes
            };

            //Create taoken handler and generate token using token descriptor and write generated token to response 
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenToSend = new { token = tokenHandler.WriteToken(token) };
            return Ok(tokenToSend);
        }
    }
}