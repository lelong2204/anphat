import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-diagnosticreport',
  templateUrl: './diagnosticreport.component.html',
  styleUrls: ['./diagnosticreport.component.less']
})
export class DiagnosticreportComponent implements OnInit {

  constructor(private sharedService: SharedService) { 
    this.sharedService.emitChange("Diagnostic report");

  }

  ngOnInit(): void {
  }

}
