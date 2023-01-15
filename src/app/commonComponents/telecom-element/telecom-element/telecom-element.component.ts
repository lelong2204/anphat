import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'telecom-element',
  templateUrl: './telecom-element.component.html',
  styleUrls: ['./telecom-element.component.less']
})
export class TelecomElementComponent implements OnInit {

  @Input() telecoms:any[]=[];
  constructor() { }

  ngOnInit() {
  }

}
