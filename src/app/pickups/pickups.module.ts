import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PickupsPageRoutingModule } from './pickups-routing.module';
import { PickupsPage } from './pickups.page';
import { PickupCardComponent } from 'src/app/pickups/pickup-card/pickup-card.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickupsPageRoutingModule,
    PickupCardComponent
  ],
  // declarations: [PickupsPage]
})
export class PickupsPageModule {}
