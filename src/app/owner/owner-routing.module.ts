import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerFormComponent } from './owner-form/owner-form.component';


const routes: Routes = [
  {
    path: '',
    component: OwnerFormComponent,
  },
  { 
    path: 'create',
    component: OwnerFormComponent,
  },
  { 
    path: 'details/:id', 
    component: OwnerFormComponent,
  },
  { 
    path: 'update/:id',
    component: OwnerFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnerRoutingModule {}
