import { Component, OnDestroy, OnInit } from '@angular/core';
import { PickupCardComponent } from 'src/app/pickups/pickup-card/pickup-card.component';
import {PickupModel} from "../pickups/pickup.model";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit, OnDestroy {
  pickups: PickupModel[] = [
    {id:'p1',status: 'hold',createdAt: '12/04/2022',updatedAt: '13/04/2022',notes:' Two pair of pants.'},
    {id:'p2',status: 'hold',createdAt: '12/04/2022',updatedAt: '13/04/2022',notes:' Two pair of pants.'}
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
