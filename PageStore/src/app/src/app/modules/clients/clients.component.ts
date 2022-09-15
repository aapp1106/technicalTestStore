import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  displayedColumns = ["clientNit","clientName","clientLastName","clientPhone"]
  dataSource = new MatTableDataSource([]);

  constructor(private Service: ServiceService) { }

  ngOnInit(): void {
    this.Clients();
  }

  clients: any
  async Clients(){
    await this.Service.GetClients().subscribe((respuesta)=>{
      console.log(respuesta);
      this.clients = respuesta;
      this.dataSource = new MatTableDataSource(this.clients);
    },(error)=>{
      console.log(error);
    })
  }
}
