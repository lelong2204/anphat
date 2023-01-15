import { Component, OnInit } from '@angular/core';
import { FhirService } from '../services/fhir.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.less']
})
export class ServiceRequestComponent implements OnInit {
  dataSource: any;
  constructor(private fhirService:FhirService,
    private sharedService: SharedService
    ) { }

  ngOnInit(): void {
    var __this=this;
    this.sharedService.emitChange("Service request");

    this.fhirService.get('ServiceRequest').subscribe({next(result) {
      __this.dataSource=result.entry;
    },})
  }

}
