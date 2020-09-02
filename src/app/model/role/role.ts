import { PermissionModel } from '../permission/permission';

export class RoleModel{
    constructor(private id?:string,private name?:string,private status?:string,private createDate?:Date,private updateDate?:Date,private permissionDtos?: PermissionModel[]){}

    
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

    get Status(){
        return this.status;
    }

    set Status(status:string){
        this.status=status;
    }

    get CreateDate(){
        return this.createDate;
    }
    set CreateDate (createDate:Date){
        this.createDate = createDate;
    }

    get UpdateDate(){
        return this.updateDate;
    }
    set UpdateDate (updateDate:Date){
        this.updateDate = updateDate;
    }

    get PermissionDtos(){
        return this.permissionDtos;
    }

    set PermissionDtos(permissionDtos:PermissionModel[]){
        this.permissionDtos = permissionDtos;
    }
}