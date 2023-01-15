import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FhirService } from 'src/app/services/fhir.service';
import { PlanDefinition } from 'src/app/_models/resources/planDefinition';

@Component({
  selector: 'app-plan-definition-detail-component',
  templateUrl: './plan-definition-detail-component.component.html',
  styleUrls: ['./plan-definition-detail-component.component.less'],
})
export class PlanDefinitionDetailComponentComponent implements OnInit {
  planDefinition: PlanDefinition;
  nameEditorOptions: any;
  popupGoalVisible: boolean = false;
  popupActionVisible: boolean = false;
  goalCategory: any;
  procedureReason: any;
  requestPriority: any;
  dropDownOptions: any;

  tabs: any[] = [
    { title: 'Chỉ số', name: 'goal' },
    { title: 'Hành động', name: 'action' },
  ];
  goalData: any;
  actionData: any;
  actions: any[] = [];
  activitiDefinitionDataSource: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private fhirService: FhirService
  ) {
    var __this = this;
    __this.dropDownOptions = { width: 500 };

    __this.nameEditorOptions = {
      disabled: true,
    };

    this.activatedRoute.params.subscribe((params: Params) => {
      var id: string = params['id'];
      fhirService.read('PlanDefinition', id).subscribe({
        next(value: PlanDefinition) {
          __this.planDefinition = value;
          if (__this.planDefinition.goal == null)
            __this.planDefinition.goal = [];
          if (__this.planDefinition.action == null)
            __this.planDefinition.action = [];
        },
      });
    });
  }

  ngOnInit(): void {
    var __this = this;
    this.fhirService.read('CodeSystem', 'goal-category').subscribe({
      next(result) {
        __this.goalCategory = result;
      },
    });

    this.fhirService.read('CodeSystem', 'procedure-reason').subscribe({
      next(result) {
        __this.procedureReason = result;
      },
    });

    this.fhirService.read('CodeSystem', 'request-priority').subscribe({
      next(result) {
        __this.requestPriority = result;
      },
    });
  }
  onFormGoalSubmit(e: any) {}
  testGoal() {
    this.popupGoalVisible = !this.popupGoalVisible;
  }

  onGoalCateSelectionChanged(
    selectedRowKeys: any[],
    cellInfo: any,
    component: any
  ) {
    var __this = this;
    if (selectedRowKeys.length > 0) {
      for (var i = 0; i < __this.goalCategory.concept.length; i++) {
        if (__this.goalCategory.concept[i].code == selectedRowKeys[0]) {
          var codeableConcept = {
            text: __this.goalCategory.concept[i].display,
            coding: [
              {
                code: __this.goalCategory.concept[i].code,
                display: __this.goalCategory.concept[i].display,
              },
            ],
          };
          cellInfo.setValue(codeableConcept);
        }
      }
      component.close();
    }
  }

  onProcedureReasonSelectionChanged(
    selectedRowKeys: any[],
    cellInfo: any,
    component: any
  ) {
    var __this = this;
    if (selectedRowKeys.length > 0) {
      for (var i = 0; i < __this.procedureReason.concept.length; i++) {
        if (__this.procedureReason.concept[i].code == selectedRowKeys[0]) {
          var codeableConcept = {
            text: __this.procedureReason.concept[i].display,
            coding: [
              {
                code: __this.procedureReason.concept[i].code,
                display: __this.procedureReason.concept[i].display,
              },
            ],
          };
          cellInfo.setValue(codeableConcept);
        }
      }
      component.close();
    }
    console.log(__this.planDefinition);
  }
  onFormActionSubmit(e: any) {}
  testAction() {
    this.popupActionVisible = !this.popupActionVisible;
  }

  onActivityDefToolbarPreparing(e: any) {
    let toolbarItems = e.toolbarOptions.items;
    let _this = this;

    toolbarItems.push({
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Thêm mới',
        onClick: function () {
          _this.popupActionVisible = !_this.popupActionVisible;
        },
      },
      location: 'before',
    });
  }

  onPrioritySelectionChanged(
    selectedRowKeys: any[],
    cellInfo: any,
    component: any
  ) {
    cellInfo.setValue(selectedRowKeys[0]);
    if (selectedRowKeys.length > 0) {
      component.close();
    }
  }
  initNewActionRow(e: any) {}

  onActionRowInserting(e: any) {
    var __this = this;
    // __this.fhirService.put(this.planDefinition).subscribe({next(value) {
    //   __this.planDefinition=value;
    // },})
  }

  onActionRowInserted(e: any) {
    var __this = this;
    var activityDefinition = {
      resourceType: 'ActivityDefinition',
      id: e.data.id,
      date: new Date(),
      status: 'draft',
      title: e.data.title,
      name: e.data.title,
      experimental: false,
      kind: 'ServiceRequest',
      intent: 'order',
      priority: e.data.priority,
    };
    __this.fhirService.post(activityDefinition).subscribe({
      next(value) {
        __this.planDefinition.action.filter(
          (x) => x.id == value.id
        )[0].definitionUri = `ActivityDefinition/${activityDefinition.id}`;

 __this.planDefinition.action.filter(
          (x) => x.id == value.id
        )[0].goalId=[];
        __this.fhirService.put(__this.planDefinition).subscribe({
          next(value) {
            __this.planDefinition = value;
          },
        });
      },
    });
  }

  updateNewGoalAction(e: any) {
    var __this = this;

    // if (__this.planDefinition.action.filter((x) => x.id == e.actionId)[0]
    //     .goalId == null)
    //   __this.planDefinition.action.filter((x) => x.id == e.actionId)[0].goalId =[];
      // var indexOfGoal:number=__this.planDefinition.action.filter(x=>x.id==e.actionId)[0].goalId.indexOf(e.goalId);
      console.log(__this.planDefinition.action.filter(x=>x.id==e.actionId)[0]);
      // if(indexOfGoal==-1){
      //   __this.planDefinition.action.filter((x) => x.id == e.actionId)[0].goalId.push(e.goalId);
        __this.fhirService.put(__this.planDefinition).subscribe({
          next(value) {
            __this.planDefinition = value;
          },
        });
      // }
  }
}
