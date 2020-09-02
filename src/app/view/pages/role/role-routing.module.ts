import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleComponent } from './view/role.component';
import { ViewRoleComponent } from './view/view-role/view-role.component';
import { SaveRoleComponent } from './view/save-role/save-role.component';


const routes: Routes = [{
  path:'',
  component:RoleComponent,
  children: [
    {
      path:'',
      component:ViewRoleComponent
    },
    {
      path:'saverole',
      component:SaveRoleComponent
    },
    {
      path:'saverole/:id',
      component:SaveRoleComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
