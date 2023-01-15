import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FhirService } from '../services/fhir.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-activity-definition',
  templateUrl: './activity-definition.component.html',
  styleUrls: ['./activity-definition.component.less']
})
export class ActivityDefinitionComponent implements OnInit {
  dataSource: any
  popupVisible:boolean=false;
  formData: any = {
    resourceType: 'ActivityDefinition',
    date:new Date(),
    kind:"ServiceRequest",
    experimental:false,
    intent:'order',
    publisher:'An Phat Smart Medical',
    priority:'routine',
    participant:[],
    code:{
      coding:[{code:''}]
    },
    status:'draft'
  }
  requestResourceTypes:any;
  requestIntent:any;
  requestPriority:any;
  selectedBodySites:string[]=[];

  buttonOptions: any = {
    text: 'Lưu',
    type: 'success',
    useSubmitBehavior: true,
  };

  publicationStatus:any;
  procedureCode:any;
  bodySiteCode:any;
  dropDownOptions: object;

  constructor(private fhirService: FhirService,
    private sharedService: SharedService,
    private router: Router) { 

    this.sharedService.emitChange('Định nghĩa hoạt động')
    this.dropDownOptions = { width: 1000 };

  }

  ngOnInit(): void {
    var __this = this

    this.fhirService.get('ActivityDefinition').subscribe({
      next(result) {
        __this.dataSource = result.entry
      },
    })

    this.fhirService.read('CodeSystem', 'publication-status').subscribe({
      next(result) {
        __this.publicationStatus = result
      },
    })

    this.fhirService.read('CodeSystem', 'procedure-codes').subscribe({
      next(result) {
        __this.procedureCode = result
      },
    })

    this.fhirService.read('CodeSystem', 'body-site').subscribe({
      next(result) {
        __this.bodySiteCode = result
      },
    })

    this.fhirService.read('CodeSystem', 'request-resource-types').subscribe({
      next(result) {
        __this.requestResourceTypes = result
      },
    })

    this.fhirService.read('CodeSystem', 'request-intent').subscribe({
      next(result) {
        __this.requestIntent = result
      },
    })

    this.fhirService.read('CodeSystem', 'request-priority').subscribe({
      next(result) {
        __this.requestPriority = result
      },
    })
  }
  onPublicationStatusSelectionChanged(selectedRowKeys:any[]){
    if(selectedRowKeys.length>0){
      this.formData.status=selectedRowKeys[0].code
    }
  }

  onProcedureCodeSelectionChanged(selectedRowKeys:any[]){
    if(selectedRowKeys.length>0){
      var codeableConcept={
        coding:[{code:selectedRowKeys[0].code,display:selectedRowKeys[0].display}],
        text:selectedRowKeys[0].display
      }
      this.formData.code=codeableConcept;
    }
  }

  onBodySitesSelectionChanged(selectedRowKeys:any[]){
    var bodySiteConcepts:any[]=this.bodySiteCode.concept;
    var selectedBodySites:any[]=[];
    if(selectedRowKeys.length>0){
      selectedRowKeys.forEach(code => {
        selectedBodySites.push(bodySiteConcepts.filter(x=>x.code==code)[0]);
      });
    }
    var codeableConcepts:any[]=[];
    if(selectedBodySites.length>0){
      selectedBodySites.forEach(bodySiteConcept => {
        codeableConcepts.push({
          coding:[{code:bodySiteConcept.code,display:bodySiteConcept.display}],
          text:bodySiteConcept.display
        })
      });

      this.formData.bodySite=codeableConcepts;
    }
  }

  onRequestIntentSelectionChanged(
    selectedRowKeys:any[]
  ){
    if(selectedRowKeys.length>0){
      this.formData.intent=selectedRowKeys[0].code
    }
  }

  onKindSelectionChanged(
    selectedRowKeys:any[]
  ){
    if(selectedRowKeys.length>0){
      this.formData.kind=selectedRowKeys[0].code
    }
  }
  onPrioritySelectionChanged(
    selectedRowKeys:any[]
  ){
    if(selectedRowKeys.length>0){
      this.formData.priority=selectedRowKeys[0].code
    }
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
    this.fhirService.post(this.formData).subscribe({next(response) {
      __this.router.navigate(['/activityDefinition/detail/'+response.id])
    },})
    e.preventDefault()
  }

}
