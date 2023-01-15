import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import notify from 'devextreme/ui/notify'
import { FhirService } from 'src/app/services/fhir.service'
import { SearchParams } from 'src/app/_models/searchParams'
import { v4 as uuid } from 'uuid'

@Component({
  selector: 'app-activity-definition-detail',
  templateUrl: './activity-definition-detail.component.html',
  styleUrls: ['./activity-definition-detail.component.less'],
})
export class ActivityDefinitionDetailComponent implements OnInit {
  activityDefinition: any
  planDefinitionDataSource: any
  bodySiteCode: any
  procedureCode: any
  selectedProcedureCodes: string
  selectedBodySites: string[] = []
  actionOptions: any[] = []
  addActionButtonOptions: any
  planDefinition: any = { action: [] }
  publicationStatus: any
  participantType: any
  participantRole: any

  editButtonOptions: any
  activeButtonOptions: any
  retireButtonOptions:any
  selectBoxOptions: any

  addButtonOptions: any

  saveButtonOptions: any

  printButtonOptions: any

  settingsButtonOptions: any
participants:any[]=[]
  popupPlanDefinitionVisible: boolean = false

  popupSetting:boolean=false;
  dropDownOptions:any

  constructor(
    private activatedRoute: ActivatedRoute,
    private fhirService: FhirService,
  ) {
    var __this = this
    this.activatedRoute.params.subscribe((params: Params) => {
      var id: string = params['id']

      fhirService.read('ActivityDefinition', id).subscribe({
        next(value) {
          __this.activityDefinition = value
          if (value.participant.length > 0) {
            for (var i = 0; i < value.participant.length; i++) {
              var participant = value.participant[i]
              __this.participants.push(participant)
            }
          }
          // if(__this.activityDefinition.participant==null)
          // __this.activityDefinition.participant=[]
          if (value.bodySite != null) __this.updateBodySite(value.bodySite)
          __this.getPlanDefinition()
          __this.actionOptions = __this.getActionOptions(
            __this.planDefinition.action,
          )
        },
      })
    })

    __this.dropDownOptions = { width: 500 };

    __this.addActionButtonOptions = {
      icon: 'add',
      text: 'Thêm hành động',
      onClick: () => {
        this.planDefinition.action.push({ title: '' })
        this.actionOptions = this.getActionOptions(this.planDefinition.action)
      },
    }

    this.editButtonOptions = {
      icon: 'edit',
      onClick: () => {
        notify('Refresh button has been clicked!')
      },
    }

    this.activeButtonOptions = {
      icon: 'todo',
      onClick: () => {
        this.activityDefinition.status = 'active'
        console.log(this.activityDefinition)

        this.fhirService.put(this.activityDefinition).subscribe({
          next(value) {
            notify('Hoạt động đã được kích hoạt!')
          },
        })
      },
    }

    this.retireButtonOptions = {
      icon: 'remove',
      text: 'Loại bỏ',
      onClick: () => {
        this.activityDefinition.status = 'retired'
        console.log(this.activityDefinition)

        this.fhirService.put(this.activityDefinition).subscribe({
          next(value) {
            notify({
              type:'error',
              message: 'Hoạt động đã được loại bỏ!'})
          },
        })
      },
    }


    this.settingsButtonOptions = {
      text: 'Settings',
      onClick: () => {
        this.popupSetting=true;
      },
    }
  }

  loadSettings(){
    var __this = this
    this.fhirService.read('CodeSystem', 'action-participant-type').subscribe({
      next(result) {
        __this.participantType = result
      },
    })

    this.fhirService.read('CodeSystem', 'action-participant-role').subscribe({
      next(result) {
        __this.participantRole = result
      },
    })

  }

  getActionOptions(actions: any[]) {
    var options: any[] = []
    for (let i = 0; i < actions.length; i++) {
      options.push(this.generateNewActionOptions(i))
    }
    return options
  }
  generateNewActionOptions(index: number) {
    return {}
  }

  ngOnInit(): void {
    var __this = this
    __this.fhirService.read('CodeSystem', 'procedure-codes').subscribe({
      next(result) {
        __this.procedureCode = result
      },
    })

    __this.fhirService.read('CodeSystem', 'body-site').subscribe({
      next(result) {
        __this.bodySiteCode = result
      },
    })

    __this.fhirService.read('CodeSystem', 'publication-status').subscribe({
      next(result) {
        __this.publicationStatus = result
      },
    })

    __this.loadSettings();
  }

