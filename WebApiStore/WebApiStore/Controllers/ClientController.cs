using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DataAccess;

namespace WebApiStore.Controllers
{
    public class ClientController : ApiController
    {

        [HttpGet]
        public List<client> Get()
        {
            List<client> l = new List<client>(); 

            using (storeEntities db = new storeEntities()) {
                l = db.client.ToList();
            }
            return l;
        }
    }
}
