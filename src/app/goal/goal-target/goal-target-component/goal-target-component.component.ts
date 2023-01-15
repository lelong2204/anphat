import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FhirService } from 'src/app/services/fhir.service';

@Component({
  selector: 'goal-target',
  templateUrl: './goal-target-component.component.html',
  styleUrls: ['./goal-target-component.component.less'],
})
export class GoalTargetComponentComponent implements AfterViewInit {
  @Input() goalId: string;
  dropDownOptions: any;
  observationCodes: any;
  targets: any[] = [];
  goal: any;

  @Output() updatedNewTargetEvent=new EventEmitter<any>()

  constructor(private fhirService: FhirService) {
    var __this = this;
    __this.dropDownOptions = { width: 500 };
  }

  ngAfterViewInit(): void {
    var __this = this;
    __this.fhirService.read('Goal', __this.goalId).subscribe({
      next(value) {
        if (value.target != null) {
          __this.targets = value.target;
        }
        __this.goal = value;
      },
    });

    this.fhirService.read('CodeSystem', 'observation-codes').subscribe({
      next(result) {
        __this.observationCodes = result;
      },
    });
  }

  onMeasureSelectionChanged(
    selectedRowKeys: any[],
    cellInfo: any,
    component: any
  ) {
    var __this = this;
    if (selectedRowKeys.length > 0) {
      for (var i = 0; i < __this.observationCodes.concept.length; i++) {
        if (__this.observationCodes.concept[i].code == selectedRowKeys[0]) {
          var codeableConcept = {
            text: __this.observationCodes.concept[i].display,
            coding: [
              {
                code: __this.observationCodes.concept[i].code,
                display: __this.observationCodes.concept[i].display,
              },
            ],
          };
          cellInfo.setValue(codeableConcept);
        }
      }
      component.close();
    }
  }

  initNewTargetRow(e: any) {}

  onTargetRowInserted(e: any) {
    var __this=this;
    this.updatedNewTargetEvent.emit({target:e.data,goalId:this.goalId});
  }

  parseCellInfor(cellInfo: any): string {
    if (cellInfo.value != null) return cellInfo.value.coding[0].code;
    return '';
  }
}
