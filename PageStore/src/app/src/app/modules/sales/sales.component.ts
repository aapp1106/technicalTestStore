import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  displayedColumns = ["clientName","productName","productIAmount","productUnitValue","productTotalValue"]
  dataSource = new MatTableDataSource([]);
  operation: boolean = true;
  sale: any = null;

  constructor(
    private Service: ServiceService,
    public dialog: MatDialog) {}

  ngOnInit(): void {

    this.Clients();
    this.Products();
    this.Sales();
    /*this.observable = this.Paciente.controls.productName.valueChanges.subscribe((value:any)=>{
      this.products.filter(p => p.id == value)
      this.Pos= value 
    })*/
  }

  sales: any
  async Sales(){
    await this.Service.GetSale().subscribe((respuesta)=>{
      console.log(respuesta);
      this.sales = respuesta;
      this.dataSource = new MatTableDataSource(this.sales);
    },(error)=>{
      console.log(error);
    })
  }

  clients: any
  async Clients(){
    await this.Service.GetClients().subscribe((respuesta)=>{
      console.log("clientes " + JSON.stringify(respuesta));
      this.clients = respuesta;
    },(error)=>{
      console.log(error);
    })
  }

  products : any
  async Products(){
    await this.Service.GetProduct().subscribe((respuesta)=>{
      console.log("productos " + JSON.stringify(respuesta));
      this.products = respuesta;
    },(error)=>{
      console.log(error);
    })
  }

  formulario = new FormGroup({
    clientName: new FormControl(null,Validators.required),
    productName: new FormControl(null,Validators.required),
    productUnitValue: new FormControl({value:null, disabled:true}),
    productIAmount: new FormControl(null,[Validators.required,Validators.min(1), Validators.max(9999999999999)]),
    productTotalValue: new FormControl({value:null, disabled:true})
  });

  save(){
    if(this.formulario.invalid){
      return;
    }
    if(this.operation){
      let data = {
        'productId':this.formulario.value.productName,
        'clientId':this.formulario.value.clientName,
        'productIAmount':this.formulario.value.productIAmount
      };
      this.Service.AddSale(data).subscribe((respuesta)=>{
        console.log("registrado "+respuesta);
        this.Sales();
      },(error)=>{
        console.log(error);
      })
    }else{
      let data = {
        'id': this.sale.id,
        'productId':this.formulario.value.productName,
        'clientId':this.formulario.value.clientName,
        'productIAmount':this.formulario.value.productIAmount
      };
      this.Service.UpdateSale(this.sale.id, data).subscribe((respuesta)=>{
        console.log("registrado "+respuesta);
        this.Sales();
      },(error)=>{
        console.log(error);
      })
    }
  }

  chargeInfo(element: any){
    this.operation = false;
    this.sale = element;
    this.formulario.setValue({
      clientName: element.clientId, 
      productName: element.productId,
      productUnitValue: element.productUnitValue,
      productIAmount: element.productIAmount,
      productTotalValue: element.productTotalValue
    }); 
  }

  clear(){
    this.operation = true;
    this.Sales();
    this.formulario.reset();
  }
}
