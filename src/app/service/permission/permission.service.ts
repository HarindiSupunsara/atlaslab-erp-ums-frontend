import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MAIN_URL } from '../../model/common/url';
import { PermissionModel } from '../../model/permission/permission';

const SUB_URL = "permission";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http:HttpClient) { }

  getAllPermissions():Observable<any[]>{
    return this.http.get<any[]>(MAIN_URL+SUB_URL);
  }

  getPermission(id):Observable<any>{
    return this.http.get<any>(MAIN_URL+SUB_URL+"/"+id);
  }

  savePermission(permission:PermissionModel):Observable<string>{
    return this.http.post<string>(MAIN_URL+SUB_URL,permission, {responseType: 'text' as 'json'});
  }

  updatePermission(permission:PermissionModel):Observable<string>{
    return this.http.put<string>(MAIN_URL+SUB_URL,permission, {responseType: 'text' as 'json'});
  }

  deletePermission(permission: PermissionModel): Observable<string> {
    return this.http.delete<string>(MAIN_URL+SUB_URL+"/"+permission.Id, {responseType: 'text' as 'json'});
  }
}
