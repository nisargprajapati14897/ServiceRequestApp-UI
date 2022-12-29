import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APIResponse, ServiceRequest } from '../../../models/service-request';
import { ServiceRequestService } from '../../../services/serviceRequest.service';

@Component({
  selector: 'app-add-service-request',
  templateUrl: './add-service-request.component.html',
  styleUrls: ['./add-service-request.component.css']
})
export class AddServiceRequestComponent implements OnInit {

  modelServiceRequest = new ServiceRequest();
  formData: FormData = new FormData();
  APIResponse: any;

  AddServiceRequestForm = new FormGroup({
    serviceRequestId : new FormControl(0),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    mobileNo: new FormControl(0),
    email: new FormControl(''),
    enquiryPurpose: new FormControl(''),
    comments: new FormControl(''),
  });
  message: any;

  constructor(public router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private ServiceRequestService: ServiceRequestService) { }

  ngOnInit() {

    this.setAddForm();
  }

  setAddForm() {
    this.AddServiceRequestForm.setValue({
      serviceRequestId: 0,
      firstName: '',
      lastName: '',
      mobileNo: 0,
      email: '',
      enquiryPurpose: '',
      comments: ''
    });
  }

  setFormBuilder() {
    this.AddServiceRequestForm = this.formBuilder.group({
      serviceRequestId: [0],
      firstName: ['', Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-Z0-9 _&+@#^()%!-]*$")],
      lastName: ['', Validators.required,  Validators.maxLength(50), Validators.pattern("^[a-zA-Z0-9 _&+@#^()%!-]*$")],
      mobileNo: [0, Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      email: ['', Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
      enquiryPurpose: ['', Validators.maxLength(50)],
      comments: ['', Validators.required]
    });
  }

  setEditForm() {
    this.AddServiceRequestForm.setValue({
      serviceRequestId: this.modelServiceRequest.serviceRequestId,
      firstName: this.modelServiceRequest.firstName == null ? "" : this.modelServiceRequest.firstName,
      lastName: this.modelServiceRequest.lastName == null ? "" : this.modelServiceRequest.lastName,
      mobileNo: this.modelServiceRequest.mobileNo,
      email: this.modelServiceRequest.email == null ? "" : this.modelServiceRequest.email,
      enquiryPurpose: this.modelServiceRequest.enquiryPurpose == null ? "" : this.modelServiceRequest.enquiryPurpose,
      comments: this.modelServiceRequest.comments == null ? "" : this.modelServiceRequest.comments
    });
  }

  setModelBeforeSubmit() {
    this.formData = new FormData();
    //this.formData.append('serviceRequestId', String(this.serviceRequestId));
    this.formData.append('firstName', String(this.modelServiceRequest.firstName).trim());
    this.formData.append('lastName', String(this.modelServiceRequest.lastName).trim());
    this.formData.append('mobileNo', String(this.modelServiceRequest.mobileNo).trim());
    this.formData.append('email', String(this.modelServiceRequest.email).trim());
    this.formData.append('enquiryPurpose', String(this.modelServiceRequest.enquiryPurpose).trim());
    this.formData.append('comments', String(this.modelServiceRequest.comments).trim());
  }

  submitform() {
    //this.modelServiceRequest =  this.AddServiceRequestForm.value;
    const val = this.AddServiceRequestForm.value;
    if (this.AddServiceRequestForm.valid) {

      if (this.AddServiceRequestForm.value.firstName?.trim() == "" ||
        this.AddServiceRequestForm.value.lastName?.trim() == "" ||
        this.AddServiceRequestForm.value.mobileNo == null ||
        this.AddServiceRequestForm.value.email?.trim() == "" ||
        this.AddServiceRequestForm.value.enquiryPurpose?.trim() == "" ||
        this.AddServiceRequestForm.value.comments?.trim() == "")
      {
         this.toastr.error("Please enter vaild Description.", "Validation Alert!", { timeOut: 5000,closeButton: true,progressBar: true,positionClass: "toast-top-right",extendedTimeOut: 2500,tapToDismiss: false,enableHtml: true});
       }
       else {

        this.setModelBeforeSubmit();
        let resp = this.ServiceRequestService.SaveServiceRequest(
          this.modelServiceRequest);resp.subscribe(
            (data)=> {
              this.APIResponse=(data)
              if (this.APIResponse.objResponse.statusCode == "200") {
                this.goToList()
                this.toastr.success("Service Request changes applied successfully..", "Success", { timeOut: 5000,closeButton: true,progressBar: true,positionClass: "toast-top-right",extendedTimeOut: 2500,tapToDismiss: false,enableHtml: true});
              }
              else if (this.APIResponse.objResponse.status == "400" && this.APIResponse.objResponse.statusCode == "BadRequest")
              {
                this.toastr.error(this.APIResponse.objResponse.statusCode, this.APIResponse.objResponse.status, { timeOut: 5000,closeButton: true,progressBar: true,positionClass: "toast-top-right",extendedTimeOut: 2500,tapToDismiss: false,enableHtml: true});
              }

        });
      }
    }
    else {
      this.toastr.error("Please fill required fields.", "Validation Alert", { timeOut: 5000,closeButton: true,progressBar: true,positionClass: "toast-top-right",extendedTimeOut: 2500,tapToDismiss: false,enableHtml: true});
    }

  }

  goToList() {
    this.router.navigate(["/Navbar/ListServiceRequest"]);
  }

  cleardata()
  {
    this.modelServiceRequest.firstName = "";
    this.modelServiceRequest.lastName = "";
    this.modelServiceRequest.mobileNo = 0;
    this.modelServiceRequest.email = "";
    this.modelServiceRequest.enquiryPurpose = "";
    this.modelServiceRequest.comments = "";
  }



}
