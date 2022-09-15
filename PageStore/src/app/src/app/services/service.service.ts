import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  url: string = "https://localhost:44304/"

  constructor(public req: HttpClient) {}

  public GetClients(){
    return  this.req.get(this.url+"api/Client");
  }
  
}
