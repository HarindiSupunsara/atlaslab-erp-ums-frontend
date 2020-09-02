import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveRoleComponent } from './view/save-role/save-role.component';
import { ViewRoleComponent } from './view/view-role/view-role.component';
import { RoleComponent } from './view/role.component';
import { RoleRoutingModule } from './role-routing.module';
import { MatComponentsModule } from '../../../mat-components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SaveRoleComponent, ViewRoleComponent, RoleComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    MatComponentsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RoleModule { }
