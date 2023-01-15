import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { FhirService } from 'src/app/services/fhir.service'
import { v4 as uuid } from 'uuid'

@Component({
  selector: 'app-careplan-detail',
  templateUrl: './careplan-detail.component.html',
  styleUrls: ['./careplan-detail.component.less'],
})
export class CareplanDetailComponent implements OnInit {
  carePlan: any
  settingGoal: any
  procedureReason: any
  activityKind:any
  procedureCode:any
  gridBoxValue: string[] = []
  activities: any[] = []
  nameEditorOptions: any
  dropDownOptions: object;
  constructor(
    private activatedRoute: ActivatedRoute,
    private fhirService: FhirService,
  ) {
    var __this = this
    __this.nameEditorOptions = {
      disabled: true,
    }
    __this.dropDownOptions = { width: 500 };

    this.activatedRoute.params.subscribe((params: Params) => {
      var id: string = params['id']

      fhirService.read('CarePlan', id).subscribe({
        next(value) {
          __this.carePlan = value
          if (value.activity.length > 0) {
            for (var i = 0; i < value.activity.length; i++) {
              var activity = value.activity[i]
              __this.activities.push(activity)
            }
          }
        },
      })
    })
  }

  onRowGoalInserting(activity: any, index: number) {
    var goal = this.activities[index].detail.goal[0]
  }

  ngOnInit(): void {
    var _this = this
    this.fhirService.read('CodeSystem', 'care-plan-activity-kind').subscribe({
      next(result) {
        _this.activityKind = result
      },
    })
    this.fhirService.read('CodeSystem', 'procedure-codes').subscribe({
      next(result) {
        _this.procedureCode = result
      },
    })
    this.fhirService.read('CodeSystem', 'procedure-reason').subscribe({
      next(result) {
        _this.procedureReason = result
      },
    })
  }

  addGoal(e: any) {
    var __this = this

    if (__this.carePlan.activity[0].detail.goal == null)
      __this.carePlan.activity[0].detail.goal = []
    __this.carePlan.activity[0].detail.goal.push({
      reference: `${e.resourceType}/${e.id}`,
      type: e.resourceType,
    })

    __this.fhirService.put(__this.carePlan).subscribe({
      next(value) {
      __this.carePlan=value;
      },
    })
  }

  initNewActivityRow(e:any){
    e.data.id=uuid();
  }
  onActivityRowInserting(e:any){
    var __this=this;
    var activity={
      id:e.data.id,
      detail:e.data.detail
    }
    if(this.carePlan.activity==null)
    this.carePlan.activity=[];
    this.carePlan.activity.push(activity);
    this.fhirService.put(this.carePlan).subscribe({next(value) {
      __this.carePlan=value;
    },})
  }

  onActivityKindSelectionChanged(selectedRowKeys:any[], cellInfo:any, component:any){
    cellInfo.setValue(selectedRowKeys[0]);
    if (selectedRowKeys.length > 0) {
      component.close();
    }
  }

  onActivityCodeSelectionChanged(selectedRowKeys:any[], cellInfo:any, component:any){
    var __this=this;
    if (selectedRowKeys.length > 0) {
      for(var i=0;i<__this.procedureCode.concept.length;i++){
        if(__this.procedureCode.concept[i].code==selectedRowKeys[0]){
          var codeableConcept={
            text:__this.procedureCode.concept[i].display,
            coding:[{code:__this.procedureCode.concept[i].code,display:__this.procedureCode.concept[i].display}]
          }
          cellInfo.setValue(codeableConcept);
        }
      }
      component.close();
    }
  }
}
