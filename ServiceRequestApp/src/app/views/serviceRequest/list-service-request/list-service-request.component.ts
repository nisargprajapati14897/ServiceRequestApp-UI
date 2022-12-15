import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ServiceRequestService } from '../../../services/serviceRequest.service';
import { APIResponse, ServiceRequest } from '../../../models/service-request';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
 
@Component({
  selector: 'app-list-service-request',
  templateUrl: './list-service-request.component.html',
  styleUrls: ['./list-service-request.component.css']
})
export class ListServiceRequestComponent implements OnInit {

  public serviceRequest: any;
  data:any; 
  List: any = [];
  APIResponse: any;
  dtOptions: any = {}
  dtTrigger: Subject<any> = new Subject();
  dtElement: any;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private ServiceRequestService: ServiceRequestService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: ToastrService,
    public router: Router,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit() {

    this.dtOptions = this.dataTableOptions(true, false, false, true, true, false, true);

    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    //   processing: true
    // };

    this.getServiceRequest();
  }

  getlist() {
  this.router.navigate(["/Navbar/ListServiceRequest"]);
  }

  dataTableOptions(paging: any, lengthChange: any, searching: any, ordering: any, info: any, autoWidth: any, responsive: any, pageLength?: any) {
    var dtOptions = {
      "paging": paging,
      "lengthChange": lengthChange,
      "searching": searching,
      "ordering": ordering,
      "info": info,
      "autoWidth": autoWidth,
      "responsive": responsive,
      "pageLength": pageLength,
      'aoColumnDefs': [{
        'bSortable': false,
        'aTargets': [-1] /* 1st one, start by the right */
      }],
      "language": {
        'paginate': {
          'next': "Next  »",
          'previous': "«  Previous",
        }
      }
    }
    return dtOptions;
  }

  getServiceRequest() {
    this.ServiceRequestService.getAllServiceRequest()
      .subscribe( data => {
        console.log(data)
        this.APIResponse = data;
        this.serviceRequest = this.APIResponse.objResponse.responseContent;
        this.cdRef.detectChanges();
      });
  }

  addServiceRequest() {
    this.router.navigate(["/Navbar/AddServiceRequest"]);
  }

    deleteById(id: number) {
      this.ServiceRequestService.delete(id,this.httpOptions).subscribe(data => {
        this.APIResponse = data;
        if (this.APIResponse.objResponse.statusCode == "200")
        {
          this.toastr.success("Service Request deleted successfully.", "Success", { timeOut: 5000,closeButton: true,progressBar: true,positionClass: "toast-top-right",extendedTimeOut: 2500,tapToDismiss: false,enableHtml: true});

          const index: number = this.List.findIndex((x: { id: number; }) => x.id == id);
          if (index !== -1) {
            this.List.splice(index, 1);
            this.dtElement.dtInstance.then((dtInstance: any) => {
              dtInstance.destroy();
              this.dtTrigger.next("");
            });
          }
          this.getServiceRequest();
        }
        else {
          this.toastr.error("Transaction not completed.", "Transaction Fail", { timeOut: 5000,closeButton: true,progressBar: true,positionClass: "toast-top-right",extendedTimeOut: 2500,tapToDismiss: false,enableHtml: true});
        }
      },);
    }

}

