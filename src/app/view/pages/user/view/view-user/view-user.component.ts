import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModel } from '../../../../../model/user/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserService } from '../../../../../service/user/user.service';
import { RoleModel } from '../../../../../model/role/role';
import { ConfirmationAlertComponent } from '../../../../theme/alert/confirmation-alert/confirmation-alert.component';
import { AlertComponent } from '../../../../theme/alert/alert.component';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  userArray: UserModel[] = new Array();

  displayedColumnsUser: string[] = ['name', 'address','nic','mobile','createDate', 'updateDate',  'edit','remove'];
  
  datasourceUser= new MatTableDataSource<UserModel>(this.userArray);
  confirmationResult: any;
  approve: boolean = false;

  @ViewChild('searchText',{static:true}) searchText: MatInput;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;

  loadingMain = false;

  permissions:string[] = new Array();

  constructor(private userService:UserService,private router:Router,private dialog: MatDialog) { 
   
  }

  ngOnInit() {
    this.searchText.focus();
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 5;
    this.loadAllUsers();
  }

  loadAllUsers(){
    this.loadingMain = true;
    this.userService.getAllUsers().subscribe(response => {
      console.log(response);
      this.userArray = new Array();
      if(response!= null){
        response.forEach(usr => {
          let user = new UserModel();
          user.Id = usr.id;
          user.CreateDate = new Date(usr.createDate);
          user.Name = usr.name;
          user.Status = usr.status;
          user.UpdateDate = new Date(usr.updateDate);
          user.Address1 = usr.address1;
          user.Address2 = usr.address2;
          user.Address3 = usr.address3;
          user.Mobile =  usr.mobile;
          user.Nic =  usr.nic;

          let roleArray = new Array();
          if(usr.roleDtos != null){
            usr.roleDtos.forEach(rol => {
              let role = new RoleModel();
              role.Id = rol.id;
              role.CreateDate = new Date(rol.createDate);
              role.Name = rol.name;
              role.Status = rol.status;
              role.UpdateDate = new Date(rol.updateDate);
    
              roleArray.push(role);
              
            });
          }

          user.RoleDtos = roleArray;
          this.userArray.push(user);
        });
        
      }
      this.datasourceUser.data = this.userArray;
      this.datasourceUser.paginator = this.paginator;
      this.loadingMain = false;
    },error=>{
      this.alert("Oopzz..", error.error, "error");
    });
  }

  applyFilter(filterValue: string) {
    this.datasourceUser.filter = filterValue.trim().toLowerCase();
  }

  editUser(id){
    this.router.navigate(['home/user/saveuser/'+id]);
  }

  alertconfirmation(title: string, message: string [], type: string, method: string,user:String) {
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
        this.removeUser(user);
      }else{
        this.approve=false;
      }

    });

  }

  removeUser(user: any) {
    let text = user.status == 1 ? 'INACTIVE':'ACTIVE';
    if(!this.approve){
      this.alertconfirmation("Are You Sure",["Do you want to "+text+" this ?"],"error","",user);
    }
    if(this.approve){
      this.loadingMain = true;
      this.userService.deleteUser(user).subscribe(result=>{
        this.loadingMain = false;
        if(result == "Success"){
          this.loadAllUsers();
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
