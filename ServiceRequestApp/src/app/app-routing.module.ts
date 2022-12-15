import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListServiceRequestComponent } from './views/serviceRequest/list-service-request/list-service-request.component'
import { AddServiceRequestComponent } from './views/serviceRequest/add-service-request/add-service-request.component'
import { UpdateServiceRequestComponent } from './views/serviceRequest/update-service-request/update-service-request.component'
import { DashboardComponent } from './views/serviceRequest/dashboard/dashboard.component'
import { NavbarComponent } from './views/serviceRequest/navbar/navbar.component'
import { LoginComponent } from './views/serviceRequest/login/login.component'
import {CanActivate} from "@angular/router";

const routes: Routes = [

  { path: '', redirectTo: 'Login', pathMatch: 'full' }, 

  { path: 'Login', component: LoginComponent, pathMatch: 'full' }, 

  {
    path: 'Navbar', component: NavbarComponent, children: [
      {path: '', redirectTo: 'Navbar', pathMatch: 'full'},
      {path: 'ListServiceRequest', component: ListServiceRequestComponent},
      {path: 'AddServiceRequest', component: AddServiceRequestComponent},
      {path: 'UpdateServiceRequest/:id', component: UpdateServiceRequestComponent},
      {path: 'Dashboard', component: DashboardComponent},
      //{path: 'Navbar', component: NavbarComponent},
      //{path: 'Login', component: LoginComponent},
    ]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
