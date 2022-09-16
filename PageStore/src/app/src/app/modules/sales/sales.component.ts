import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from '../../services/service.service';
import { DialogAgreeComponent } from '../../shared/components/dialog-agree/dialog-agree.component';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  displayedColumns = ["clientName", "productName", "productIAmount", "productUnitValue", "productTotalValue"]
  dataSource = new MatTableDataSource([]);
  operation: boolean = true;
  sale: any = null;

  constructor(
    private Service: ServiceService,
    public dialog: MatDialog) { }
  observablepro: any
  ngOnInit(): void {
    this.Clients();
    this.Products();
    this.Sales();
    this.observablepro = this.formulario.controls['productName'].valueChanges.subscribe((value: any) => {
      if(value){
        let product1 = this.products.find((p:any) => p.id == value);
        this.formulario.controls['productUnitValue'].setValue(product1.productValue);
      }
    })
    this.observablepro = this.formulario.controls['productIAmount'].valueChanges.subscribe((value: number) => {
      if(value){
        let valunit : number = this.formulario.controls['productUnitValue'].value;
        this.formulario.controls['productTotalValue'].setValue(valunit * value);
      }
    })
  }

  ngOnDestroy(){  //destruir todo lo que es como un observable
    this.observablepro.unsubscribe();
  }

  sales: any
  async Sales() {
    await this.Service.GetSale().subscribe((respuesta) => {
      this.sales = respuesta;
      this.dataSource = new MatTableDataSource(this.sales);
    }, (error) => {
      console.log(error);
    })
  }

  clients: any[any] = [];
  async Clients() {
    await this.Service.GetClients().subscribe((respuesta) => {
      this.clients = respuesta;
    }, (error) => {
      console.log(error);
    })
  }

  products: any[any] = [];
  async Products() {
    await this.Service.GetProduct().subscribe((respuesta) => {
      this.products = respuesta;
    }, (error) => {
      console.log(error);
    })
  }

  formulario = new FormGroup({
    clientName: new FormControl(null, Validators.required),
    productName: new FormControl(null, Validators.required),
    productUnitValue: new FormControl({ value: null, disabled: true }),
    productIAmount: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(9999999999999)]),
    productTotalValue: new FormControl({ value: null, disabled: true })
  });

  save() {
    if (this.formulario.invalid) {
      return;
    }
    if (this.operation) {
      let data = {
        'productId': this.formulario.value.productName,
        'clientId': this.formulario.value.clientName,
        'productIAmount': this.formulario.value.productIAmount
      };
      this.Service.AddSale(data).subscribe((respuesta) => {
        this.openDialog("Se creo correctamente la venta");
        this.Sales();
      }, (error) => {
        console.log(error);
      })
    } else {
      let data = {
        'id': this.sale.id,
        'productId': this.formulario.value.productName,
        'clientId': this.formulario.value.clientName,
        'productIAmount': this.formulario.value.productIAmount
      };
      this.Service.UpdateSale(this.sale.id, data).subscribe((respuesta) => {
        this.openDialog("Se actualizo correctamente la venta");
        this.Sales();
      }, (error) => {
        console.log(error);
      })
    }
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

  chargeInfo(element: any) {
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

  clear() {
    this.operation = true;
    this.Sales();
    this.formulario.reset();
  }
}
