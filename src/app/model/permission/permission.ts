export class PermissionModel{
    constructor(private id?:string,private name?:string,private status?:number,private isSelect?:number,
        private  createDate?:Date,private  updateDate?:Date){}

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

    set Status(status:number){
        this.status=status;
    }

    get IsSelect(){
        return this.isSelect
    }

    set IsSelect(isSelect:number){
       this.isSelect = isSelect;
    }

    get CreateDate(){
        return this.createDate
    }

    set CreateDate(createDate:Date){
       this.createDate = createDate;
    }

    get UpdateDate(){
        return this.updateDate
    }

    set UpdateDate(updateDate:Date){
       this.updateDate = updateDate;
    }
}