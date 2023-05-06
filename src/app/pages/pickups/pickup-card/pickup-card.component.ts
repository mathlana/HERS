import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Pickup} from "../../../interfaces/pickup";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-pickup-card',
  templateUrl: './pickup-card.component.html',
  styleUrls: ['./pickup-card.component.scss'],
  standalone:true,
  imports: [IonicModule, CommonModule, FormsModule,RouterModule]
})
export class PickupCardComponent  implements OnInit {

  @Input() pickup: Pickup = {id: 1,status: 'hold',createdAt: '12/04/2022',updatedAt: '13/04/2022',notes:' Two pair of pants.'};

  constructor(private router:Router) { }

  ngOnInit() {}

  EditPickup(){
    this.router.navigate(['home-page']);
  }

}
