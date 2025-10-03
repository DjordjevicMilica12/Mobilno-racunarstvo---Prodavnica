using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Prodavnica_backend.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var servicePath = Path.Combine(builder.Environment.ContentRootPath, "prodavnica-mob-rac-firebase-adminsdk-xfywz-168a433b10.json");
if (FirebaseApp.DefaultInstance == null)
{
    FirebaseApp.Create(new AppOptions()
    {
        Credential = GoogleCredential.FromFile(servicePath)
    });
}

var json= File.ReadAllText(servicePath);
var projectId= System.Text.Json.JsonDocument.Parse(json).RootElement.GetProperty("project_id").GetString();
var credential = GoogleCredential.FromFile(servicePath);
var firestoreDb = new FirestoreDbBuilder
{
    ProjectId = projectId,
    Credential = credential
}.Build();


builder.Services.AddSingleton(firestoreDb);
builder.Services.AddHttpClient<AuthService>();
builder.Services.AddSingleton<ProizvodService>();
builder.Services.AddSingleton<PorudzbinaService>();
builder.Services.AddSingleton<KorisnikService>();
builder.Services.AddSingleton<RecenzijaService>();

var key = Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Key"]);
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
});

var app = builder.Build();

app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.UseAuthorization();

app.MapControllers();

app.Run();
