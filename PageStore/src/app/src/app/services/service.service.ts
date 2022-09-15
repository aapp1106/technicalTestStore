import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  url: string = "http://localhost:44304/"

  constructor(public req: HttpClient) {}

  public GetClients(){
    return  this.req.get(this.url+"api/Client");
  }

  public AddClient(client : any){
    return  this.req.post(this.url+"api/Client", client);
  }
  
  public UpdateClient(id:number, client : any){
    debugger;
    
    return  this.req.put(this.url+"api/Client/"+id, client);
  }
}
