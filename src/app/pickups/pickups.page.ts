import { Component, OnInit , OnDestroy} from '@angular/core';


import { PickupModel } from "./pickup.model";
import { ModalController } from '@ionic/angular';
import { PickupsService } from './pickups.service';
import { PickupCardModalComponent } from './pickup-card-modal/pickup-card-modal.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-pickups',
  templateUrl: './pickups.page.html',
  styleUrls: ['./pickups.page.scss'],
})
export class PickupsPage implements OnInit ,OnDestroy {
  
  pickups: PickupModel[];
  private pickupSubscription: Subscription;

  constructor(private modalCtrl: ModalController, private pickupsService: PickupsService) { 
    // this.pickups = this.pickupsService.pickups;
  }

  ngOnInit() {
    //dodajjemo citate sa firebase-a na aplikaciju -next metoda
    //kakoje sad pickus observable onda se subsc na nju
    this.pickupSubscription = this.pickupsService.pickups.subscribe( (pickups) => {
      this.pickups = pickups;
    });
  }

  ionViewWillEnter(){
    //prebacili iz ngOnInit metode
    this.pickupsService.getPickups().subscribe( (pickups) => {
      // this.pickups = pickups;
    });
  }

  openModal(){
    this.modalCtrl
    .create({
      component: PickupCardModalComponent,
      componentProps: {title: 'Add new pickup'}
    })
    .then((modal) => {
      modal.present();
      return modal.onDidDismiss(); 
      //vraca promise
    }).then((resultData) => {
      if(resultData.role === 'confirm'){
        console.log(resultData);
        //posto je rezultat post metode observable mi se subscribujemo na nju 
        //tako dodajemo u firebase objekte
        this.pickupsService.createPickup(resultData.data.pickupData.status,resultData.data.pickupData.address,resultData.data.pickupData.notes
          ).subscribe(
          (pickups) => {
          //hocemo da dobijemo novi prosireni niz - i dobijamo ga iz metode createPickup
          // console.log(res);
          // this.pickups = pickups;
        });
      }
    });
  }

  ngOnDestroy(){
    if(this.pickupSubscription){
      this.pickupSubscription.unsubscribe();
    }
  }
}