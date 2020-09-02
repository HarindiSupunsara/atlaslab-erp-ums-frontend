import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PermissionComponent } from './view/permission.component';
import { ViewPermissionComponent } from './view/view-permission/view-permission.component';
import { SavePermissionComponent } from './view/save-permission/save-permission.component';


const routes: Routes = [{
  path:'',
  component:PermissionComponent,
  children: [
    {
      path:'',
      component:ViewPermissionComponent
    },
    {
      path:'savepermission',
      component:SavePermissionComponent
    },
    {
      path:'savepermission/:id',
      component:SavePermissionComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionRoutingModule { }
