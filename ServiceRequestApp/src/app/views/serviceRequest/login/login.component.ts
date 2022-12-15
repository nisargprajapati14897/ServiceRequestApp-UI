import { NodeWithI18n } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APIResponse, LoginDetails, UserDetails } from '../../../models/service-request';
import { ServiceRequestService } from '../../../services/serviceRequest.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [DatePipe]
})
export class LoginComponent implements OnInit {

  modelUserDetails = new UserDetails();
  modelLoginDetails = new LoginDetails();
  formData: FormData = new FormData();
  APIResponse: any;
  // Username:any;
  // Password:any;
  myDate = new Date();
  age:Number= 0;  
  DateTime:string = "";
  //var age = DateTime.Now.Year - dateOfBirth.Year;  
  message: any;
  Username: any;

  AddLoginDetailsForm = new FormGroup({
    Username: new FormControl(''),
    Password: new FormControl(''),
  });

  AddUserDetailsForm = new FormGroup({
    UserDetailsId : new FormControl(0),
    Username: new FormControl(''),
    Password: new FormControl(''),
    Dob: new FormControl(''),
    ContactNo: new FormControl(''),
    Gender: new FormControl(''),
  });
  
  constructor(private formBuilder: FormBuilder,
    public router: Router,
    private toastr: ToastrService,
    private ServiceRequestService: ServiceRequestService) { }

  ngOnInit() {

    this.setAddForm();
    localStorage.setItem('UserName',this.modelUserDetails.Username)
  }

  // Login Part

  setAddLoginForm() {
    this.AddLoginDetailsForm.setValue({
      Username: '',
      Password: ''
    });
  }

  setFormLoginBuilder() {
    this.AddLoginDetailsForm = this.formBuilder.group({
      Username: ['', Validators.maxLength(50)],
      Password: ['',  Validators.maxLength(50)]
    });
  }

  setEditLoginForm() {
    this.AddLoginDetailsForm.setValue({
      Username: this.modelUserDetails.Username == null ? "" : this.modelUserDetails.Username,
      Password: this.modelUserDetails.Password == null ? "" : this.modelUserDetails.Password
    });
  }

  setLoginModelBeforeSubmit() {
    this.formData = new FormData();
    this.formData.append('Username', String(this.modelUserDetails.Username).trim());
    this.formData.append('Password', String(this.modelUserDetails.Password).trim());
  }

  login(Username:string,Password:string)
  {

    if (this.AddLoginDetailsForm.valid) {

      if (this.AddLoginDetailsForm.value.Username?.trim() == "" ||
        this.AddLoginDetailsForm.value.Password?.trim() == "")
      {
        this.toastr.error("Please enter vaild Description.", "Validation Alert!", { timeOut: 5000,closeButton: true,progressBar: true,positionClass: "toast-top-right",extendedTimeOut: 2500,tapToDismiss: false,enableHtml: true});
      }
       else 
       {
        this.ServiceRequestService.getLoginDetails(Username,"/",Password).subscribe(data => {
          console.log(data)
          this.APIResponse = data;
          this.modelLoginDetails = this.APIResponse.objResponse.responseContent;
          if(this.APIResponse.objResponse.responseContent.statusCode == 200)
          {
            this.goToList();
            this.toastr.success("Login successfully..", "Success", { timeOut: 5000,closeButton: true,progressBar: true,positionClass: "toast-top-right",extendedTimeOut: 2500,tapToDismiss: false,enableHtml: true});
          }
          else{
          this.toastr.error("Check the credencial you have enter.", "Validation Alert", { timeOut: 5000,closeButton: true,progressBar: true,positionClass: "toast-top-right",extendedTimeOut: 2500,tapToDismiss: false,enableHtml: true});
          }
        }, error => console.log(error));
      }
    }
    else {
      this.toastr.error("Please fill required fields.", "Validation Alert", { timeOut: 5000,closeButton: true,progressBar: true,positionClass: "toast-top-right",extendedTimeOut: 2500,tapToDismiss: false,enableHtml: true});
    }
  }


  // Registration

  setAddForm() {
    this.AddUserDetailsForm.setValue({
      UserDetailsId: 0,
      Username: '',
      Password: '',
      Dob: '',
      ContactNo: '',
      Gender: ''
    });
  }

