import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from '../../services/service.service';
import { DialogAgreeComponent } from '../../shared/components/dialog-agree/dialog-agree.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  displayedColumns = ["productName","productValue"]
  dataSource = new MatTableDataSource([]);
  operation: boolean = true;
  product: any = null;

  constructor(
    private Service: ServiceService,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.Products();
  }

  clients: any
  async Products(){
    await this.Service.GetProduct().subscribe((respuesta)=>{
      this.clients = respuesta;
      this.dataSource = new MatTableDataSource(this.clients);
    },(error)=>{
      console.log(error);
    })
  }

  formulario = new FormGroup({
    productName: new FormControl(null,[Validators.required,Validators.minLength(3), Validators.maxLength(50)]),
    productValue: new FormControl(null,[Validators.required,Validators.minLength(3), Validators.maxLength(50)])
  });

  save(){
    if(this.formulario.invalid){
      return;
    }
    if(this.operation){
      let data = {
        'productValue':this.formulario.value.productValue,
        'productName':this.formulario.value.productName
      };
      this.Service.AddProduct(data).subscribe((respuesta)=>{
        this.openDialog("Se creo correctamente el producto");
        this.Products();
      },(error)=>{
        console.log(error);
      })
    }else{
      let data = {
        'id': this.product.id,
        'productValue':this.formulario.value.productValue,
        'productName':this.formulario.value.productName
      };
      this.Service.UpdateProduct(this.product.id, data).subscribe((respuesta)=>{
        this.openDialog("Se actualizo correctamente el producto");
        this.Products();
      },(error)=>{
        console.log(error);
      })
    }
  }

  chargeInfo(element: any){
    this.operation = false;
    this.product = element;
    this.formulario.setValue({
      productName: element.productName, 
      productValue: element.productValue
    }); 
  }

  openDialog(subTitle: string = "") {
    let object = {
      data: {
        subTitle
      }
    }
    const dialogRef = this.dialog.open(DialogAgreeComponent, object);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  clear(){
    this.operation = true;
    this.Products();
    this.formulario.reset();
  }
}
