import { RoleModel } from '../role/role';

export class UserModel{
    
    constructor(private id?:string,private name?:string,private status?:string,private createDate?:Date,private updateDate?:Date,private roleDtos?: RoleModel[],
        private mobile?: string,
        private address1?: string,
        private address2?: string,
        private address3?: string,
        private nic?: string){}

    
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

    get RoleDtos(){
        return this.roleDtos;
    }

    set RoleDtos(roleDtos:RoleModel[]){
        this.roleDtos = roleDtos;
    }

    public get Mobile(): string {
        return this.mobile;
    }
    public set Mobile(value: string) {
        this.mobile = value;
    }

    public get Nic(): string {
        return this.nic;
    }
    public set Nic(value: string) {
        this.nic = value;
    }
    public get Address3(): string {
        return this.address3;
    }
    public set Address3(value: string) {
        this.address3 = value;
    }
    public get Address2(): string {
        return this.address2;
    }
    public set Address2(value: string) {
        this.address2 = value;
    }
    public get Address1(): string {
        return this.address1;
    }
    public set Address1(value: string) {
        this.address1 = value;
    }
}