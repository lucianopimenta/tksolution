using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Text;
using TKSolution.Core.Model;
using TKSolution.Core.Resource;

namespace TKSolution.Core.Controller
{
    public class BaseController : ControllerBase
    {
        protected List<ErrorDetail> Details { get; set; }

        public BaseController()
        {
            Details = new List<ErrorDetail>();
        }

        protected void AddValidation(string field, TypeValidator validator, string[] args = null)
        {
            switch (validator)
            {
                case TypeValidator.FieldRequired:
                    Details.Add(new ErrorDetail() { message = string.Format(MessageResource.FieldRequired, field) });
                    break;
                case TypeValidator.FieldSize:
                    Details.Add(new ErrorDetail() { message = string.Format(MessageResource.FieldSize, field, args[0]) });
                    break;
                case TypeValidator.FieldSizeInterval:
                    Details.Add(new ErrorDetail() { message = string.Format(MessageResource.FieldSizeInterval, field, args[0], args[1]) });
                    break;
                case TypeValidator.FieldSizeUnique:
                    Details.Add(new ErrorDetail() { message = string.Format(MessageResource.FieldSizeUnique, field, args[0]) });
                    break;
                case TypeValidator.FieldInvalidValue:
                    Details.Add(new ErrorDetail() { message = string.Format(MessageResource.FieldInvalidValue, field) });
                    break;
                case TypeValidator.FieldNotDataBD:
                    Details.Add(new ErrorDetail() { message = string.Format(MessageResource.FieldNotDataBD, field, args[0]) });
                    break;
                case TypeValidator.FieldDuplicade:
                    Details.Add(new ErrorDetail() { message = string.Format(MessageResource.FieldDuplicade, field) });
                    break;
                case TypeValidator.None:
                    Details.Add(new ErrorDetail() { message = args[0] });
                    break;
            }
        }

        protected void AddValidation(string field, string[] args = null)
        {
            AddValidation(field, TypeValidator.FieldRequired, args);
        }

        protected string ToStringDetails()
        {
            StringBuilder sb = new StringBuilder();

            foreach (var item in Details)
            {
                sb.AppendLine(item.message);
            }

            return sb.ToString();
        }
    }
}
