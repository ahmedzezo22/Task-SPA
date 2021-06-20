import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userLoginModel } from '../Models/userLogin';
import { userRegister } from '../Models/userRegister';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
 baseUrl="http://localhost:5472/api/Account/"
 headers={
  headers:new HttpHeaders({
  'Content-Type':'Application/json'
  }),
  withCredentials:true
}
  constructor(private http:HttpClient) { }
  register(user:userRegister):Observable<userRegister>{
    return this.http.post<userRegister>(`${this.baseUrl}register`,user).pipe();
  }
  login(user:userLoginModel):Observable<userLoginModel>{
    return this.http.post<userLoginModel>(`${this.baseUrl}login`,user,this.headers).pipe()  }
}
