import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertComponent } from '../../../../theme/alert/alert.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ConfirmationAlertComponent } from '../../../../theme/alert/confirmation-alert/confirmation-alert.component';
import { PermissionService } from '../../../../../service/permission/permission.service';
import { Router } from '@angular/router';
import { MatInput } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { PermissionModel } from '../../../../../model/permission/permission';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-view-permission',
  templateUrl: './view-permission.component.html',
  styleUrls: ['./view-permission.component.css']
})
export class ViewPermissionComponent implements OnInit {

  permissionArray: PermissionModel[] = new Array();

  displayedColumnsPermission: string[] = ['name', 'createDate', 'updateDate', 'edit','remove'];
  
  datasourcePermission= new MatTableDataSource<PermissionModel>(this.permissionArray);
  confirmationResult: any;
  approve: boolean = false;

  @ViewChild('searchText',{static:true}) searchText: MatInput;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;

  loadingMain = false;

  permissions:string[] = new Array();

  constructor(private permissionService:PermissionService,private router:Router,private dialog: MatDialog) { 
   
  }

  ngOnInit() {
    this.searchText.focus();
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 5;
    this.loadAllPermissions();
  }

  loadAllPermissions(){
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
      this.datasourcePermission.data = this.permissionArray;
      this.datasourcePermission.paginator = this.paginator;
      this.loadingMain = false;
    },error=>{
      this.alert("Oopzz..", error.error, "error");
    });
  }

  applyFilter(filterValue: string) {
    this.datasourcePermission.filter = filterValue.trim().toLowerCase();
  }

  editPermission(id){
    this.router.navigate(['home/permission/savepermission/'+id]);
  }

  alertconfirmation(title: string, message: string [], type: string, method: string,permission:String) {
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
        this.removePermission(permission);
      }else{
        this.approve=false;
      }

    });

  }

  removePermission(permission: any) {
    let text = permission.status == 1 ? 'INACTIVE':'ACTIVE';
    if(!this.approve){
      this.alertconfirmation("Are You Sure",["Do you want to "+text+" this ?"],"error","",permission);
    }
    if(this.approve){
      this.loadingMain = true;
      this.permissionService.deletePermission(permission).subscribe(result=>{
        this.loadingMain = false;
        if(result == "Success"){
          this.loadAllPermissions();
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
