import { Injectable } from '@angular/core';
import { PickupModel } from './pickup.model';
import { HttpClient } from '@angular/common/http';
import { map , switchMap} from 'rxjs/operators';

interface PickupData{
  status: string;
  note: string;
}

@Injectable({
  providedIn: 'root'
})
export class PickupsService {
  //definisemo nase pickupe kao subject-aktivniji observable na koji cemo se mi pretplatiti i sami voditi racuna o next medodama (ono unutar subscribe)-kada ce se one pozivati - brinemo u servisu(getPickups metod)
  private _pickups: new BehaviorSubject<PickupModel[]>([]);

  // private _pickups: PickupModel[] = [];

  // pickups: PickupModel[] = [
  //   {id:'p1',status: 'Processing',createdAt: '10/04/2022',updatedAt: '13/04/2022',notes:' Two pair of pants.'},
  //   {id:'p2',status: 'Finished',createdAt: '12/04/2022',updatedAt: '13/04/2022',notes:' Two pair of pants.'}
  // ];


  constructor(private http: HttpClient) { }

  //getter za pickup promenljivu definisanu gore
  get pickups(): PickupModel[]{
    // return this._pickups;
    //posto je sad subject vracamo je kao observable
    return this._pickups.asObservable();

  }

  createPickup(status: string, note:string){
    let generatedId;
    //povratna vrednost je id pickupa mi je presrecemo sa map operatorom i prosirujemo niz u servisu sa upravo dodatim citatom
   return this.http.post<{name:string}>('https://hers-app-2023-default-rtdb.europe-west1.firebasedatabase.app/pickups.json', 
                                  {
                                    status,
                                    note
                                  }).pipe(switchMap((resData)=> {
                                    generatedId = resData.name;
                                    return this.pickups;
                                  }),
                                  take(1),
                                  tap((pickups) => {
                                    this._pickups.next(pickups.concat({
                                        id: generatedId,
                                        status,
                                        notes,
                                        createdAt: '10/03/2023' ,
                                        updatedAt: '10/03/2023'
                                  }));
    return this._pickups;
  }
  getPickups(){
    //map operator za sredjivanje objekta/observable koji dobijamo nazad iz firebase-a- presrecemo vrednost pickupData iz next metode
    return this.http.get<{[key:string]:PickupData}>('https://hers-app-2023-default-rtdb.europe-west1.firebasedatabase.app/pickups.json')
    .pipe(
      map((pickupData) => {
      //emitujemo novu vrednost na koju zelimo da se subscibujemo
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
      //vrednost tog niza je vrednost sredjenog niza
      // this._pickups= pickups;
      //brinemo kada se poziva next metoda
      this._pickups.next(pickups);

      return pickups;

      }),
      tap(pickups => {
        this._pickups.next(pickups);
      }));
  }
  getPickup(id: string){
    console.log('getPickup');
    return this.pickups.find((p) => p.id === id);
  }
}
