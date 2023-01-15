import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FhirService } from 'src/app/services/fhir.service';

@Component({
  selector: 'designation-element',
  templateUrl: './designation-element.component.html',
  styleUrls: ['./designation-element.component.less']
})
export class DesignationElementComponent implements AfterViewInit {

  @Input() code:string;
  @Input() designation:any[];

  languagesValueSet:any;
  constructor(private fhirService:FhirService) { 
    var __this=this;
    fhirService.read("ValueSet","languages").subscribe({next(value) {
      __this.languagesValueSet=value;
    },})
  }

  ngAfterViewInit() {
    if(this.designation==null){
      this.designation=[]
    }
  }

}
