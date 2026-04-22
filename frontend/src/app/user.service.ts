import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlBase = "http://localhost:8081/plataforma-programuat"

  private clientHttp = inject(HttpClient)

    private userParam = new BehaviorSubject<User>(new User());
    user$ = this.userParam.asObservable();

  constructor() { }

  getUserByEmail(email : string, password:string) : Observable<User>{
        const params = new HttpParams()
      .set('email', email)
      .set('password', password);
    return this.clientHttp.get<User>(this.urlBase+"/login", {params})
  }

  setUser(userValue : User){
    this.userParam.next(userValue);
  }

  getUser(){
    return this.userParam.getValue();
  }

  saveUser(user:User):Observable<Object>{
    return this.clientHttp.post(this.urlBase+"/create-account",user);
  }
}
