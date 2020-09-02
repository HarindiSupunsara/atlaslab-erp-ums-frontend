import { PermissionModel } from '../permission/permission';

export class MenuModel{

    constructor(private id?:string,private name?:string,private url?:string,private icon?:string,private status?:string,private permissionDtos?:PermissionModel[]){}

    get Id(){
        return this.id;
    }

    set Id(id:string){
        this.id=id;
    }
    
    get Name(){
        return this.name;
    }

    set Name(name:string){
        this.name=name;
    }

    get Url(){
        return this.url;
    }

    set Url(url:string){
        this.url=url;
    }

    get Icon(){
        return this.icon;
    }

    set Icon(icon:string){
        this.icon=icon;
    }

    get Status(){
        return this.status;
    }

    set Status(status:string){
        this.status=status;
    }

    get PermissionDtos(){
        return this.permissionDtos;
    }

    set PermissionDtos(permissionDtos:PermissionModel[]){
        this.permissionDtos=permissionDtos;
    }

}