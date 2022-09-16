import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  url: string = "http://localhost:44304/api/"

  constructor(public req: HttpClient) {}

  public GetClients(){
    return this.req.get(this.url+"Client");
  }

  public AddClient(client : any){
    return this.req.post(this.url+"Client", client);
  }
  
  public UpdateClient(id:number, client : any){
    return this.req.put(this.url+"Client/"+id, client);
  }

  public GetProduct(){
    return this.req.get(this.url+"Product");
  }

  public AddProduct(client : any){
    return this.req.post(this.url+"Product", client);
  }
  
  public UpdateProduct(id:number, product : any){
    return this.req.put(this.url+"Product/"+id, product);
  }
}
