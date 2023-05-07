import { Injectable } from '@angular/core';
import { PickupModel } from './pickup.model';


@Injectable({
  providedIn: 'root'
})
export class PickupsService {
  pickups: PickupModel[] = [
    {id:'p1',status: 'Processing',createdAt: '10/04/2022',updatedAt: '13/04/2022',notes:' Two pair of pants.'},
    {id:'p2',status: 'Finished',createdAt: '12/04/2022',updatedAt: '13/04/2022',notes:' Two pair of pants.'}
  ];
  // constructor() { }

  getPickup(id: string){
    console.log('getPickup');
    return this.pickups.find((p) => p.id === id);
  }
}
