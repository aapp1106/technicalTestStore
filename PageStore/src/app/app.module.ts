import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './src/app/shared/modules/material.module';
import { ServiceService } from './src/app/services/service.service';
import { HttpClientModule } from '@angular/common/http';
import { DialogAgreeComponent } from './src/app/shared/components/dialog-agree/dialog-agree.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogAgreeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
