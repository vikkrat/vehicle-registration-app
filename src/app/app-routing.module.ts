import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '',
    redirectTo: '/owners',
    pathMatch: 'full'
  },
  { 
    path: 'owners', 
    loadChildren: ()=> import('./owners/owners.module').then(module => module.OwnersModule),
  },
  { 
    path: 'owner', 
    loadChildren: ()=> import('./owner/owner.module').then(module => module.OwnerModule),
  },
  { 
    path: '**',
    redirectTo: '/owners',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
