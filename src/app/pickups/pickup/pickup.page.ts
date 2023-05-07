import { Component, OnInit } from '@angular/core';
import { PickupModel } from '../pickup.model';
import { ActivatedRoute } from '@angular/router';
import { PickupsService } from '../pickups.service';

@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.page.html',
  styleUrls: ['./pickup.page.scss'],
})
export class PickupPage implements OnInit {
  pickup: PickupModel = {id:'p3',status: 'hold',createdAt: '11/04/2022',updatedAt: '13/04/2022',notes:' Two pair of pants.'};

  constructor(private route: ActivatedRoute, private pickupsService: PickupsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
       this.pickup =  this.pickupsService.getPickup(paramMap.get('pickupId')!)!;
    });
  }
}
