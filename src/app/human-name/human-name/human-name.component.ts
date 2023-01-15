import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'human-name',
  templateUrl: './human-name.component.html',
  styleUrls: ['./human-name.component.less']
})
export class HumanNameComponent implements AfterViewInit {

  @Input() names:any=[]
given:string[]=['','']
  constructor() { }

  ngAfterViewInit() {
    console.log(this.names)
  }

  onNameRowInserting(e:any){
    e.data.given=['','']
  }

  onNameRowInserted(e:any){
    e.data.given[0]= e.data['given[0]'];
    e.data.given[1]= e.data['given[1]'];
    delete e.data['given[0]'];
    delete e.data['given[1]'];
    console.log(this.names)
  }

}
