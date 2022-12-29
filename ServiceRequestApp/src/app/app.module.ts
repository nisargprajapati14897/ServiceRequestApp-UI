import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddServiceRequestComponent } from './views/serviceRequest/add-service-request/add-service-request.component';
import { UpdateServiceRequestComponent } from './views/serviceRequest/update-service-request/update-service-request.component';
import { ListServiceRequestComponent } from './views/serviceRequest/list-service-request/list-service-request.component';
import { DashboardComponent } from './views/serviceRequest/dashboard/dashboard.component';
import { NavbarComponent } from './views/serviceRequest/navbar/navbar.component';
import { LoginComponent } from './views/serviceRequest/login/login.component';
import { DataTablesModule } from 'angular-datatables';
import { AuthguardServicesService } from '././services/authguard-services.service';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    AddServiceRequestComponent,
    UpdateServiceRequestComponent,
    ListServiceRequestComponent,
    DashboardComponent,
    NavbarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    DataTablesModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [AuthguardServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
