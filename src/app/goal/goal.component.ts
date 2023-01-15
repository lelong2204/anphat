import { Component, OnInit } from '@angular/core'
import { FhirService } from '../services/fhir.service'
import { SharedService } from '../services/shared.service'

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.less'],
})
export class GoalComponent implements OnInit {
  dataSource: any
  popupVisible: boolean = false
  buttonOptions: any = {
    text: 'Tạo mới',
    type: 'success',
    useSubmitBehavior: true,
  }
  selectedOutcomes:string[]=[]
  formData: any = {
    resourceType: 'Goal',
    lifecycleStatus: {
      coding: [{ code: '', display: '' }],
      text: '',
    },
    priority: {
      coding: [{ code: '', display: '' }],
      text: '',
    },
    description: {
      coding: [{ code: '', display: '' }],
      text: '',
    },
  }
  targetOptions: any[] = []
  lifecycleStatusCode: any = {}
  reasonCode: any = {}
  observationCodes:any={}
  goalPriority: any = {}
  addTargetButtonOptions: any
  constructor(
    private fhirService: FhirService,
    private sharedService: SharedService,
  ) {
    this.sharedService.emitChange('Goal')

    this.addTargetButtonOptions = {
      icon: 'add',
      text: 'Thêm chỉ số',
      onClick: () => {
        if (this.formData.target == null) this.formData.target = []
        var target={
          measure:{
            coding:[{code:'',display:''}],
            text:''
          }
        }
        this.formData.target.push(target)
        this.targetOptions = this.getTargetsOptions(this.formData.target)
      },
    }
  }
  getTargetsOptions(target: any) {
    const options = []
    for (let i = 0; i < target.length; i++) {
      options.push(this.generateNewTargetOptions(i))
    }
    return options
  }
  generateNewTargetOptions(index: number) {
    return {}
  }
  ngOnInit(): void {
    var __this = this

    this.fhirService.get('Goal').subscribe({
      next(result) {
        __this.dataSource = result.entry
      },
    })

    this.fhirService.read('CodeSystem', 'goal-status').subscribe({
      next(result) {
        __this.lifecycleStatusCode = result
      },
    })

    this.fhirService.read('CodeSystem', 'procedure-reason').subscribe({
      next(result) {
        __this.reasonCode = result
      },
    })

    this.fhirService.read('CodeSystem', 'goal-priority').subscribe({
      next(result) {
        __this.goalPriority = result
      },
    })

    this.fhirService.read('CodeSystem', 'observation-codes').subscribe({
      next(result) {
        __this.observationCodes = result
      },
    })
  }
  onLifecycleStatusSelectionChanged(selectedRowKeys: any[], event: any) {
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
      this.formData.lifecycleStatus = codeableConcept
    }
  }

  onOutComeSelectionChanged(selectedRowKeys: any[], event: any) {
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
      this.formData.description = codeableConcept
    }
  }

  onReasonCodeSelectionChanged(selectedRowKeys: any[], event: any) {
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
      this.formData.description = codeableConcept
    }
  }

  onGoalPrioritySelectionChanged(selectedRowKeys: any[], event: any) {
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
      this.formData.priority = codeableConcept
    }
  }

  onTargetMeasureSelectionChanged(selectedRowKeys: any[],i:number){
    var codeableConcept={
      text:selectedRowKeys[0].display,
      coding:[{code:selectedRowKeys[0].code,display:selectedRowKeys[0].display}]
    }
    this.formData.target[i].measure=codeableConcept;
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
    console.log(this.formData)
    e.preventDefault()
  }
}
