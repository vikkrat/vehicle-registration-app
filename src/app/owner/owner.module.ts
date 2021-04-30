import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerRoutingModule } from '../owner/owner-routing.module';
import { MaterialModule } from './../material/material.module';
import { CarFormComponent } from './car-form/car-form.component';
import { OwnerFormComponent } from './owner-form/owner-form.component';

@NgModule({
  declarations: [
    OwnerFormComponent,
    CarFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OwnerRoutingModule,
    MaterialModule
  ]
})
export class OwnerModule { }
