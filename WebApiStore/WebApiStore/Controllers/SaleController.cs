using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DataAccess;

namespace WebApiStore.Controllers
{
    public class SaleController : ApiController
    {
        private storeEntities Context = new storeEntities();

        /// <summary>
        /// listar todos los registros
        /// </summary>
        /// <returns>List<sale></returns>
        [HttpGet]
        public IEnumerable<sale> Get()
        {
            List<sale> l = new List<sale>();
            using (storeEntities db = new storeEntities())
            {
                l = db.sale.ToList();
                foreach (var item in l)
                {
                    item.productName = Context.product.FirstOrDefault(p => p.id == item.productId).productName;
                    item.clientName = Context.client.FirstOrDefault(c => c.id == item.clientId).clientName;
                }
            }
            return l;
        }

        /// <summary>
        /// filtro por id
        /// </summary>
        /// <returns>sale</returns>
        [HttpGet]
        public sale Get(int id)
        {
            sale l = new sale();

            using (storeEntities db = new storeEntities())
            {
                l = db.sale.FirstOrDefault(c => c.id == id);
            }
            return l;
        }

        /// <summary>
        /// guardar venta
        /// </summary>
        /// <param name="sale"></param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult AddSale([FromBody] sale sale)
        {
            if (ModelState.IsValid)
            {
                ProductController p = new ProductController();
                product pro = p.Get(sale.id);
                sale.productUnitValue = pro.productValue;
                sale.productTotalValue = pro.productValue * sale.productIAmount;
                Context.sale.Add(sale);
                Context.SaveChanges();
                return Ok(sale);
            }
            else
            {
                return BadRequest();
            }
        }

        /// <summary>
        /// actualizar venta
        /// </summary>
        /// <param name="sale"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPut]
        public IHttpActionResult UpdateSale(int id, [FromBody] sale sale)
        {
            if (ModelState.IsValid)
            {
                var exist = Context.product.Count(c => c.id == id) > 0;
                if (exist)
                {
                    ProductController p = new ProductController();
                    product pro = p.Get(sale.id);
                    sale.productUnitValue = pro.productValue;
                    sale.productTotalValue = pro.productValue * sale.productIAmount;
                    Context.Entry(sale).State = EntityState.Modified;
                    Context.SaveChanges();
                    return Ok(sale);
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
