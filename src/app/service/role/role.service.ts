import { MAIN_URL } from './../../model/common/url';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleModel } from 'src/app/model/role/role';

const SUB_URL = "role";


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http:HttpClient) { }

  getAllRoles():Observable<any[]>{
    return this.http.get<any[]>(MAIN_URL+SUB_URL);
  }

  getRole(id):Observable<any>{
    return this.http.get<any>(MAIN_URL+SUB_URL+"/"+id);
  }

  saveRole(role:RoleModel):Observable<string>{
    return this.http.post<string>(MAIN_URL+SUB_URL,role, {responseType: 'text' as 'json'});
  }

  updateRole(role:RoleModel):Observable<string>{
    return this.http.put<string>(MAIN_URL+SUB_URL,role, {responseType: 'text' as 'json'});
  }

  deleteRole(role: RoleModel): Observable<string> {
    return this.http.delete<string>(MAIN_URL+SUB_URL+"/"+role.Id, {responseType: 'text' as 'json'});
  }

}
