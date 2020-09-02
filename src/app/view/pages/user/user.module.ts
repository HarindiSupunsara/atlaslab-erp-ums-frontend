import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewUserComponent } from './view/view-user/view-user.component';
import { SaveUserComponent } from './view/save-user/save-user.component';
import { UserRoutingModule } from './user-routing.module';
import { MatComponentsModule } from '../../../mat-components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './view/user.component';



@NgModule({
  declarations: [UserComponent, ViewUserComponent, SaveUserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatComponentsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
