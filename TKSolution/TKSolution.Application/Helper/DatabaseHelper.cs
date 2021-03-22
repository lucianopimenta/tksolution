using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TKSolution.Core.Interface;
using TKSolution.Core.Service;
using TKSolution.Data.Context;

namespace TKSolution.Application.Helper
{
    public static class DatabaseHelper
    {
        public static void ConfigureService(IServiceCollection services)
        {
            var stringConexaoComBancoDeDados = ConectionStringService.connectionString();
            services.AddDbContext<TKContext>(options =>
                options.UseSqlServer(stringConexaoComBancoDeDados).EnableSensitiveDataLogging());

            services.AddScoped<IDbContext, TKContext>();
        }

        public static TKContext GetInstance()
        {
            var optionsBuilder = new DbContextOptionsBuilder<TKContext>();
            optionsBuilder.UseSqlServer(ConectionStringService.connectionString());

            return new TKContext(optionsBuilder.Options);
        }
    }
}
