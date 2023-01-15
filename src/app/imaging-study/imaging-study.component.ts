import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-imaging-study',
  templateUrl: './imaging-study.component.html',
  styleUrls: ['./imaging-study.component.less']
})
export class ImagingStudyComponent implements OnInit {

  constructor(
    private sharedService: SharedService
  ) {
    this.sharedService.emitChange("Imaging study");
   }

  ngOnInit(): void {
  }

}
