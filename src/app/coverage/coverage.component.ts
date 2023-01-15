import { Component, OnInit } from '@angular/core';
import { FhirService } from '../services/fhir.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-coverage',
  templateUrl: './coverage.component.html',
  styleUrls: ['./coverage.component.less']
})
export class CoverageComponent implements OnInit {

  dataSource: any;
  constructor(private fhirService:FhirService,
    private sharedService: SharedService
    ) {
    var __this=this;
    this.sharedService.emitChange("Coverage");

    this.fhirService.get('Coverage').subscribe({next(result) {
      __this.dataSource=result.entry;
    },})
   }

  ngOnInit(): void {
  }

}
