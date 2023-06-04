import { Component, OnInit , OnDestroy} from '@angular/core';


import { PickupModel } from "./pickup.model";
import { ModalController } from '@ionic/angular';
import { PickupsService } from './pickups.service';
import { PickupCardModalComponent } from './pickup-card-modal/pickup-card-modal.component';
import {Subscription} from 'rxjs';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-pickups',
  templateUrl: './pickups.page.html',
  styleUrls: ['./pickups.page.scss'],
})
export class PickupsPage implements OnInit ,OnDestroy {
  private currentUserId: string | null;
  public usersPickups : PickupModel[] = [];
  userpickups: PickupModel[];
  pickups: PickupModel[];
  private pickupSubscription: Subscription;

  constructor(private modalCtrl: ModalController, private authService: AuthService,private pickupsService: PickupsService) { 
  }

  ngOnInit() {
    this.authService.userId.subscribe(
      (userId) => {
        this.currentUserId = userId;
      }
    );
    
  }

  ionViewWillEnter(){
    this.pickupsService.getPickups().subscribe( (pickups) => {
     
      this.usersPickups = [];
      for(let pickup of pickups){
        if(this.currentUserId == pickup.userId)
        {          
          this.usersPickups.push(new PickupModel( pickup.id,
            pickup.status,
            pickup.address,
            pickup.city,
            pickup.zip,
            pickup.createdAt,
            pickup.updatedAt,
            pickup.notes, 
            pickup.userId));          
        }
      }
      this.pickups = this.usersPickups;  

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
        this.pickupsService.createPickup( resultData.data.pickupData.status,
                                          resultData.data.pickupData.address,
                                          resultData.data.pickupData.city,
                                          resultData.data.pickupData.zip,
                                          resultData.data.pickupData.notes
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