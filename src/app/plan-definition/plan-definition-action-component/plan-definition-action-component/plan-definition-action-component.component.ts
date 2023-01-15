import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FhirService } from 'src/app/services/fhir.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'plan-definition-action',
  templateUrl: './plan-definition-action-component.component.html',
  styleUrls: ['./plan-definition-action-component.component.less'],
})
export class PlanDefinitionActionComponentComponent implements AfterViewInit {
  @Input() actionId: string;
  @Input() goalIds: string[];
  requestPriority: any;
  activityDefinitionForm: any;
  procedureCode: any;
  bodySiteCode: any;
  selectedBodySites: string[] = [];
  participantType: any;
  participantRole: any;
  dropDownOptions: any;
  reasonCode: any;
  lifecycleStatusCode: any;
  goals: any[] = [];

  @Output() newGoalUpdateEvent = new EventEmitter<any>();

  constructor(private fhirService: FhirService) {}

  ngAfterViewInit(): void {
    var __this = this;

    __this.dropDownOptions = { width: 500 };

    if (this.goalIds == null) this.goalIds = [];
    else {
      this.getGoalList();
    }

    __this.fhirService.read('ActivityDefinition', __this.actionId).subscribe({
      next(value) {
        if (value.code == null)
          value.code = { coding: [{ code: '', display: '' }], text: '' };

        if (value.bodySite != null) __this.updateBodySite(value.bodySite);

        if (value.participant == null) value.participant = [];

        __this.activityDefinitionForm = value;
      },
    });

    this.fhirService.read('CodeSystem', 'request-priority').subscribe({
      next(result) {
        __this.requestPriority = result;
      },
    });

    __this.fhirService.read('CodeSystem', 'procedure-codes').subscribe({
      next(result) {
        __this.procedureCode = result;
      },
    });

    this.fhirService.read('CodeSystem', 'body-site').subscribe({
      next(result) {
        __this.bodySiteCode = result;
      },
    });

    this.fhirService.read('CodeSystem', 'action-participant-type').subscribe({
      next(result) {
        __this.participantType = result;
      },
    });

    this.fhirService.read('CodeSystem', 'action-participant-role').subscribe({
      next(result) {
        __this.participantRole = result;
      },
    });

    this.fhirService.read('CodeSystem', 'procedure-reason').subscribe({
      next(result) {
        __this.reasonCode = result;
      },
    });

    this.fhirService.read('CodeSystem', 'goal-status').subscribe({
      next(result) {
        __this.lifecycleStatusCode = result;
      },
    });
  }

  getGoalList() {
    var __this = this;

    this.goalIds.forEach((goalId) => {
      __this.fhirService.read('Goal', goalId).subscribe({
        next(value) {
          __this.goals.push(value);
        },
      });
    });
  }

  updateBodySite(bodySites: any[]) {
    var selectedBodySites: string[] = [];
    if (bodySites.length > 0) {
      bodySites.forEach((bodySite) => {
        selectedBodySites.push(bodySite.coding[0].code);
      });
    }
    this.selectedBodySites = selectedBodySites;
  }

  onPrioritySelectionChanged(selectedRowKeys: any[], component: any) {
    var __this = this;
    if (selectedRowKeys.length > 0) {
      this.activityDefinitionForm.priority = selectedRowKeys[0];

      this.updateActivityDefinitionResource();
    }
  }

  onProcedureCodeSelectionChanged(selectedRowKeys: any[]) {
    var __this = this;
    if (selectedRowKeys.length > 0) {
      var codeableConcept = {
        coding: [
          {
            code: selectedRowKeys[0].code,
            display: selectedRowKeys[0].display,
          },
        ],
        text: selectedRowKeys[0].display,
      };
      this.activityDefinitionForm.code = codeableConcept;
      this.updateActivityDefinitionResource();
    }
  }
  onBodySitesSelectionChanged(selectedRowKeys: any[]) {
    var bodySiteConcepts: any[] = this.bodySiteCode.concept;
    var selectedBodySites: any[] = [];
    if (selectedRowKeys.length > 0) {
      selectedRowKeys.forEach((code) => {
        selectedBodySites.push(
          bodySiteConcepts.filter((x) => x.code == code)[0]
        );
      });
    }
    var codeableConcepts: any[] = [];
    if (selectedBodySites.length > 0) {
      selectedBodySites.forEach((bodySiteConcept) => {
        codeableConcepts.push({
          coding: [
            { code: bodySiteConcept.code, display: bodySiteConcept.display },
          ],
          text: bodySiteConcept.display,
        });
      });

      this.activityDefinitionForm.bodySite = codeableConcepts;
      this.updateActivityDefinitionResource();
    }
  }

