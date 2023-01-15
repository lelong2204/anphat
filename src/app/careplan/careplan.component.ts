import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FhirService } from '../services/fhir.service'
import { SharedService } from '../services/shared.service'
import { CarePlanInputDto } from '../_models/dto/careplanInputDto'
import { ActivityDetailElement } from '../_models/elements/activityElement'
import { ConceptElement } from '../_models/elements/conceptElement'
import { ReferenceElement } from '../_models/elements/referenceElement'
import { CarePlan } from '../_models/resources/careplan'
import {Title} from "@angular/platform-browser";
import { v4 as uuid } from 'uuid'

@Component({
  selector: 'app-careplan',
  templateUrl: './careplan.component.html',
  styleUrls: ['./careplan.component.less'],
})
export class CareplanComponent implements OnInit {
  dataSource: any
  popupVisible = false
  activityKind: any = {}
  procedureCode: any = {}
  procedureReason: any = {}
  gridBoxValue: string[] = [''];
  dropDownOptions: object
  buttonOptions: any = {
    text: 'Lưu',
    type: 'success',
    useSubmitBehavior: true,
  }
  addContactBtnOption: any = {
    icon: 'plus',
    onClick: () => {},
  }
  carePlan:any = {
    resourceType:'CarePlan'
  };
  carePlanCategory:any={

  }
  formData:any={
    resourceType:'CarePlan',
    created:new Date(),
    status:'draft',
    activity:[],
    intent:'proposal'
  };
  goals:any[]=[];
  activityOptions:any[]=[];
  addActivityButtonOptions:any;
  deleteActivityButtonOptions:any[]=[];
  selectedCategories:string[]=[];
  activities:any[]=[
  ];
  constructor(
    private router: Router,
    private fhirService: FhirService,
    private sharedService: SharedService,
    private titleService:Title
  ) {
    var __this = this
    __this.titleService.setTitle("Quy trình khám chữa bệnh - An Phat Smart Medical");

    this.sharedService.emitChange('Care plan')
    this.dropDownOptions = { width: 500 }
    this.fhirService.get('CarePlan').subscribe({
      next(result) {
        __this.dataSource = result.entry
      },
    })

    this.addActivityButtonOptions = {
      icon: 'add',
      text: 'Thêm hành động',
      onClick: () => {
        let newactivity={
          detail:{
            id:uuid(),
            kind:'',
            code:{
              coding:[{code:'',display:''}],
              text:''
            }
          }
        }
       this.formData.activity.push(newactivity);
       this.activities.push({selectedReasonCodes:[]})

       this.deleteActivityButtonOptions.push({
        icon: 'add',
        text: 'Xoá',
        onClick: () => {
          this.removeActivity(this.deleteActivityButtonOptions.length-1)
        }
       })

      this.activityOptions = this.getConceptsOptions(this.formData.activity)
      },
    }
  }
  
  getConceptsOptions(activity: any) {
    const options = []
    for (let i = 0; i < activity.length; i++) {
      options.push(this.generateNewActivityOptions(i))
    }
    return options
  }
  generateNewActivityOptions(index: number) {
    return {
      // buttons: [
      //   {
      //     name: 'trash',
      //     location: 'after',
      //     options: {
      //       stylingMode: 'text',
      //       icon: 'trash',
      //       onClick: () => {
      //         this.formData.activity.splice(index, 1)
      //         this.activityOptions = this.getConceptsOptions(
      //           this.formData.activity,
      //         )
      //       },
      //     },
      //   },
      // ],
    }
  }
  ngOnInit(): void {
    let _this = this

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

    this.fhirService.read('CodeSystem', 'care-plan-category').subscribe({
      next(result) {
        _this.carePlanCategory = result
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
      __this.router.navigate(['/carePlan/detail/'+value.id])
    },})
    e.preventDefault();
  }
  onReasonCodeSelectionChanged(
    selectedRowKeys:any[],
    i:number
  ){
    var reasonConcepts:any[]=this.procedureReason.concept;
    var selectedReasons:any[]=[];
    if(selectedRowKeys.length>0){
      selectedRowKeys.forEach(code => {
        selectedReasons.push(reasonConcepts.filter(x=>x.code==code)[0]);
      });
    }
    var codeableConcepts:any[]=[];
    if(selectedReasons.length>0){
      selectedReasons.forEach(reasonConcept => {
        codeableConcepts.push({
          coding:[{code:reasonConcept.code,display:reasonConcept.display}],
          text:reasonConcept.display
        })
      });

      this.formData.activity[i].detail.reasonCode=codeableConcepts;
    }

  }
  onActivityKindSelectionChanged(
    selectedRowKeys: any,
    cellInfo: any,
    i:number
  ) {
    if (selectedRowKeys.length > 0) {
      this.formData.activity[i].detail.kind=selectedRowKeys[0].code;

      // cellInfo.setValue(selectedRowKeys[0].code)
      // dropDownBoxComponent.close()
    }
  }

  onActivityCodeSelectionChanged(
    selectedRowKeys: any,
    cellInfo: any,
    i:number
  ) {
    if (selectedRowKeys.length > 0) {
      var codeableConcept={
        coding:[
          {code:selectedRowKeys[0].code,display:selectedRowKeys[0].display}
        ],
        text:selectedRowKeys[0].display
      }
      this.formData.activity[i].detail.code=codeableConcept;
    }
  }

  onActivityReasonCodeSelectionChanged(selectedRowKeys: any,
    cellInfo: any,
    dropDownBoxComponent: any,
  ) {
    if (selectedRowKeys.length > 0) {
      for(var i=0;i<selectedRowKeys.length;i++){
        cellInfo.setValue(selectedRowKeys[i].code);
      }
      dropDownBoxComponent.close()
    }
  }

  onGridBoxActivityKindOptionChanged(e:any) {
    if (e.name === 'value') {
      
    }
  }

  removeActivity(i:number):void{
    // this.activities.splice(i,1);
    // this.formData.activity.splice(i,1);
    // this.deleteActivityButtonOptions.splice(i,1);
  }
  onCategorySelectionChanged(
    selectedRowKeys: any[]
  ){
    var cateConcepts:any[]=this.carePlanCategory.concept;
    var selectedCates:any[]=[];
    if(selectedRowKeys.length>0){
      selectedRowKeys.forEach(code => {
        selectedCates.push(cateConcepts.filter(x=>x.code==code)[0]);
      });
    }
    var codeableConcepts:any[]=[];
    if(selectedCates.length>0){
      selectedCates.forEach(cateConcept => {
        codeableConcepts.push({
          coding:[{code:cateConcept.code,display:cateConcept.display}],
          text:cateConcept.display
        })
      });

      this.formData.category=codeableConcepts;
    }
  }
}
