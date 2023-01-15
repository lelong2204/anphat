import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FhirService } from 'src/app/services/fhir.service';

@Component({
  selector: 'concept-element',
  templateUrl: './concept-element.component.html',
  styleUrls: ['./concept-element.component.less']
})
export class ConceptElementComponent implements AfterViewInit {

  @Input() url:string;
  codeSystem:any;
  constructor(private fhirService:FhirService) { }

  ngAfterViewInit() {
    var __this=this;
    this.fhirService.read(this.url.split('/')[0],this.url.split('/')[1]).subscribe({next(value) {
      __this.codeSystem=value;
    },})
  }

}
