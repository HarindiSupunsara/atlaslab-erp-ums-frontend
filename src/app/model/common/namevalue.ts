export class NameValue{

    constructor(private name?:string,private value?:string){}

    get Name(){
        return this.name;
    }

    set Name(name:string){
        this.name = name;
    }

    get Value(){
        return this.value;
    }

    set Value(value:string){
        this.value = value;
    }
}