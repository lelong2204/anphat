import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'identifier',
  templateUrl: './identifier-component.component.html',
  styleUrls: ['./identifier-component.component.less']
})
export class IdentifierComponentComponent implements AfterViewInit {

  @Input() identifiers:any[]=[];

  constructor() { }

  ngAfterViewInit() {
  }

}
