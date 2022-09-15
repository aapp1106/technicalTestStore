using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using DataAccess;

namespace WebApiStore.Controllers
{
    public class ClientController : ApiController
    {
        private storeEntities Context = new storeEntities();

        /// <summary>
        /// listar todos los registros
        /// </summary>
        /// <returns>List<client></returns>
        /// 
        

        [HttpGet]

        public IEnumerable<client> Get()
        {
            List<client> c = new List<client>();
            try
            {
                
                using (storeEntities db = new storeEntities())
                {
                    c = db.client.ToList();
                }
            }
            catch (Exception)
            {
                c = null;
            }
            return c;
        }

        /// <summary>
        /// filtro por id
        /// </summary>
        /// <returns>client</returns>
        [HttpGet]
        public client Get(int id)
        {
            client l = new client();

            using (storeEntities db = new storeEntities())
            {
                l = db.client.FirstOrDefault(c => c.id == id);
            }
            return l;
        }

        /// <summary>
        /// guardar cliente
        /// </summary>
        /// <param name="client"></param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult AddClient([FromBody] client client)
        {
            if (ModelState.IsValid)
            {
                Context.client.Add(client);
                Context.SaveChanges();
                return Ok(client);
            }
            else
            {
                return BadRequest();
            }
        }

        /// <summary>
        /// actualizar cliente
        /// </summary>
        /// <param name="client"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPut]
        public IHttpActionResult UpdateClient(int id, [FromBody] client client)
        {
            if (ModelState.IsValid)
            {
                var exist = Context.client.Count(c => c.id == id) > 0; 
                if(exist)
                {
                    Context.Entry(client).State = EntityState.Modified;
                    Context.SaveChanges();
                    return Ok(client);
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
