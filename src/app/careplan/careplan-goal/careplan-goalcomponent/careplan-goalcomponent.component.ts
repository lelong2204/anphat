import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core'
import { FhirService } from 'src/app/services/fhir.service'

@Component({
  selector: 'careplan-goal',
  templateUrl: './careplan-goalcomponent.component.html',
  styleUrls: ['./careplan-goalcomponent.component.less'],
})
export class CareplanGoalcomponentComponent implements AfterViewInit {
  @Input() key: string
  @Input() carePlanId: string
  @Input() rowData: any
  goalDataSource: any=[];
  popupGoalVisible: boolean = false
  formGoalData: any = {
    resourceType: 'Goal',
    description: {
      coding: [{ code: '', display: '' }],
      text: '',
    },
    priority: {
      coding: [{ code: '', display: '' }],
      text: '',
    },
    target: [],
  }
  dropDownOptions: object;
  observationCodes: any
  reasonCode: any
  goalPriority: any
  buttonOptions: any = {
    text: 'Lưu',
    type: 'success',
    useSubmitBehavior: true,
  }
  @Output() newGoalItemEvent = new EventEmitter<any>()
  addTargetButtonOptions: any
  constructor(private fhirService: FhirService) {
    this.addTargetButtonOptions = {
      icon: 'add',
      text: 'Thêm chỉ số',
      onClick: () => {
        if (this.formGoalData.target == null) this.formGoalData.target = []
        var target = {
          measure: {
            coding: [{ code: '', display: '' }],
            text: '',
          },
        }
        this.formGoalData.target.push(target)
      },
    }
  }
  ngOnInit() {}

  ngAfterViewInit(): void {
    var __this = this
    __this.dropDownOptions = { width: 800 };
    __this.fhirService.read('CodeSystem', 'procedure-reason').subscribe({
      next(result) {
        __this.reasonCode = result
      },
    })

    __this.fhirService.read('CodeSystem', 'goal-priority').subscribe({
      next(result) {
        __this.goalPriority = result
      },
    })
    __this.fhirService.read('CodeSystem', 'observation-codes').subscribe({
      next(result) {
        __this.observationCodes = result
      },
    })

    __this.getGoalList()
  }

  getGoalList() {
    var __this = this
    var goals: any[] = this.rowData.detail.goal
    if(goals!=null && goals.length>0){
      goals.forEach((goal) => {
        __this.fhirService
          .read(goal.type, goal.reference.split('/')[1])
          .subscribe({
            next(value) {
              __this.goalDataSource.push(value);
            },
          })
      })
    }
  }

  onGoalToolbarPreparing(e: any) {
    let toolbarItems = e.toolbarOptions.items
    let _this = this

    toolbarItems.push({
      widget: 'dxButton',
      options: {
        icon: 'plus',
        onClick: function () {
          _this.popupGoalVisible = true
        },
      },
      location: 'after',
    })
  }

  onGoalFormSubmit(e: any) {
    var __this = this
    console.log(this.formGoalData)
    this.fhirService.post(this.formGoalData).subscribe({
      next(value) {
        __this.addNewGoal(value)
        __this.goalDataSource.push(value)
      },
    })
    e.preventDefault()
  }

  onReasonCodeSelectionChanged(selectedRowKeys: any[], e: any) {
    if (selectedRowKeys.length > 0) {
      var codeableConcept = {
        text: selectedRowKeys[0].display,
        coding: [
          {
            code: selectedRowKeys[0].code,
            display: selectedRowKeys[0].display,
          },
        ],
      }
      this.formGoalData.description = codeableConcept
    }
  }
  onGoalPrioritySelectionChanged(selectedRowKeys: any[]) {
    if (selectedRowKeys.length > 0) {
      var codeableConcept = {
        text: selectedRowKeys[0].display,
        coding: [
          {
            code: selectedRowKeys[0].code,
            display: selectedRowKeys[0].display,
          },
        ],
      }
      this.formGoalData.priority = codeableConcept
    }
  }

  onTargetMeasureSelectionChanged(selectedRowKeys: any[], i: number) {
    var codeableConcept = {
      text: selectedRowKeys[0].display,
      coding: [
        { code: selectedRowKeys[0].code, display: selectedRowKeys[0].display },
      ],
    }
    this.formGoalData.target[i].measure = codeableConcept
  }

  addNewGoal(value: any) {
    this.newGoalItemEvent.emit(value)
  }

  onDescriptionSelectionChanged(selectedRowKeys:any[], cellInfo:any,component:any){
    var __this=this;
    if (selectedRowKeys.length > 0) {
      for(var i=0;i<__this.reasonCode.concept.length;i++){
        if(__this.reasonCode.concept[i].code==selectedRowKeys[0]){
          var codeableConcept={
            text:__this.reasonCode.concept[i].display,
            coding:[{code:__this.reasonCode.concept[i].code,display:__this.reasonCode.concept[i].display}]
          }
          cellInfo.setValue(codeableConcept);
        }
      }
      component.close();
    }
  }

  onPrioritySelectionChanged(selectedRowKeys:any[], cellInfo:any,component:any){
    var __this=this;
    if (selectedRowKeys.length > 0) {
      for(var i=0;i<__this.goalPriority.concept.length;i++){
        if(__this.goalPriority.concept[i].code==selectedRowKeys[0]){
          var codeableConcept={
            text:__this.goalPriority.concept[i].display,
            coding:[{code:__this.goalPriority.concept[i].code,display:__this.goalPriority.concept[i].display}]
          }
          cellInfo.setValue(codeableConcept);
        }
      }
      component.close();
    }
  }

  initNewGoalRow(e:any){
    e.data.resourceType='Goal'
  }

  onGoalRowInserting(e:any){
    console.log(e.data);

  }
}
