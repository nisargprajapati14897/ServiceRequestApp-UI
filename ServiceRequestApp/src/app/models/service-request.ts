// export class APIResponse {
//     ID = 0;
//     TransStatus = "";
//     status = "";
//     statusCode = "";
//     statusText = "";
//     responseContent : any = [];
//   }
  
  export interface APIResponse {
    ID : number;
    TransStatus : string;
    status : string;
    statusCode : number;
    statusText : string;
    responseContent : ServiceRequest;
  }

export class ServiceRequest{
  serviceRequestId : number = 0;
  firstName: string = "";
  lastName: string = "";
  mobileNo: number = 0;
  email: string = "";
  enquiryPurpose: string = "";
  comments: string = "";
}

export class UserDetails{
  UserDetailsId : number = 0;
  Username: string = "";
  Password: string = "";
  Dob: string = "";
  ContactNo: string = "";
  Gender: string = "";
}

export class LoginDetails{
  Username: string = "";
  Password: string = "";
}

export interface Service {
  
    serviceRequestId: number | undefined | null;
    firstName: string | undefined | null;
    lastName: string | undefined | null;
    mobileNo: number | undefined | null;
    email: string | undefined | null;
    enquiryPurpose: string | undefined | null;
    comments: string | undefined | null;
}
