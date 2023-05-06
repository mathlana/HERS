import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PickupsPage } from './pickups.page';

const routes: Routes = [
  {
    path: '',
    component: PickupsPage,
    children: [
                {
                  path: 'pickup',
                  loadChildren: () => import('./pickup/pickup.module').then( m => m.PickupPageModule)
                }
              ]
  },
  {
    path: 'pickup',
    loadChildren: () => import('./pickup/pickup.module').then( m => m.PickupPageModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickupsPageRoutingModule {}
