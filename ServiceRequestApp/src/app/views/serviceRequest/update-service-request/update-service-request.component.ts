import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceRequest } from 'src/app/models/service-request';
import { ServiceRequestService } from '../../../services/serviceRequest.service';


@Component({
  selector: 'app-update-service-request',
  templateUrl: './update-service-request.component.html',
  styleUrls: ['./update-service-request.component.css']
})

export class UpdateServiceRequestComponent implements OnInit {
  
  modelServiceRequest = new ServiceRequest();
  formData: FormData = new FormData();
  APIResponse: any;
  id:any;

  UpdateServiceRequestForm = new FormGroup({
    serviceRequestId : new FormControl(0),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    mobileNo: new FormControl(0),
    email: new FormControl(''),
    enquiryPurpose: new FormControl(''),
    comments: new FormControl(''),
  });
  message: any;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(public router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private ServiceRequestService: ServiceRequestService) { 
      
    }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];

    this.ServiceRequestService.getServiceRequestById(this.id).subscribe(data => {
        console.log(data)
        this.APIResponse = data;
        this.modelServiceRequest = this.APIResponse.objResponse.responseContent;
      }, error => console.log(error));
  }

  setUpdateForm() {
    this.UpdateServiceRequestForm.setValue({
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
    this.UpdateServiceRequestForm = this.formBuilder.group({
      serviceRequestId: [0],
      firstName: ['', Validators.maxLength(50), Validators.pattern("^[a-zA-Z0-9 _&+@#^()%!-]*$")],
      lastName: ['',  Validators.maxLength(50), Validators.pattern("^[a-zA-Z0-9 _&+@#^()%!-]*$")],
      mobileNo: [0,  Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      email: [''],
      enquiryPurpose: ['', Validators.maxLength(50)],
      comments: ['', Validators.required]
    });
  }

  setEditForm() {
    this.UpdateServiceRequestForm.setValue({
      serviceRequestId: this.modelServiceRequest.serviceRequestId,
      firstName: this.modelServiceRequest.firstName == null ? "" : this.modelServiceRequest.firstName.trim(),
      lastName: this.modelServiceRequest.lastName == null ? "" : this.modelServiceRequest.lastName.trim(),
      mobileNo: this.modelServiceRequest.mobileNo,
      email: this.modelServiceRequest.email == null ? "" : this.modelServiceRequest.email.trim(),
      enquiryPurpose: this.modelServiceRequest.enquiryPurpose == null ? "" : this.modelServiceRequest.enquiryPurpose.trim(),
      comments: this.modelServiceRequest.comments == null ? "" : this.modelServiceRequest.comments.trim()
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
    //this.modelServiceRequest =  this.UpdateServiceRequestForm.value;
    const val = this.UpdateServiceRequestForm.value;
    if (this.UpdateServiceRequestForm.valid) {

      if (this.UpdateServiceRequestForm.value.firstName?.trim() == "" ||
        this.UpdateServiceRequestForm.value.lastName?.trim() == "" ||
        this.UpdateServiceRequestForm.value.mobileNo == null ||
        this.UpdateServiceRequestForm.value.email?.trim() == "" ||
        this.UpdateServiceRequestForm.value.enquiryPurpose?.trim() == "" ||
        this.UpdateServiceRequestForm.value.comments?.trim() == "")
      {
         this.toastr.error("Please enter vaild Description.", "Validation Alert!", { timeOut: 5000,closeButton: true,progressBar: true,positionClass: "toast-top-right",extendedTimeOut: 2500,tapToDismiss: false,enableHtml: true});
       }
       else {

        this.setModelBeforeSubmit();
        let resp = this.ServiceRequestService.updateServiceRequest(
          this.id,this.modelServiceRequest,this.httpOptions);resp.subscribe(
            (data)=> {
              this.APIResponse=(data)
              if (this.APIResponse.objResponse.statusCode == "200") {
                this.goToList()
                this.toastr.success("Service Request changes applied successfully..", "Success", { timeOut: 5000,closeButton: true,progressBar: true,positionClass: "toast-top-right",extendedTimeOut: 2500,tapToDismiss: false,enableHtml: true});
              }

        });
      }
    }
    else 
    {
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
