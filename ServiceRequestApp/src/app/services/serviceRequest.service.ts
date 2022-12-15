import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginDetails, ServiceRequest, UserDetails } from '../models/service-request';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ServiceRequestService {

  baseurl = "/api/ServiceRequest/";

  constructor(private httpClient: HttpClient) { }

  //localhost:34628/api/ServiceRequest/GetAllServiceRequest

  // getAllServiceRequest(): Observable<ServiceRequest[]> {
  //   return this.httpClient.get<ServiceRequest[]>(environment.apiUrl + this.baseurl + 'GetAllServiceRequest')
  //   .pipe(
  //     catchError(this.errorHandler)
  //   )
  // }

  getAllServiceRequest() {
    return this.httpClient.get(environment.apiUrl + this.baseurl +  "GetAllServiceRequest" );
   }

  getServiceRequestById(id : number): Observable<ServiceRequest> {
    return this.httpClient.get<ServiceRequest>(environment.apiUrl  + this.baseurl +  'GetServiceRequestById/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  SaveServiceRequest(Req : any) {

    return this.httpClient.post(environment.apiUrl + this.baseurl +  "AddServiceRequest", Req );
  }

  updateServiceRequest(id: number, ServiceRequest: any, httpOptions:any){
    //const httpOptions = {  headers: new HttpHeaders({'Content-Type': 'application/json'})   }
    return this.httpClient.put(environment.apiUrl  + this.baseurl +  'UpdateServiceRequest/' + id, JSON.stringify(ServiceRequest),httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  delete(id: number,httpOptions:any){
    return this.httpClient.delete<ServiceRequest>(environment.apiUrl  + this.baseurl +  'DBDeleteServiceRequest/' + id, httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  SaveUserDetails(Sud : any) {

    return this.httpClient.post(environment.apiUrl + this.baseurl +  "AddUserDetails", Sud );
  }

  getLoginDetails(Username:any, url:string = "/", Password:any){
    return this.httpClient.get(environment.apiUrl  + this.baseurl +  "GetLoginDetails/" + Username + url + Password )
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error : any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }

}
