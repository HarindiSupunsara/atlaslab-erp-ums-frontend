import { MAIN_URL } from 'src/app/model/common/url';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuModel } from '../../model/menu/menu';

const SUB_URL = "menu/";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http:HttpClient) { }

  getAllMenus():Observable<any[]>{
    return this.http.get<any[]>(MAIN_URL+SUB_URL);
  }

}
