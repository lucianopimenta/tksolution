using Microsoft.Extensions.Configuration;

namespace TKSolution.Core.Service
{
    public class ConectionStringService
    {
        public const string DefaultConnection = "TKSolution";
        public static IConfigurationRoot settings;

        public static void Load(IConfigurationRoot configuracao)
        {
            settings = configuracao;
        }

        public static string connectionString()
        {
            return settings.GetConnectionString(DefaultConnection);
        }
    }
}
