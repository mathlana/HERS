import { Component, OnInit } from '@angular/core';


import { PickupModel } from "./pickup.model";
import { ModalController } from '@ionic/angular';
import { PickupsService } from './pickups.service';
import { PickupCardModalComponent } from './pickup-card-modal/pickup-card-modal.component';


@Component({
  selector: 'app-pickups',
  templateUrl: './pickups.page.html',
  styleUrls: ['./pickups.page.scss'],
})
export class PickupsPage implements OnInit  {
  
  pickups: PickupModel[];

  constructor(private modalCtrl: ModalController, private pickupsService: PickupsService) { 
    this.pickups = this.pickupsService.pickups;
  }

  ngOnInit(): void {
    //dodajjemo citate sa firebase-a na aplikaciju
    this.pickupsService.getPickups().subscribe( (pickupData) => {
      console.log(pickupData);
      const pickups: PickupModel[] = [];

      for(const key in pickupData){
        if(pickupData.hasOwnProperty(key)){
          pickups.push({
            id:key,
            status: pickupData[key].status,
            createdAt: '10/03/2023' ,
            updatedAt: '10/03/2023',
            notes: pickupData[key].note
          })
        }
      }

      this.pickups = pickups;
    })
  }
  openModal(){
    this.modalCtrl.create({
      component: PickupCardModalComponent,
      componentProps: {title: 'Add new pickup'}
    }).then((modal: HTMLIonModalElement) => {
      modal.present();
      return modal.onDidDismiss(); 
      //vraca promise
    }).then((resultData) => {
      if(resultData.role === 'confirm'){
        console.log(resultData);
        //posto je rezultat post metode observable mi se subscribujemo na nju 
        //tako dodajemo u firebase objekte
        this.pickupsService.createPickup(resultData.data.pickupData.status,resultData.data.pickupData.note).subscribe(
          (res:{name:string}) => {
          console.log(res);
        });
      }
    });
  }
}
// pickupsData: {[p:string]:PickupData}