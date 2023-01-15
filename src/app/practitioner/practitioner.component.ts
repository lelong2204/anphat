import { Component, OnInit } from '@angular/core';
import { FhirService } from '../services/fhir.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-practitioner',
  templateUrl: './practitioner.component.html',
  styleUrls: ['./practitioner.component.less']
})
export class PractitionerComponent implements OnInit {
  dataSource: any;

  constructor(private fhirService:FhirService,
    private sharedService: SharedService
    
    ) {
    var __this=this;
    this.sharedService.emitChange("Practitioner");

    this.fhirService.get('Practitioner').subscribe({next(result) {
      __this.dataSource=result.entry;
    },})
   }

  ngOnInit(): void {
  }

}
