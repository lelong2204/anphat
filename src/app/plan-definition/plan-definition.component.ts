import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FhirService } from '../services/fhir.service'
import { SharedService } from '../services/shared.service'
import { v4 as uuid } from 'uuid'

@Component({
  selector: 'app-plan-definition',
  templateUrl: './plan-definition.component.html',
  styleUrls: ['./plan-definition.component.less'],
})
export class PlanDefinitionComponent implements OnInit {
  popupVisible: boolean = false
  formData: any = {
    resourceType: 'PlanDefinition',
    date: new Date(),
    status:'draft',
    action: [],
  }

  requestPriority:any;
  actionType:any;

  actions:any[]=[];
  dataSource: any
  publicationStatus: any
  dropDownOptions:any;
  buttonOptions: any = {
    text: 'Tạo',
    type: 'success',
    useSubmitBehavior: true,
  }
  addGoalButtonOptions: any = {
    icon: 'add',
    text: 'Thêm  chỉ sổ',
    onClick: () => {
      if (this.formData.goal == null) this.formData.goal = []
      this.formData.goal.push({})
    },
  }

  addActionButtonOptions: any = {
    icon: 'add',
    text: 'Thêm hành động',
    onClick: () => {
      this.actions.push({})
    },
  }

  constructor(
    private fhirService: FhirService,
    private sharedService: SharedService,
    private router: Router,
  ) {
    this.sharedService.emitChange('Định nghĩa quy trình')
    this.dropDownOptions = { width: 500 };

  }

  ngOnInit(): void {
    var __this = this

    __this.getList();

    this.fhirService.read('CodeSystem', 'publication-status').subscribe({
      next(result) {
        __this.publicationStatus = result
      },
    })

    this.fhirService.read('CodeSystem', 'request-priority').subscribe({
      next(result) {
        __this.requestPriority = result
      },
    })

    this.fhirService.read('CodeSystem', 'action-type').subscribe({
      next(result) {
        __this.actionType = result
      },
    })

    
  }

  getList(){
    var __this=this;
    this.fhirService.get('PlanDefinition').subscribe({
      next(result) {
        __this.dataSource = result.entry
      },
    })
  }

  onToolbarPreparing(e: any) {
    let toolbarItems = e.toolbarOptions.items
    let _this = this

    toolbarItems.push({
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Thêm mới',
        onClick: function () {
          _this.popupVisible = !_this.popupVisible
        },
      },
      location: 'before',
    })
  }
  onFormSubmit(e: any) {
    var __this=this;
    this.fhirService.post(this.formData).subscribe({next(value) {
      __this.popupVisible=false;
      __this.formData={
        resourceType: 'PlanDefinition',
         date: new Date(),
      }
      __this.getList();
    },});
   
    e.preventDefault()
  }

  onPublicationStatusSelectionChanged(selectedRowKeys: any[]) {
    if (selectedRowKeys.length > 0) {
      this.formData.status = selectedRowKeys[0].code
    }
  }

  

  initNewActionRow(e: any) {
    e.data.elementId = uuid()
  }

  onActionRowInserting(e: any) {
    var __this = this
    if (e.data.parentId != 0 ) {
      for (var i = 0; i < this.actions.length; i++) {
        if (__this.actions[i].elementId == e.data.parentId) {
          if (__this.actions[i].action == null) {
            __this.actions[i].action = []
          }
          __this.actions[i].action.push(e.data)
        }
      }
    }
  }
}
