import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
  operation: boolean = true;
  client: any = null;

  constructor(
    private Service: ServiceService,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.Clients();
  }

  clients: any
  async Clients(){
    await this.Service.GetClients().subscribe((respuesta)=>{
      this.clients = respuesta;
      this.dataSource = new MatTableDataSource(this.clients);
    },(error)=>{
      console.log(error);
    })
  }

  formulario = new FormGroup({
    clientName: new FormControl(null,[Validators.required,Validators.minLength(3), Validators.maxLength(50)]),
    clientLastName: new FormControl(null,[Validators.required,Validators.minLength(3), Validators.maxLength(50)]),
    clientNit: new FormControl(null,[Validators.min(111111),Validators.max(9999999999999),Validators.required]),
    clientPhone: new FormControl(null,[Validators.min(111111), Validators.max(9999999999999)]),
  });

  save(){
    if(this.formulario.invalid){
      return;
    }
    if(this.operation){
      let data = {
        'clientNit':this.formulario.value.clientNit,
        'clientName':this.formulario.value.clientName, 
        'clientLastName': this.formulario.value.clientLastName,
        'clientPhone': this.formulario.value.clientPhone,
      };
      this.Service.AddClient(data).subscribe((respuesta)=>{
        this.Clients();
      },(error)=>{
        console.log(error);
      })
    }else{
      let data = {
        'id': this.client.id,
        'clientNit':this.formulario.value.clientNit,
        'clientName':this.formulario.value.clientName, 
        'clientLastName': this.formulario.value.clientLastName,
        'clientPhone': this.formulario.value.clientPhone,
      };
      this.Service.UpdateClient(this.client.id, data).subscribe((respuesta)=>{
        this.Clients();
      },(error)=>{
        console.log(error);
      })
    }
  }

  chargeInfo(element: any){
    this.operation = false;
    this.client = element;
    this.formulario.setValue({
      clientName: element.clientName, 
      clientLastName: element.clientLastName,
      clientPhone: element.clientPhone || null,
      clientNit: element.clientNit
    }); 
  }

  clear(){
    this.operation = true;
    this.Clients();
    this.formulario.reset();
  }
}
