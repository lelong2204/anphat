import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'contact-element',
  templateUrl: './contact-element.component.html',
  styleUrls: ['./contact-element.component.less']
})
export class ContactElementComponent implements OnInit {

  @Input() contacts:any[]=[];
  
  constructor() { }

  ngOnInit() {
  }

}
