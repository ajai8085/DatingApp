Add packages 1. Microsoft.EntityFrameworkCore 2. Microsoft.EntityFrameworkCore.Sqlite 3. Microsoft.EntityFrameworkCore.Design

Install the dotnet too to run the migration
`dotnet tool install --global dotnet-ef`
To list down the commands supported
`dotnet ef -h`
Create the migration `dotnet ef migrations add InitialCreate`

Note: Make sure that all the versions are same
Add migration
`dotnet ef migrations add AddedUserEntity`
Remove the added migration
`dotnet ef migrations remove`
Execute the database structure on the database 
`dotnet ef database update`
Revert the database update
`dotnet ef database update "name of migration here eg: InitialCreate"`
Drop database 
`dotnet ef database drop`
Seeding database example : 

# Safe storage of sensitive information in .net core 
1. Avoid the file to gitignore list gotot terminal window and `git rm appsettings.json --cached`
2. Server in environmenet variables to store secrets information or use .net user secrets 
3. execute the command to list down the option to store development secrets `dotnet user-secrets` ref more here in this link https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-3.1&tabs=linux
4. These user secrets are only available when we are in development mode ie when Properties\launchSettings.json::ASPNETCORE_ENVIRONMENT is in production 
`dotnet user-secrets init`
`dotnet user-secrets list`
`dotnet user-secrets set "AppSettings:Token" "here is my super secret"` now this value will be saved in 

# DI

Per request
services.AddScoped

Validation
-- Model state validation made easy by controller level `[ApiController]` attribute . Other wise we need to have following validation around every request handler
`if (!ModelState.IsValid) return BadRequest(ModelState);`

Attribute `[FromBody]` helps in identifying where to read the input from , unfortunately this will set all string to emptry string by default instead of null

## Token Authentication

JWT token contains credentials and claims
header {"alg":"HS512", "type":"JWT"} {expiray}, secret , payload

HEADER|PAYLOAD|SIGNATURE
Packckages for .net core 3.x
Microsoft.IdentityModel.Tokens
System.IdentityModel.Tokens.Jwt

#Generating a jwt token example

` var claims = new[]
{
new Claim(ClaimTypes.NameIdentifier, userFormRepo.Id.ToString()),
new Claim(ClaimTypes.Name, userFormRepo.UserName)
};

            // Generate the key for security
            var key = new SymmetricSecurityKey(Encoding.UTF8
            .GetBytes(_config.GetSection("AppSettings:Token").Value));

            //Create credentials out of the key
            var credes = new SigningCredentials(key, SecurityAlgorithms.Aes256CbcHmacSha512);

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
            return Ok(tokenToSend);`

Adding authorization middleware to autothorize using the token
Microsoft.AspNetCore.Authentication.JwtBearer

git rm --cached appsettings.json to remove it form git ignore

--Save dotnet secret
Initialize the dotnet secrets by running following command
we can remove , appsettings

dotnet user-secrets init
dotnet user-secrets set "AppSettings:Token" "xxxxxx"
dotnet user-secrets list

in production we do not have access to user-secrets , we need to have it in environment settings .

#setting up global exception handler in asp.net core
to unwrap the error user should be creating an error interceptor and unwrap the server error , model error etc

install alertify and alertify types will not work (npm install @types/alertifyjs)
However , to have the types , create a typing.d.ts add the line `declare module 'alertifyjs';`
open up tsconfig.json and reference the file `typing.d.ts` to the compilier options add the array `"typeRoots": ["src/typings.d.ts"]`
Routing , Protecting routes using guards etc
Pathmatch : full , full path of url
Route guards (Protecting with auth guards using child route )
