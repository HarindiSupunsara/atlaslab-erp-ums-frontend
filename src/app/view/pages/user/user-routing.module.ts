import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaveUserComponent } from './view/save-user/save-user.component';
import { ViewUserComponent } from './view/view-user/view-user.component';
import { UserComponent } from './view/user.component';

const routes: Routes = [{
  path:'',
  component:UserComponent,
  children: [
    {
      path:'',
      component:ViewUserComponent
    },
    {
      path:'saveuser',
      component:SaveUserComponent
    },
    {
      path:'saveuser/:id',
      component:SaveUserComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
