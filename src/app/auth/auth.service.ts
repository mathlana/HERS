import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { map, tap} from 'rxjs/operators';
import { User } from './user.model';


interface AuthResponseData{
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}
interface UserData{
  email: string;
  password:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user = new BehaviorSubject<User | null>(null);

  constructor( private http:HttpClient) { }

  get isUserAuthenticated() {
    return this._user.asObservable().pipe(
                                            map((user) => {
                                                            if(user){
                                                              return !!user.token;
                                                            } else{
                                                              return false;
                                                            }
                                                          })
                                          );

  }

  get userId(){
    return this._user.asObservable().pipe(
      map((user) => {
        if(user){
          return user.id;
        } else{
          return null;
        }
      })
    );

  }
  get token(){
    return this._user.asObservable().pipe(
      map((user) => {
        if(user){
          return user.token;
        } else{
          return null;
        }
      })
    );

  }

  register(user: UserData){
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPI}`, 
    {email: user.email, password: user.password, returnSecureToken:true})
    .pipe(
      tap((userData: AuthResponseData) => {
        const expirationTime = new Date( new Date().getTime() + +userData.expiresIn * 1000 );
        const user = new User(userData.localId, userData.email,userData.idToken, expirationTime);
        this._user.next(user);
      })
    );;
  }

  login(user: UserData){
   return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPI}`,
    {email: user.email, password: user.password, returnSecureToken:true})
    .pipe(
      tap((userData: AuthResponseData) => {
        const expirationTime = new Date( new Date().getTime() + +userData.expiresIn * 1000 );
        const user = new User(userData.localId, userData.email, userData.idToken, expirationTime);
        this._user.next(user);
      })
    );
  }
  logOut(){
    this._user.next(null);
  }
}
