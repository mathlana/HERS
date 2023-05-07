import { Component, OnDestroy, OnInit } from '@angular/core';


import { PickupModel } from "./pickup.model";
import { MenuController } from '@ionic/angular';
import { PickupsService } from './pickups.service';


@Component({
  selector: 'app-pickups',
  templateUrl: './pickups.page.html',
  styleUrls: ['./pickups.page.scss'],
})
export class PickupsPage implements OnInit, OnDestroy  {
  
  pickups: PickupModel[];

  constructor(private menuCrtl: MenuController, private pickupsService: PickupsService) { 
    console.log('constructor');
    this.pickups = this.pickupsService.pickups;
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
