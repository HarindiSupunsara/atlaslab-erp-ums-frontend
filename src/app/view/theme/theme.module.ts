import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeComponent } from './view/theme.component';
import { ThemeRoutingModule } from './theme-routing.module';
import { MatComponentsModule } from 'src/app/mat-components.module';
import { MainNavComponent } from './main-nav/main-nav.component';
import { FooterComponent } from './footer/footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations: [ThemeComponent, MainNavComponent, FooterComponent],
  imports: [
    CommonModule,
    ThemeRoutingModule,
    MatComponentsModule,
    FlexLayoutModule
  ]
})
export class ThemeModule { }
