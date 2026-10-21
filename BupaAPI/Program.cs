using BookAPI.Models;
using BupaAPI.Repositories;
using BupaAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod());
});
// Enable response compression to handle gzip
builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
});
builder.Services.AddScoped<IBoookService, BookRepo>();
var app = builder.Build();
app.UseResponseCompression();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
// Custom Middleware to append headers to every response
app.Use(async (context, next) =>
{
    context.Response.OnStarting(() =>
    {
        if (!context.Response.Headers.ContainsKey("x-cdn"))
        {
            context.Response.Headers.Append("x-cdn", "Imperva");
        }

        if (!context.Response.Headers.ContainsKey("x-iinfo"))
        {
            context.Response.Headers.Append("x-iinfo", "18-1237545-1237673 SNYN RT(1792298402922 10103) q(0 0 0 -1) r(2 2) U12");
        }

        return Task.CompletedTask;
    });

    await next();
});
app.UseHttpsRedirection();
app.UseCors("AllowReactApp");
app.UseAuthorization();

app.MapControllers();

app.Run();
