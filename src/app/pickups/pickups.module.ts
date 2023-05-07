import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PickupsPageRoutingModule } from './pickups-routing.module';
import { PickupsPage } from './pickups.page';
import { PickupCardComponent } from './pickup-card/pickup-card.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickupsPageRoutingModule
  ],
  declarations: [PickupsPage, PickupCardComponent]
})
export class PickupsPageModule {}
