import { DialogComponent } from './dialog/dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnersRoutingModule } from './owners-routing.module';
import { OwnersListComponent } from './owners-list/owners-list.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [OwnersListComponent, DialogComponent],
  imports: [
    CommonModule,
    OwnersRoutingModule,
    MaterialModule
  ],
  exports: [OwnersListComponent]
})
export class OwnersModule { }
