import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'valueSetConcept-element',
  templateUrl: './valueSetConcept-element.component.html',
  styleUrls: ['./valueSetConcept-element.component.less']
})
export class ValueSetConceptElementComponent implements AfterViewInit {
  @Input() concept:any[];
  @Output() conceptSelectionChangedEvent =new EventEmitter<any>();
  constructor() { }

  ngAfterViewInit() {
  }
  onConceptSelectionChanged(selectedRowsData:any[]){
    if(selectedRowsData.length>0){
      this.conceptSelectionChangedEvent.emit(selectedRowsData[0])
    }
  }
}
