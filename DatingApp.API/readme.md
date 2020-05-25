Add packages 
    1. Microsoft.EntityFrameworkCore
    2. Microsoft.EntityFrameworkCore.Sqlite
    3. Microsoft.EntityFrameworkCore.Design

Install the dotnet too to run the migration 
`dotnet tool install --global dotnet-ef`
To list down the commands supported
`dotnet ef -h` 
Create the migration `dotnet ef migrations add InitialCreate`

Note: Make sure that all the versions are same 