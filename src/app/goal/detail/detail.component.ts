import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FhirService } from 'src/app/services/fhir.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less']
})
export class GoalDetailComponent implements OnInit {

  goal:any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private fhirService:FhirService) { 

      var __this=this;
    this.activatedRoute.params.subscribe((params: Params) => {
      var id: string = params['id'];

      fhirService.read("Goal",id).subscribe({next(value) {
          __this.goal=value;
      },})
    
    });
  }

  ngOnInit(): void {
  }

}
