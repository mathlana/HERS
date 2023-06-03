import { Component, OnInit } from '@angular/core';
import { PickupModel } from '../pickup.model';
import { ActivatedRoute } from '@angular/router';
import { PickupsService } from '../pickups.service';
import {LoadingController, ModalController, NavController} from '@ionic/angular';
import { PickupCardModalComponent } from '../pickup-card-modal/pickup-card-modal.component';

@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.page.html',
  styleUrls: ['./pickup.page.scss'],
})
export class PickupPage implements OnInit {
  pickup: PickupModel;
  isLoading = false;

  constructor(private route: ActivatedRoute, private pickupsService: PickupsService, private navCtrl: NavController,
              private loadingCtrl:LoadingController, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('pickupId')) {
        // ako koristimo router, nece biti dobra back animacija,
        // iako svakako i on koristi angular router, samo podesava da se vidi dobra animacija
        this.navCtrl.navigateBack('/pickups');
        return;
      }

      this.isLoading = true;

      this.pickupsService.getPickup(paramMap.get('pickupId')).subscribe((pickup) => {
          this.pickup = pickup;
          this.isLoading = false;
        });
    });
  }
  onDeletePickup() {
    this.loadingCtrl.create({message: 'Deleting...'}).then(loadingEl => {
      loadingEl.present();
      this.pickupsService.deletePickup(this.pickup.id).subscribe(() => {

        loadingEl.dismiss();
        this.navCtrl.navigateBack('/pickups');

      });
    });
  }

  onEditPickup() {
    this.modalCtrl
      .create({
        component: PickupCardModalComponent,
        componentProps: {title: 'Edit pickup', author: this.pickup.status, text: this.pickup.notes},
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then((resultData) => {
        if (resultData.role === 'confirm') {
          this.loadingCtrl
            .create({message: 'Editing...'})
            .then((loadingEl) => {
              loadingEl.present();
              this.pickupsService
                .editPickup(
                  this.pickup.id,
                  resultData.data.pickupData.status,
                  this.pickup.createdAt,
                  this.pickup.updatedAt,
                  resultData.data.pickupData.notes,
                  this.pickup.userId
                )
                .subscribe((pickups) => {
                  this.pickup.status = resultData.data.pickupData.status;
                  this.pickup.notes = resultData.data.pickupData.notes;
                  loadingEl.dismiss();
                });
            });
        }
      });
  }
}
