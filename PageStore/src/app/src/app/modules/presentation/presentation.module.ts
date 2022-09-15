import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresentationRoutingModule } from './presentation-routing.module';
import { PresentationComponent } from './presentation.component';
import { MaterialModule } from '../../shared/modules/material.module';


@NgModule({
  declarations: [
    PresentationComponent
  ],
  imports: [
    CommonModule,
    PresentationRoutingModule,
    MaterialModule
  ]
})
export class PresentationModule { }
