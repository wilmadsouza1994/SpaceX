import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path:'',redirectTo:'/launches',pathMatch:'full'},
  {path:'launches',component:MainComponent},
  {path:'launches/:launch_year',component:MainComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[MainComponent]
