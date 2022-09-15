using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DataAccess;
using Newtonsoft.Json;

namespace WebApiStore.Controllers
{
    public class ProductController : ApiController
    {
        private storeEntities Context = new storeEntities();

        /// <summary>
        /// listar todos los registros
        /// </summary>
        /// <returns>List<product></returns>
        [HttpGet]
        public IEnumerable<product> Get()
        {
            List<product> l = new List<product>();

            using (storeEntities db = new storeEntities())
            {
                l = db.product.ToList();
            }
            return l;//Json(l, JsonRequestBehavior.AllowGet); 
        }

        /// <summary>
        /// filtro por id
        /// </summary>
        /// <returns>product</returns>
        [HttpGet]
        public product Get(int id)
        {
            product l = new product();

            using (storeEntities db = new storeEntities())
            {
                l = db.product.FirstOrDefault(c => c.id == id);
            }
            return l;
        }

        /// <summary>
        /// guardar producto
        /// </summary>
        /// <param name="product"></param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult AddProduct([FromBody] product product)
        {
            if (ModelState.IsValid)
            {
                Context.product.Add(product);
                Context.SaveChanges();
                return Ok(product);
            }
            else
            {
                return BadRequest();
            }
        }

        /// <summary>
        /// actualizar producto
        /// </summary>
        /// <param name="product"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPut]
        public IHttpActionResult UpdateProduct(int id, [FromBody] product product)
        {
            if (ModelState.IsValid)
            {
                var exist = Context.product.Count(c => c.id == id) > 0;
                if (exist)
                {
                    Context.Entry(product).State = EntityState.Modified;
                    Context.SaveChanges();
                    return Ok(product);
                }
                else
                {
                    return BadRequest();
                }

            }
            else
            {
                return BadRequest();
            }
        }
    }
}
