import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FhirService } from 'src/app/services/fhir.service';

@Component({
  selector: 'goal-outcome',
  templateUrl: './goal-outcome-component.component.html',
  styleUrls: ['./goal-outcome-component.component.less'],
})
export class GoalOutcomeComponentComponent implements AfterViewInit {
  @Input() goalId: string;
  @Input() outComes: any[];
  procedureReason:any;
  dropDownOptions:any;
  selectedCodes:string[]=[]


  @Output() newOutComeUpdateEvent=new EventEmitter<any>()

  constructor(private fhirService: FhirService) {
    this.dropDownOptions={
      with:500
    }
  }

  ngOnInit(): void {
    var __this=this
    this.fhirService.read('CodeSystem', 'procedure-reason').subscribe({
      next(result) {
        __this.procedureReason = result
      },
    })
  }

  ngAfterViewInit(): void {
    if (this.outComes == null) this.outComes = [];
    else{
      this.outComes.forEach(outCome => {
        this.selectedCodes.push(outCome.coding[0].code)
      });
    }
  }
  initNewOutComeRow(e: any) {}
  onOutComeRowInserted(e: any) {}
  reasonSelectionChanged(e:any){
    var __this=this;
    var outComes:any[]=[];
    this.selectedCodes.forEach(selectedCode => {
      for(var i=0;i<this.procedureReason.concept.length;i++){
        if(__this.procedureReason.concept[i].code==selectedCode){
          outComes.push({
            coding:[{code:selectedCode,display:__this.procedureReason.concept[i].display}],
            text:__this.procedureReason.concept[i].display
          })
        }
      }
      
    });
    __this.outComes=outComes;
      __this.newOutComeUpdateEvent.emit({
        data:outComes,
        goalId :this.goalId
      })
  }
}
