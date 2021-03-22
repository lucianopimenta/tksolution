using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TKSolution.Core.Entity
{
    public abstract class Entity : IEquatable<Entity>
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Code { get; set; }
        [Required()]
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdateDate { get; set; }

        public bool Equals(Entity other)
        {
            if (other == null) return false;

            if (other.Code == null)
            {
                return false;
            }
            // Se o Id for igual ao valor default de TId (0 para inteiros ou longos), 
            // estamos comparando duas entidades não persistidas.
            // Nesse caso devolvemos a verificação de referencia em memória
            if (other.Code.Equals(default(int)) && Code.Equals(default(int)))
                return ReferenceEquals(this, other);

            // Verifica se as entidades são do mesmo tipo e tem o mesmo ID. Nesse caso são iguais
            return (GetType() == other.GetType() && Code.Equals(other.Code));
        }

        public override bool Equals(object obj)
        {
            return Equals(obj as Entity);
        }

        public override int GetHashCode()
        {
            if (Code == null)
                return 0;
            else
                return Code.GetHashCode();
        }
    }
}
