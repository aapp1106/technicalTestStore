import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'presentation', loadChildren: () => import('./src/app/modules/presentation/presentation.module').then(m => m.PresentationModule) },
  { path: 'clients', loadChildren: () => import('./src/app/modules/clients/clients.module').then(m => m.ClientsModule) },
  { path: 'products', loadChildren: () => import('./src/app/modules/products/products.module').then(m => m.ProductsModule) },
  { path: 'sales', loadChildren: () => import('./src/app/modules/sales/sales.module').then(m => m.SalesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
