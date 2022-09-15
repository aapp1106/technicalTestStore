import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'presentation', loadChildren: () => import('./src/app/modules/presentation/presentation.module').then(m => m.PresentationModule) },
  { path: 'clients', loadChildren: () => import('./src/app/modules/clients/clients.module').then(m => m.ClientsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
