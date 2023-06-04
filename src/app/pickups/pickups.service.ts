import { Injectable } from '@angular/core';
import { PickupModel } from './pickup.model';
import { HttpClient } from '@angular/common/http';
import {map, switchMap, take, tap} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import {NavController} from '@ionic/angular';


interface PickupData{
  status: string;
  address: string;
  city: string;
  zip: string;
  createdAt: string;
  updatedAt:string;
  notes: string;
  userId:string;
}

@Injectable({
  providedIn: 'root'
})
export class PickupsService {
  private _pickups = new BehaviorSubject<PickupModel[]>([]);

  constructor(private http: HttpClient, private navCtrl: NavController,private authService:AuthService) { }

  get pickups() {
    return this._pickups.asObservable();

  }

  createPickup(status: 'hold',address:string,city:string,zip:string, notes:string){
    let generatedId:any;
    let newPickup: PickupModel;
    let fetchedUserId: string | null;
   
   return this.authService.userId.pipe(
                                        take(1),
                                        switchMap(userId => {
                                          fetchedUserId = userId;
                                          return this.authService.token;
                                        }),
                                        take(1),
                                        switchMap((token) => {
                                          newPickup = new PickupModel(
                                            null,
                                            'hold',
                                            address,
                                            city,
                                            zip,
                                            '11/11/2022',
                                            '11/11/2022',
                                            notes,
                                            fetchedUserId
                                          );
                                          return this.http.post<{ name: string }>(
                                            `https://hers-app-2023-default-rtdb.europe-west1.firebasedatabase.app/pickups.json?auth=${token}`,
                                             newPickup
                                          );
                                        }),
                                        take(1),
                                        switchMap((resData) => {
                                          generatedId = resData.name;
                                          return this.pickups;
                                        }),
                                        take(1),
                                        tap((pickups) => {
                                          newPickup.id = generatedId;
                                          this._pickups.next(pickups.concat(newPickup));
                                          this.navCtrl.navigateBack('/pickups');

                                        })
                                      );
  }
  getPickups() {
    return this.authService.token.pipe(
                                        take(1),
                                        switchMap((token) => {
                                                  return this.http.get<{[key:string]:PickupData}>(
                                                    `https://hers-app-2023-default-rtdb.europe-west1.firebasedatabase.app/pickups.json?auth=${token}`
                                                  );
                                        }),
                                        map((pickupsData: any) => {
                                          const pickups: PickupModel[] = [];
                                    
                                          for(const key in pickupsData){
                                            if(pickupsData.hasOwnProperty(key)){
                                              pickups.push(new PickupModel(key,
                                                pickupsData[key].status,
                                                pickupsData[key].address,
                                                pickupsData[key].city,
                                                pickupsData[key].zip,
                                                pickupsData[key].createdAt,
                                                pickupsData[key].updatedAt,
                                                pickupsData[key].notes, 
                                                pickupsData[key].userId));
                                            }
                                          }
                                          return pickups;
                                        }),
                                          
                                        tap(pickups => {
                                          this._pickups.next(pickups);
                                        })
                                      );
  }
  getPickup(id: string | null){
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<PickupData>(
          `https://hers-app-2023-default-rtdb.europe-west1.firebasedatabase.app/pickups/${id}.json?auth=${token}`
        );
      }),
      map((resData: PickupData) => {
        return new PickupModel(
          id,
          resData.status,
          resData.address,
          resData.city,
          resData.zip,
          resData.createdAt,
          resData.updatedAt,
          resData.notes,
          resData.userId
        );
      })
    );
  }
  editPickup(
    id: string | null,
    status: string,
    address: string,
    city: string,
    zip: string,
    createdAt: string,
    updatedAt: string,
    notes: string,
    userId: string | null
  ) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.put(
          `https://hers-app-2023-default-rtdb.europe-west1.firebasedatabase.app/pickups/${id}.json?auth=${token}`,
          {
            status,
            address,
            city,
            zip,
            createdAt,
            updatedAt,
            notes,
            userId
          }
        );
      }),
      switchMap(() => {
        return this.pickups;
      }),
      take(1),
      tap((pickups) => {
        const updatedPickupIndex = pickups.findIndex((p) => p.id === id);
        const updatedPickups = [...pickups];
        updatedPickups[updatedPickupIndex] = new PickupModel(
          id,
          status,
          address,
          city,
          zip,
          createdAt,
          updatedAt,
          notes,
          userId
        );
        this._pickups.next(updatedPickups);

      })
    );
  }

  deletePickup(id: string | null) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.delete(
          `https://hers-app-2023-default-rtdb.europe-west1.firebasedatabase.app/pickups/${id}.json?auth=${token}`
        );
      }),
      switchMap(() => {
        return this.pickups;
      }),
      take(1),
      tap((pickups) => {

        this._pickups.next(pickups.filter((p) => p.id !== id));
      })
    );
  }

}
