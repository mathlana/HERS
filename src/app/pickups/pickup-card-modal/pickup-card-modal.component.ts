import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pickup-card-modal',
  templateUrl: './pickup-card-modal.component.html',
  styleUrls: ['./pickup-card-modal.component.scss'],
})
export class PickupCardModalComponent  implements OnInit {

  @ViewChild('form', {static: true}) form: NgForm;
  constructor(private modalCtrl: ModalController) { }
  @Input() title: string;
  @Input() status: string;
  @Input() address: string;
  @Input() city: string;
  @Input() zip: string;
  @Input() notes: string;


  ngOnInit() {}

  onClose(){
    this.modalCtrl.dismiss();
  }
  onCreatePickup(){
    if(!this.form.valid){
      return;
    }
    this.modalCtrl.dismiss( {
      pickupData: {
        status:this.form.value['status'],
        address: this.form.value['address'],
        city: this.form.value['city'],
        zip: this.form.value['zip'],
        notes: this.form.value['notes']
      }
    }, 'confirm');
  }
}
