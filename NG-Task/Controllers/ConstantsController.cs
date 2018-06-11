using Microsoft.AspNetCore.Mvc;
using NG_Task.Entities;
using NG_Task.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NG_Task.Controllers
{
    [Produces("application/json")]
    [Route("api/const")]
    public class ConstantsController : Controller
    {
        private NGContext NGContext;

        public ConstantsController(NGContext NGContext)
        {
            this.NGContext = NGContext;
        }

        [HttpGet("accountType")]
        public IActionResult GetAccountTypes()
        {
            return Ok(NGContext.AccountTypes.Select(at => at.Type).ToArray()); 
        }

        [HttpGet("currency")]
        public IActionResult GetCurrencies()
        {
            return Ok(NGContext.Currencies.Select(c => c.ISO).ToArray());
        }

        [HttpGet("classCode")]
        public IActionResult GetClassCodes()
        {
            IEnumerable<ClassCode> classCodes = NGContext.ClassCodes.ToArray();

            IEnumerable<ClassCodeDto> classCodesDto = AutoMapper.Mapper.Map<IEnumerable<ClassCodeDto>>(classCodes);
            var output = classCodesDto.GroupBy(cc => cc.AccountType);

            return Ok(output
                .Select(o => 
                new {
                    accountType = o.Key,
                    classCodes = o.ToList().Select(c => c.ClassCode)
                }
                ));
        }

        [HttpGet("classCode/{accountType}")]
        public IActionResult GetClassCodes(string accountType)
        {
            IEnumerable<ClassCode> classCodes = NGContext.ClassCodes.Where(cc => cc.AccountType == accountType).ToArray();

            if(classCodes == null || classCodes.Count() == 0)
            {
                return BadRequest("Very bad"); 
            }

            IEnumerable<ClassCodeDto> classCodesDto = AutoMapper.Mapper.Map<IEnumerable<ClassCodeDto>>(classCodes);

            return Ok(classCodesDto.Select(cc => cc.ClassCode).ToArray());
        }
    }
}
