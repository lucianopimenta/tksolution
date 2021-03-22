using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using TKSolution.Application.Model;
using TKSolution.Core.Controller;
using TKSolution.Core.Model;
using TKSolution.Core.Repository;
using TKSolution.Core.Resource;
using TKSolution.Core.Service;
using TKSolution.Data;
using TKSolution.Data.Entities;
using TKSolution.Data.Values;

namespace TKSolution.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class professionalController : BaseController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<Professional> _repositoryProfessional;
        public professionalController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _repositoryProfessional = _unitOfWork.GetRepository<Professional>();
        }

        [HttpGet]
        [Route("{code}")]
        public IActionResult Get(int code)
        {
            try
            {
                var professional = _repositoryProfessional.Get(x => x.Code.Equals(code)).FirstOrDefault();
                if (professional != null)
                {
                    return Ok(new ResponseResult()
                    {
                        success = true,
                        data = new JObject(
                            new JProperty("Code", professional.Code),
                            new JProperty("Name", professional.Name),
                            new JProperty("CPF", professional.CPF),
                            new JProperty("TypeClassDocument", professional.TypeClassDocument),
                            new JProperty("TypeClassDescription", HelperService.GetDescription(professional.TypeClassDocument)),
                            new JProperty("TypeNumber", professional.TypeNumber),
                            new JProperty("Status", professional.Status),
                            new JProperty("StatusDescription", HelperService.GetDescription(professional.Status)))
                    });
                }
                else
                    return Ok(new ResponseResult()
                    {
                        success = false,
                        data = null,
                        errorMessage = MessageResource.RegistroNaoEncontrado
                    });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ResponseResult()
                {
                    success = false,
                    data = ex.StackTrace,
                    errorMessage = ex.InnerException == null ? ex.Message : ex.InnerException.Message
                });
            }
        }

        [HttpGet]
        public IActionResult Get(string name)
        {
            try
            {
                JArray json = new JArray();
                var list = _repositoryProfessional.Get(x => x.Status != StatusEnum.Inactive).OrderBy(x => x.Name).ToList();

                if (!string.IsNullOrEmpty(name))
                    list = list.Where(x => x.Name.ToUpper().Contains(name.ToUpper())).ToList();

                list.ForEach(professional =>
                {
                    JObject obj =
                       new JObject(
                            new JProperty("Code", professional.Code),
                            new JProperty("Name", professional.Name),
                            new JProperty("CPF", professional.CPF),
                            new JProperty("TypeClassDocument", professional.TypeClassDocument),
                            new JProperty("TypeClassDescription", HelperService.GetDescription(professional.TypeClassDocument)),
                            new JProperty("TypeNumber", professional.TypeNumber),
                            new JProperty("Status", professional.Status),
                            new JProperty("StatusDescription", HelperService.GetDescription(professional.Status)));

                    json.Add(obj);
                });

                return Ok(new ResponseResult()
                {
                    success = true,
                    data = json
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ResponseResult()
                {
                    success = false,
                    data = ex.StackTrace,
                    errorMessage = ex.InnerException == null ? ex.Message : ex.InnerException.Message
                });
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] Professional request)
        {
            using (var transaction = _repositoryProfessional.BeginTransaction())
            {
                try
                {
                    #region Validações

                    if (string.IsNullOrEmpty(request.Name))
                        AddValidation("Nome");

                    if (string.IsNullOrEmpty(request.CPF))
                        AddValidation("CPF");
                    else
                    {
                        //valida CPF
                        if (!HelperService.IsCpf(request.CPF))
                            AddValidation("CPF", TypeValidator.FieldInvalidValue);

                        //verifica se já existe no banco
                        var cpf = _repositoryProfessional.Get(x => x.CPF.Equals(request.CPF)).FirstOrDefault();
                        if (cpf != null)
                            AddValidation("CPF", TypeValidator.FieldDuplicade);
                    }

                    if (request.TypeClassDocument == 0)
                        AddValidation("Documento de classe");
                    else
                    {
                        //verifica se já existe no banco
                        var prof = _repositoryProfessional.Get(x => x.TypeClassDocument.Equals(request.TypeNumber)).FirstOrDefault();
                        if (prof != null)
                            AddValidation("Número do Documento", TypeValidator.FieldDuplicade);
                    }

                    if (string.IsNullOrEmpty(request.TypeNumber))
                        AddValidation("Número do documento");

                    if (Details.Count > 0)
                        return Ok(new ResponseResult()
                        {
                            success = false,
                            data = null,
                            errorMessage = ToStringDetails()
                        });

                    #endregion

                    request.Status = StatusEnum.Active;
                    _repositoryProfessional.Save(request);
                    transaction.Commit();

                    return Ok(new ResponseResult()
                    {
                        success = true,
                        data = request.Code
                    });
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return StatusCode(500, new ResponseResult()
                    {
                        success = false,
                        data = ex.StackTrace,
                        errorMessage = ex.InnerException == null ? ex.Message : ex.InnerException.Message
                    });
                }
            }
        }

        [HttpPut]
        public IActionResult Put([FromBody] Professional request)
        {
            using (var transaction = _repositoryProfessional.BeginTransaction())
            {
                try
                {
                    #region Validações

                    if (request.Code == 0)
                        AddValidation("Código");

                    if (string.IsNullOrEmpty(request.Name))
                        AddValidation("Nome");

                    if (Details.Count > 0)
                        return BadRequest(new ResponseResult()
                        {
                            success = false,
                            data = null,
                            errorMessage = ToStringDetails()
                        });

                    #endregion

                    var professional = _repositoryProfessional.GetNoTracking(x => x.Code.Equals(request.Code)).FirstOrDefault();
                    if (professional != null)
                    {
                        professional.Name = request.Name;
                        _repositoryProfessional.Save(professional);

                        transaction.Commit();
                    }
                    else
                        return Ok(new ResponseResult()
                        {
                            success = false,
                            data = null,
                            errorMessage = MessageResource.RegistroNaoEncontrado
                        });

                    return Ok(new ResponseResult()
                    {
                        success = true,
                        data = null
                    });
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return StatusCode(500, new ResponseResult()
                    {
                        success = false,
                        data = ex.StackTrace,
                        errorMessage = ex.InnerException == null ? ex.Message : ex.InnerException.Message
                    });
                }
            }
        }

        [HttpDelete]
        public IActionResult Delete(int code)
        {
            using (var transaction = _repositoryProfessional.BeginTransaction())
            {
                try
                {
                    var professional = _repositoryProfessional.GetNoTracking(x => x.Code.Equals(code)).FirstOrDefault();
                    if (professional != null)
                    {
                        professional.Status = StatusEnum.Inactive;

                        _repositoryProfessional.Save(professional);
                        transaction.Commit();
                    }

                    return Ok(new ResponseResult()
                    {
                        success = true,
                        data = null
                    });
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return StatusCode(500, new ResponseResult()
                    {
                        success = false,
                        data = ex.StackTrace,
                        errorMessage = ex.InnerException == null ? ex.Message : ex.InnerException.Message
                    });
                }
            }
        }

        [HttpPut]
        [Route("deleteRange")]
        public IActionResult DeleteRange([FromBody] ProfessionalListRequest request)
        {
            using (var transaction = _repositoryProfessional.BeginTransaction())
            {
                try
                {
                    foreach (var item in request.Codes)
                    {
                        var professional = _repositoryProfessional.GetNoTracking(x => x.Code.Equals(item)).FirstOrDefault();
                        if (professional != null)
                        {
                            professional.Status = (StatusEnum)request.Status;
                            _repositoryProfessional.Save(professional);
                        }
                    }

                    transaction.Commit();

                    return Ok(new ResponseResult()
                    {
                        success = true,
                        data = null
                    });
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return StatusCode(500, new ResponseResult()
                    {
                        success = false,
                        data = ex.StackTrace,
                        errorMessage = ex.InnerException == null ? ex.Message : ex.InnerException.Message
                    });
                }
            }
        }
    }
}
