import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThemeComponent } from './view/theme.component';

const routes: Routes = [
  {
    path: '',
    component: ThemeComponent,
    children:[
      {
        path: '',
        loadChildren : "src/app/view/pages/home/home.module#HomeModule"
      },
      {
        path: 'home',
        loadChildren : "src/app/view/pages/home/home.module#HomeModule"
      },
      {
        path: 'permission',
        loadChildren : "src/app/view/pages/permission/permission.module#PermissionModule"
      },
      {
        path: 'role',
        loadChildren : "src/app/view/pages/role/role.module#RoleModule"
      },
      {
        path: 'user',
        loadChildren : "src/app/view/pages/user/user.module#UserModule"
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ThemeRoutingModule { }
