import { Component, Input, OnInit } from '@angular/core';
import {PickupModel} from "../pickup.model";


@Component({
  selector: 'app-pickup-card',
  templateUrl: './pickup-card.component.html',
  styleUrls: ['./pickup-card.component.scss'],
})
export class PickupCardComponent  implements OnInit {

  @Input() pickup: PickupModel = {id:'p3',status: 'hold',createdAt: '11/04/2022',updatedAt: '13/04/2022',notes:' Two pair of pants.',userId:'xx'};

  constructor() { }

  ngOnInit() {}


}
