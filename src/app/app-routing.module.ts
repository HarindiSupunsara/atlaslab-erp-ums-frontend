import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path: 'home',
    loadChildren : "src/app/view/theme/theme.module#ThemeModule",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
