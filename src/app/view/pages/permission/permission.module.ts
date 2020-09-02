import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPermissionComponent } from './view/view-permission/view-permission.component';
import { PermissionRoutingModule } from './permission-routing.module';
import { MatComponentsModule } from '../../../mat-components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PermissionComponent } from './view/permission.component';
import { SavePermissionComponent } from './view/save-permission/save-permission.component';


@NgModule({
  declarations: [SavePermissionComponent, ViewPermissionComponent, PermissionComponent],
  imports: [
    CommonModule,
    PermissionRoutingModule,
    MatComponentsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PermissionModule { }
