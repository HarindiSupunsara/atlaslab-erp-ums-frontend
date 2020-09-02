import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../../../theme/alert/alert.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionService } from '../../../../../service/permission/permission.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PermissionModel } from '../../../../../model/permission/permission';

@Component({
  selector: 'app-save-permission',
  templateUrl: './save-permission.component.html',
  styleUrls: ['./save-permission.component.css']
})
export class SavePermissionComponent implements OnInit {

  editId: any;

  permissionFormGroup=new FormGroup({
    name: new FormControl('', Validators.required),
  });

  get Name (){
    return this.permissionFormGroup.get('name');
  }

  loadingMain = false;
  
  constructor(private permissionService:PermissionService,public dialog: MatDialog,private router:Router ,private activatedRouter:ActivatedRoute) {
    this.activatedRouter.params.subscribe(params=>{
      this.editId=params.id;
      if(this.editId !== undefined && this.editId !== null && this.editId !== ""){
        this.getPermission();
      }
    });
  }

  ngOnInit() {
  }

  getPermission(){
    this.loadingMain = true;
    this.permissionService.getPermission(this.editId).subscribe(response => {
      console.log(response);
      this.loadingMain = false;
      if(response !== null){
        this.Name.setValue(response.name);
      }
      
    },error=>{
      this.alert("Oopzz..", error.error, "error");
    });
  }

  savePermission(){
    if(this.permissionFormGroup.valid){
      this.loadingMain = true;
      let permission:PermissionModel = new PermissionModel();

      permission = new PermissionModel ();
      permission.Name = this.Name.value;

        if(this.editId !== undefined && this.editId !== null && this.editId !== ""){
          permission.Id = this.editId;
          console.log(permission);
          this.permissionService.updatePermission(permission).subscribe(response => {
            this.loadingMain = false;
            if(response == "Success"){
              this.alert("Success", "Permission Updated Successfully !.", "success");
              this.editId = "";
              this.router.navigate(['home/permission/']);
            }else{
              this.alert("Failed", response, "error");
            } 
          },
          error=>{
            this.loadingMain = false;
            this.alert("Oopzz..", error.error, "error");
          });
        }else{
          this.permissionService.savePermission(permission).subscribe(response => {
            this.loadingMain = false;
            if(response == "Success"){
              this.alert("Success", "Permission Added Successfully !.", "success");
              this.router.navigate(['home/permission/']);
            }else{
              this.alert("Failed", response, "error");
            } 
          },
          error=>{
            this.loadingMain = false;
            this.alert("Oopzz..", error.error, "error");
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
