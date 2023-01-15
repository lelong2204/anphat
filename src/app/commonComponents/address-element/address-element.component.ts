import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'address-element',
  templateUrl: './address-element.component.html',
  styleUrls: ['./address-element.component.less']
})
export class AddressElementComponent implements AfterViewInit {

  @Input() addresses:any[];
  
  constructor() { }

  ngAfterViewInit() {
  }

}
