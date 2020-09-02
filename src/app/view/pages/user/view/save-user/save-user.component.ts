import { Component, OnInit } from '@angular/core';
import { AlertComponent } from '../../../../theme/alert/alert.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { RoleModel } from '../../../../../model/role/role';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RoleService } from '../../../../../service/role/role.service';
import { UserService } from '../../../../../service/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserModel } from '../../../../../model/user/user';

@Component({
  selector: 'app-save-user',
  templateUrl: './save-user.component.html',
  styleUrls: ['./save-user.component.css']
})
export class SaveUserComponent implements OnInit {
  editId: any;
  roleArray: RoleModel[] = new Array();

  roleFormGroup=new FormGroup({
    name: new FormControl('', Validators.required),
    nic: new FormControl('', Validators.pattern('^\\d{9}[v,V,x,X]{1}$|^\\d{12}$')),
    address1: new FormControl('',Validators.required),
    address2: new FormControl(''),
    address3: new FormControl('',Validators.required),
    mobile: new FormControl('', [Validators.pattern("^\\d{9}")]),
    role: new FormControl('', Validators.required),
  });

  get Name (){
    return this.roleFormGroup.get('name');
  }

  get Nic (){
    return this.roleFormGroup.get('nic');
  }

  get Address1 (){
    return this.roleFormGroup.get('address1');
  }

  get Address2 (){
    return this.roleFormGroup.get('address2');
  }

  get Address3 (){
    return this.roleFormGroup.get('address3');
  }

  get Mobile (){
    return this.roleFormGroup.get('mobile');
  }

  get Role (){
    return this.roleFormGroup.get('role');
  }

  loadingMain = false;
  
  constructor(private userService:UserService,private roleService:RoleService,public dialog: MatDialog,private router:Router,private activatedRouter:ActivatedRoute) {
    
  }

  ngOnInit() {
    this.loadAllActiveRoles();
  }

  loadAllActiveRoles(){
    this.loadingMain = true;
    this.roleService.getAllRoles().subscribe(response => {
      console.log(response);
      this.roleArray = new Array();
      if(response!= null){
        response.forEach(perm => {
          let role = new RoleModel();
          role.Id = perm.id;
          role.CreateDate = new Date(perm.createDate);
          role.Name = perm.name;
          role.Status = perm.status;
          role.UpdateDate = new Date(perm.updateDate);
          this.roleArray.push(role);
        });
      }

      this.activatedRouter.params.subscribe(params=>{
        this.editId=params.id;
        if(this.editId !== undefined && this.editId !== null && this.editId !== ""){
          this.getUser();
        }
      });
      
      this.loadingMain = false;
    },error=>{
      this.alert("Oopzz..", error.error, "error");
    });
  }

  getUser(){
    this.loadingMain = true;
    this.userService.getUser(this.editId).subscribe(response => {
      console.log(response);
      this.loadingMain = false;
      if(response !== null){
        this.Name.setValue(response.name);
        this.Mobile.setValue(response.mobile != null ? response.mobile:"");
        this.Address1.setValue(response.address1 != null ? response.address1:"");
        this.Address2.setValue(response.address2 != null ? response.address2:"");
        this.Address3.setValue(response.address3 != null ? response.address3:"");
        this.Nic.setValue(response.nic != null ? response.nic:"");

        let roleList = new Array();
        response.roleDtos.forEach(element => {
          roleList.push(element.id);
        });
        this.Role.setValue(roleList);
      }
      
    },error=>{
      this.alert("Oopzz..", error.error, "error");
    });
  }

  saveUser(){
    if(this.roleFormGroup.valid){
      this.loadingMain = true;
      let user:UserModel = new UserModel();
      user.Name = this.Name.value;
      user.Nic = this.Nic.value;
      user.Mobile = this.Mobile.value;
      user.Address3 = this.Address3.value;
      user.Address2 = this.Address2.value;
      user.Address1 = this.Address1.value;

      let roleNameArray : string[] = this.Role.value;
        let roleArray : RoleModel[] = new Array();
        roleNameArray.forEach(permi => {
          roleArray.push(this.roleArray.find((perm) => permi == perm.Id));
        });

        user.RoleDtos = roleArray;

        if(this.editId !== undefined && this.editId !== null && this.editId !== ""){
          user.Id = this.editId;
          this.userService.updateUser(user).subscribe(response => {
            this.loadingMain = false;
            if(response == "Success"){
              this.alert("Success", "User Updated Successfully !.", "success");
              this.editId = "";
              this.router.navigate(['home/user/']);
            }else{
              this.alert("Failed", response, "error");
            } 
          },
          error=>{
            this.loadingMain = false;
            this.alert("Oopzz..", error.message, "error");
          });
        }else{
          this.userService.saveUser(user).subscribe(response => {
            this.loadingMain = false;
            if(response == "Success"){
              this.alert("Success", "User Added Successfully !.", "success");
              this.router.navigate(['home/user/']);
            }else{
              this.alert("Failed", response, "error");
            } 
          },
          error=>{
            this.loadingMain = false;
            this.alert("Oopzz..", error.message, "error");
          });
        }
    }else{
      this.alert("Oopzz..", "Fill required data..", "error");
    }
    
  }


  alert(title: string, message: string, type: string) {
    const dialogConfig = new MatDialogConfig();
  
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: '',
      title: title,
      message: message,
      type: type
    };
  
    const dialogRef = this.dialog.open(AlertComponent, dialogConfig);
    }

}
