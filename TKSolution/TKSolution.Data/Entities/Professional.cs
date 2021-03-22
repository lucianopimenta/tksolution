using TKSolution.Core.Entity;
using TKSolution.Data.Values;

namespace TKSolution.Data.Entities
{
    public class Professional: EntityBase
    {
        public string Name { get; set; }
        public string CPF { get; set; }
        public TypeClassEnum TypeClassDocument { get; set; }
        public string TypeNumber { get; set; }
        public StatusEnum Status { get; set; }
    }
}
