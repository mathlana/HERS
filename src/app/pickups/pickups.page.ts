import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PickupCardComponent } from 'src/app/pickups/pickup-card/pickup-card.component';
import {Pickup} from "../interfaces/pickup";


@Component({
  selector: 'app-pickups',
  templateUrl: './pickups.page.html',
  styleUrls: ['./pickups.page.scss'],
  standalone:true,
  imports: [IonicModule, CommonModule, FormsModule , PickupCardComponent]
})
export class PickupsPage implements OnInit, OnDestroy  {
  pickups: Pickup[] = [
                        {id:1,status: 'hold',createdAt: '12/04/2022',updatedAt: '13/04/2022',notes:' Two pair of pants.'},
                        {id:2,status: 'hold',createdAt: '12/04/2022',updatedAt: '13/04/2022',notes:' Two pair of pants.'}
                      ];
  constructor() { 
    console.log('constructor');
  }

  ngOnInit() {
    console.log('ngOnInit');

  }
  ionViewWillEnter() {
    console.log('ionViewWillEnter');

  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter');

  }
  ionViewWillLeave() {
    console.log('ionViewWillLeave');

  }
  ionViewDidLeave() {
    console.log('ionViewDidLeave');

  }
  ngOnDestroy(){
    console.log('ngOnDestroy');
  }

}
