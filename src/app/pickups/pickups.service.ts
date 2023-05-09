import { Injectable } from '@angular/core';
import { PickupModel } from './pickup.model';
import { HttpClient } from '@angular/common/http';

interface PickupData{
  status: string;
  note: string;
}

@Injectable({
  providedIn: 'root'
})
export class PickupsService {
  pickups: PickupModel[] = [
    {id:'p1',status: 'Processing',createdAt: '10/04/2022',updatedAt: '13/04/2022',notes:' Two pair of pants.'},
    {id:'p2',status: 'Finished',createdAt: '12/04/2022',updatedAt: '13/04/2022',notes:' Two pair of pants.'}
  ];
  constructor(private http: HttpClient) { }

  getPickup(id: string){
    console.log('getPickup');
    return this.pickups.find((p) => p.id === id);
  }
  createPickup(status: string, note:string){
   return this.http.post<{name:string}>('https://hers-app-2023-default-rtdb.europe-west1.firebasedatabase.app/pickups.json', 
                                  {
                                    status,
                                    note
                                  });
  }
  getPickups(){
    return this.http.get<{[key:string]:PickupData}>('https://hers-app-2023-default-rtdb.europe-west1.firebasedatabase.app/pickups.json');
  }
}