  updateActivityDefinitionResource() {
    var __this = this;
    __this.fhirService.put(this.activityDefinitionForm).subscribe({
      next(value) {
        __this.activityDefinitionForm = value;
      },
    });
  }

  initNewParticipantRow(e: any) {
    e.data.id = uuid();
  }

  onParticipantRowInserting(e: any) {}

  onParticipantTypeSelectionChanged(
    selectedRowKeys: any[],
    cellInfo: any,
    component: any
  ) {
    cellInfo.setValue(selectedRowKeys[0]);
    if (selectedRowKeys.length > 0) {
      component.close();
    }
  }

  onParticipantRoleSelectionChanged(
    selectedRowKeys: any[],
    cellInfo: any,
    component: any
  ) {
    var __this = this;
    if (selectedRowKeys.length > 0) {
      for (var i = 0; i < __this.participantRole.concept.length; i++) {
        if (__this.participantRole.concept[i].code == selectedRowKeys[0]) {
          var codeableConcept = {
            text: __this.participantRole.concept[i].display,
            coding: [
              {
                code: __this.participantRole.concept[i].code,
                display: __this.participantRole.concept[i].display,
              },
            ],
          };
          cellInfo.setValue(codeableConcept);
        }
      }
      component.close();
    }
  }

  onGoalDescriptionSelectionChanged(
    selectedRowKeys: any[],
    cellInfo: any,
    component: any
  ) {
    var __this = this;
    if (selectedRowKeys.length > 0) {
      for (var i = 0; i < __this.reasonCode.concept.length; i++) {
        if (__this.reasonCode.concept[i].code == selectedRowKeys[0]) {
          var codeableConcept = {
            text: __this.reasonCode.concept[i].display,
            coding: [
              {
                code: __this.reasonCode.concept[i].code,
                display: __this.reasonCode.concept[i].display,
              },
            ],
          };
          cellInfo.setValue(codeableConcept);
        }
      }
      component.close();
    }
  }

  onParticipantRowInserted(e: any) {
    var __this = this;
    __this.fhirService.put(this.activityDefinitionForm).subscribe({
      next(value) {
        __this.activityDefinitionForm = value;
      },
    });
  }

  initNewGoalRow(e: any) {
    e.data.lifecycleStatus = 'proposed';
    e.data.resourceType = 'Goal';
    e.data.priority = {
      coding: [{ code: 'medium-priority', display: 'Ưu tiên trung bình' }],
      text: 'Ưu tiên trung bình',
    };
  }

  updateNewTarget(e: any) {
    var __this = this;

    var goal = this.goals.filter((x) => x.id == e.goalId)[0];
    if (goal.target == null) goal.target = [];
    goal.target.push(e.target);

    this.fhirService.put(goal).subscribe({next(value) {
      
    },})
  }

  onGoalRowInserted(e: any) {
    var __this = this;

    var goalResource = e.data;

    __this.fhirService.post(goalResource).subscribe({
      next(value) {
        if (__this.goalIds == null) {
          __this.goalIds = [];
        }
        __this.goalIds.push(value.id);

        __this.newGoalUpdateEvent.emit({
          goalId: value.id,
          actionId: __this.actionId,
        });
      },
    });
  }

  updateOutcome(e:any){
    console.log(e);
    var goal = this.goals.filter((x) => x.id == e.goalId)[0];
    goal.outcomeCode=e.data;
    console.log(goal);
    this.fhirService.put(goal).subscribe({next(value) {
      
    },})
  }
}
