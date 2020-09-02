import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MAIN_URL } from '../../model/common/url';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../../model/user/user';

const SUB_URL = "user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getAllUsers():Observable<any[]>{
    return this.http.get<any[]>(MAIN_URL+SUB_URL);
  }

  getUser(id):Observable<any>{
    return this.http.get<any>(MAIN_URL+SUB_URL+"/"+id);
  }

  saveUser(user:UserModel):Observable<string>{
    return this.http.post<string>(MAIN_URL+SUB_URL,user, {responseType: 'text' as 'json'});
  }

  updateUser(user:UserModel):Observable<string>{
    return this.http.put<string>(MAIN_URL+SUB_URL,user, {responseType: 'text' as 'json'});
  }

  deleteUser(user: UserModel): Observable<string> {
    return this.http.delete<string>(MAIN_URL+SUB_URL+"/"+user.Id, {responseType: 'text' as 'json'});
  }
}
