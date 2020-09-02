import { Component, OnInit } from '@angular/core';
import { AlertComponent } from '../../../../theme/alert/alert.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { PermissionModel } from '../../../../../model/permission/permission';
import { PermissionService } from '../../../../../service/permission/permission.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RoleService } from '../../../../../service/role/role.service';
import { RoleModel } from '../../../../../model/role/role';

@Component({
  selector: 'app-save-role',
  templateUrl: './save-role.component.html',
  styleUrls: ['./save-role.component.css']
})
export class SaveRoleComponent implements OnInit {

  editId: any;
  permissionArray: PermissionModel[] = new Array();

  roleFormGroup=new FormGroup({
    name: new FormControl('', Validators.required),
    permission: new FormControl('', Validators.required),
  });

  get Name (){
    return this.roleFormGroup.get('name');
  }

  get Permission (){
    return this.roleFormGroup.get('permission');
  }

  loadingMain = false;
  
  constructor(private permissionService:PermissionService,private roleService:RoleService,public dialog: MatDialog,private router:Router,private activatedRouter:ActivatedRoute) {
    
  }

  ngOnInit() {
    this.loadAllActivePermissions();
  }

  loadAllActivePermissions(){
    this.loadingMain = true;
    this.permissionService.getAllPermissions().subscribe(response => {
      console.log(response);
      this.permissionArray = new Array();
      if(response!= null){
        response.forEach(perm => {
          let permission = new PermissionModel();
          permission.Id = perm.id;
          permission.CreateDate = new Date(perm.createDate);
          permission.Name = perm.name;
          permission.Status = perm.status;
          permission.UpdateDate = new Date(perm.updateDate);
          this.permissionArray.push(permission);
        });
      }

      this.activatedRouter.params.subscribe(params=>{
        this.editId=params.id;
        if(this.editId !== undefined && this.editId !== null && this.editId !== ""){
          this.getRole();
        }
      });
      
      this.loadingMain = false;
    },error=>{
      this.alert("Oopzz..", error.error, "error");
    });
  }

  getRole(){
    this.loadingMain = true;
    this.roleService.getRole(this.editId).subscribe(response => {
      console.log(response);
      this.loadingMain = false;
      if(response !== null){
        this.Name.setValue(response.name);
        let permissionList = new Array();
        response.permissionDtos.forEach(element => {
          permissionList.push(element.id);
        });
        this.Permission.setValue(permissionList);
      }
      
    },error=>{
      this.alert("Oopzz..", error.error, "error");
    });
  }

  saveRole(){
    if(this.roleFormGroup.valid){
      this.loadingMain = true;
      let role:RoleModel = new RoleModel();
      role.Name = this.Name.value;

      let permissionNameArray : string[] = this.Permission.value;
        let permissionArray : PermissionModel[] = new Array();
        permissionNameArray.forEach(permi => {
          permissionArray.push(this.permissionArray.find((perm) => permi == perm.Id));
        });

        role.PermissionDtos = permissionArray;

        if(this.editId !== undefined && this.editId !== null && this.editId !== ""){
          role.Id = this.editId;
          this.roleService.updateRole(role).subscribe(response => {
            this.loadingMain = false;
            if(response == "Success"){
              this.alert("Success", "Role Updated Successfully !.", "success");
              this.editId = "";
              this.router.navigate(['home/role/']);
            }else{
              this.alert("Failed", response, "error");
            } 
          },
          error=>{
            this.loadingMain = false;
            this.alert("Oopzz..", error.message, "error");
          });
        }else{
          this.roleService.saveRole(role).subscribe(response => {
            this.loadingMain = false;
            if(response == "Success"){
              this.alert("Success", "Role Added Successfully !.", "success");
              this.router.navigate(['home/role/']);
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
