import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertComponent } from '../../../../theme/alert/alert.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ConfirmationAlertComponent } from '../../../../theme/alert/confirmation-alert/confirmation-alert.component';
import { RoleModel } from '../../../../../model/role/role';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { PermissionModel } from '../../../../../model/permission/permission';
import { RoleService } from '../../../../../service/role/role.service';

@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.css']
})
export class ViewRoleComponent implements OnInit {

  roleArray: RoleModel[] = new Array();

  displayedColumnsPermission: string[] = ['name', 'createDate', 'updateDate',  'edit','remove'];
  
  datasourceRole= new MatTableDataSource<RoleModel>(this.roleArray);
  confirmationResult: any;
  approve: boolean = false;

  @ViewChild('searchText',{static:true}) searchText: MatInput;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;

  loadingMain = false;

  permissions:string[] = new Array();

  constructor(private roleService:RoleService,private router:Router,private dialog: MatDialog) { 
   
  }

  ngOnInit() {
    this.searchText.focus();
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 5;
    this.loadAllRoles();
  }

  loadAllRoles(){
    this.loadingMain = true;
    this.roleService.getAllRoles().subscribe(response => {
      console.log(response);
      this.roleArray = new Array();
      if(response!= null){
        response.forEach(rol => {
          let role = new RoleModel();
          role.Id = rol.id;
          role.CreateDate = new Date(rol.createDate);
          role.Name = rol.name;
          role.Status = rol.status;
          role.UpdateDate = new Date(rol.updateDate);

          let permissionArray = new Array();
          if(rol.permissionDtos != null){
            rol.permissionDtos.forEach(perm => {
              let permission = new PermissionModel();
              permission.Id = perm.id;
              permission.CreateDate = new Date(perm.createDate);
              permission.Name = perm.name;
              permission.Status = perm.status;
              permission.UpdateDate = new Date(perm.updateDate);
    
              permissionArray.push(permission);
              
            });
          }

          role.PermissionDtos = permissionArray;
          this.roleArray.push(role);
        });
        
      }
      this.datasourceRole.data = this.roleArray;
      this.datasourceRole.paginator = this.paginator;
      this.loadingMain = false;
    },error=>{
      this.alert("Oopzz..", error.error, "error");
    });
  }

  applyFilter(filterValue: string) {
    this.datasourceRole.filter = filterValue.trim().toLowerCase();
  }

  editRole(id){
    this.router.navigate(['home/role/saverole/'+id]);
  }

  alertconfirmation(title: string, message: string [], type: string, method: string,role:String) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: method,
      title: title,
      message: message,
      type: type
    };

    const dialogRef = this.dialog.open(ConfirmationAlertComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.confirmationResult=result.result;
      if(this.confirmationResult==="yes"){
        
        this.approve=true;
        this.removeRole(role);
      }else{
        this.approve=false;
      }

    });

  }

  removeRole(role: any) {
    let text = role.status == 1 ? 'INACTIVE':'ACTIVE';
    if(!this.approve){
      this.alertconfirmation("Are You Sure",["Do you want to "+text+" this ?"],"error","",role);
    }
    if(this.approve){
      this.loadingMain = true;
      this.roleService.deleteRole(role).subscribe(result=>{
        this.loadingMain = false;
        if(result == "Success"){
          this.loadAllRoles();
          this.alert("Success", "Successfully "+text+" !.", "success");
          this.approve=false;  
        }else{
            this.alert("Failed", result, "error");
          
        }
      });
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