  onPlanDefinitionToolbarPreparing(e: any) {
    let toolbarItems = e.toolbarOptions.items
    let _this = this

    toolbarItems.push({
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Thêm mới',
        onClick: function () {
          _this.popupPlanDefinitionVisible = true
        },
      },
      location: 'before',
    })
  }

  onPlanDefRowInserting(e: any) {
    console.log(e.data)
    this.fhirService.post(e.data.resource).subscribe({
      next(value) {
        console.log(value)
      },
    })
  }
  onInitPlanDefNewRow(e: any) {
    e.data.resource = {
      resourceType: 'PlanDefinition',
      publisher: 'An Phat Smart Medical',
      date: new Date(),
      type: {
        coding: [{ display: 'Nhóm yêu cầu', code: 'order-set' }],
        text: 'Nhóm yêu cầu',
      },
    }
  }

  updateBodySite(bodySites: any[]) {
    var selectedBodySites: string[] = []
    if (bodySites.length > 0) {
      bodySites.forEach((bodySite) => {
        selectedBodySites.push(bodySite.coding[0].code)
      })
    }
    this.selectedBodySites = selectedBodySites
  }

  getPlanDefinition(): void {
    var __this = this
    var searchParams: SearchParams[] = [
      { key: 'definition', value: this.activityDefinition.id },
    ]
    this.fhirService.get('PlanDefinition', searchParams).subscribe({
      next(result) {
        __this.planDefinitionDataSource = result.entry
      },
    })
  }

  onParticipantTypeSelectionChanged(selectedRowKeys:any[], cellInfo:any, component:any){
    cellInfo.setValue(selectedRowKeys[0]);
    if (selectedRowKeys.length > 0) {
      component.close();
    }
  }
  onParticipantRoleSelectionChanged(selectedRowKeys:any[], cellInfo:any, component:any){
  var __this=this;
  if (selectedRowKeys.length > 0) {
    for(var i=0;i<__this.participantRole.concept.length;i++){
      if(__this.participantRole.concept[i].code==selectedRowKeys[0]){
        var codeableConcept={
          text:__this.participantRole.concept[i].display,
          coding:[{code:__this.participantRole.concept[i].code,display:__this.participantRole.concept[i].display}]
        }
        cellInfo.setValue(codeableConcept);
      }
    }
    component.close();
  }
}

onBositeSelectionChanged(selectedRowKeys:any[], component:any){

  var __this=this;
    this.selectedBodySites=selectedRowKeys;
    var bodySiteConcepts:any[]=this.bodySiteCode.concept;
    var selectedBodySites:any[]=[];
    if(selectedRowKeys.length>0){
      selectedRowKeys.forEach(code => {
        selectedBodySites.push(bodySiteConcepts.filter(x=>x.code==code)[0]);
      });
      var codeableConcepts:any[]=[];
    if(selectedBodySites.length>0){
      selectedBodySites.forEach(bodyConcept => {
        codeableConcepts.push({
          coding:[{code:bodyConcept.code,display:bodyConcept.display}],
          text:bodyConcept.display
        })
      });

      this.activityDefinition.bodySite=codeableConcepts;

__this.fhirService.put(__this.activityDefinition).subscribe({next(value) {
  __this.activityDefinition=value;
},})
    }
    
  }
}

  initNewParticipantRow(e:any){
    e.data.id=uuid();
  }

  onParticipantRowInserting(e:any){
    var __this=this;
    var participant={
      id:e.data.id,
      type:e.data.type,
      role:e.data.role
    }
    if(this.activityDefinition.participant==null)
    this.activityDefinition.participant=[];
    this.activityDefinition.participant.push(participant);

    this.fhirService.put(this.activityDefinition).subscribe({next(value) {
    __this.activityDefinition=value
    },})
  }

  settingUpdated(e:any){
    var __this=this;
    __this.popupSetting=!__this.popupSetting;
  }

  popupHide(e:any){
    var __this=this;
    __this.popupSetting=false;

  }
}