  setFormBuilder() {
    this.AddUserDetailsForm = this.formBuilder.group({
      UserDetailsId: [0],
      Username: ['', Validators.maxLength(50)],
      Password: ['',  Validators.maxLength(50)],
      Dob: ['', Validators.maxLength(50)],
      ContactNo: ['', Validators.maxLength(50)],
      Gender: ['', Validators.maxLength(50)],
    });
  }

  setEditForm() {
    this.AddUserDetailsForm.setValue({
      UserDetailsId: this.modelUserDetails.UserDetailsId,
      Username: this.modelUserDetails.Username == null ? "" : this.modelUserDetails.Username,
      Password: this.modelUserDetails.Password == null ? "" : this.modelUserDetails.Password,
      Dob: this.modelUserDetails.Dob == null ? "" : this.modelUserDetails.Dob,
      ContactNo: this.modelUserDetails.ContactNo == null ? "" : this.modelUserDetails.ContactNo,
      Gender: this.modelUserDetails.Gender == null ? "" : this.modelUserDetails.Gender
    });
  }

  setModelBeforeSubmit() {
    this.formData = new FormData();
    //this.formData.append('UserDetailsId', String(this.UserDetailsId));
    this.formData.append('Username', String(this.modelUserDetails.Username).trim());
    this.formData.append('Password', String(this.modelUserDetails.Password).trim());
    this.formData.append('Dob', String(this.modelUserDetails.Dob).trim());
    this.formData.append('ContactNo', String(this.modelUserDetails.ContactNo).trim());
    this.formData.append('Gender', String(this.modelUserDetails.Gender).trim());
  }

  submitform() {
    //this.modelUserDetails =  this.AddUserDetailsForm.value;
    const val = this.AddUserDetailsForm.value;
    if (this.AddUserDetailsForm.valid) {

      if (this.AddUserDetailsForm.value.Username?.trim() == "" ||
        this.AddUserDetailsForm.value.Password?.trim() == "" ||
        this.AddUserDetailsForm.value.Dob?.trim() == "" ||
        this.AddUserDetailsForm.value.ContactNo?.trim() == "" ||
        this.AddUserDetailsForm.value.Gender?.trim() == "" )
      {
        this.toastr.error("Please enter vaild Description.", "Validation Alert!", { timeOut: 5000,closeButton: true,progressBar: true,positionClass: "toast-top-right",extendedTimeOut: 2500,tapToDismiss: false,enableHtml: true});
      }
      else {
        this.setModelBeforeSubmit();
        let resp = this.ServiceRequestService.SaveUserDetails(
          this.modelUserDetails);resp.subscribe(
            (data)=> {
              this.APIResponse=(data)
              if(this.APIResponse.objResponse.statusCode == "400" && this.APIResponse.objResponse.status == "Vallidation Error")
              {
                this.toastr.warning("Dob must be greater then 18 years...", "Validation Alert", { timeOut: 5000,closeButton: true,progressBar: true,positionClass: "toast-top-right",extendedTimeOut: 2500,tapToDismiss: false,enableHtml: true});
              }
              else if (this.APIResponse.objResponse.statusCode == "400" && this.APIResponse.objResponse.status == "BadRequest")
              {
                this.toastr.error("Bad Request.", "Transaction Fail", { timeOut: 5000,closeButton: true,progressBar: true,positionClass: "toast-top-right",extendedTimeOut: 2500,tapToDismiss: false,enableHtml: true});
              }
              else if (this.APIResponse.objResponse.statusCode == "200") {
                //this.goToList()
                this.toastr.success("User Registered successfully..", "Success", { timeOut: 5000,closeButton: true,progressBar: true,positionClass: "toast-top-right",extendedTimeOut: 2500,tapToDismiss: false,enableHtml: true});
              }

        });
      }
    }
    else {
      this.toastr.error("Please fill required fields.", "Validation Alert", { timeOut: 5000,closeButton: true,progressBar: true,positionClass: "toast-top-right",extendedTimeOut: 2500,tapToDismiss: false,enableHtml: true});
    }

  }

  goToList() {
    this.router.navigate(['/Navbar/ListServiceRequest']);
    setTimeout(function(){
      window.location.reload();
    }, 1000);
  }


}
