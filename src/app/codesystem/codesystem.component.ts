import { Component, OnInit } from '@angular/core'
import { FhirService } from '../services/fhir.service'
import { SharedService } from '../services/shared.service'
import { ConceptElement } from '../_models/elements/conceptElement'
import { v4 as uuid } from 'uuid'
import notify from 'devextreme/ui/notify'

@Component({
  selector: 'app-codesystem',
  templateUrl: './codesystem.component.html',
  styleUrls: ['./codesystem.component.less'],
})
export class CodesystemComponent implements OnInit {
  dataSource: any
  popupVisible: boolean = false
  formData: any = {
    resourceType: 'CodeSystem',
    publisher: 'An Phat Smart Medical',
    hierarchyMeaning:'is-a',  
    caseSensitive: true,
    experimental: false,
    date: new Date(),
  }
  concepts: ConceptElement[] = []
  conceptTreeList: any[] = []
  buttonOptions: any = {
    text: 'Lưu',
    type: 'success',
    useSubmitBehavior: true,
  }
  publicationStatus:any;
  constructor(
    private fhirService: FhirService,
    private sharedService: SharedService,
  ) {
    var __this = this
    this.sharedService.emitChange('CodeSystem')
    this.getList();
  }

  getList(){
    var __this=this;
    this.fhirService.get('CodeSystem').subscribe({
      next(result) {
        __this.dataSource = result.entry
      },
    })
  }

  ngOnInit(): void {
    var __this=this;
    this.fhirService.read('CodeSystem', 'publication-status').subscribe({
      next(result) {
        __this.publicationStatus = result
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

  onPublicationStatusSelectionChanged(
    selectedRowKeys:any[]
  ){
    if(selectedRowKeys.length>0){
      this.formData.status=selectedRowKeys[0].code
    }
  }

  onFormSubmit(e: any) {
    var __this=this;
    var concepts=this.getConceptList(this.conceptTreeList.filter(x=>x.parentId==0));
    this.formData.concept=concepts;
    this.fhirService.post(this.formData).subscribe({next(value) {
      notify(
        {
          message: 'Thêm mới thành công',
          position: {
            my: 'center top',
            at: 'center top',
          },
        },
        'success',
        3000,
      );
      __this.formData={
        resourceType: 'CodeSystem',
        publisher: 'An Phat Smart Medical',
        hierarchyMeaning:'is-a',  
        caseSensitive: true,
        experimental: false,
        date: new Date(),
      };
      __this.conceptTreeList=[];
      __this.popupVisible=false;
      __this.getList();

    },})
    e.preventDefault()
  }

  initNewConceptRow(e: any) {
    e.data.elementId = uuid()
  }
  onConceptRowInserting(e: any) {
    var __this=this;

    if (e.data.parentId != 0 ) {
      for (var i = 0; i < this.conceptTreeList.length; i++) {
        if (__this.conceptTreeList[i].elementId == e.data.parentId) {
          if (__this.conceptTreeList[i].concept == null) {
            __this.conceptTreeList[i].concept = []
          }
          __this.conceptTreeList[i].concept.push(e.data)
        }
      }
    }
  }
  getConceptList(conceptTreeList:any[]):ConceptElement[]{
    let concepts:ConceptElement[]=[];
    console.log(conceptTreeList);

    conceptTreeList.forEach(concept => {
        var newConcept :ConceptElement=new ConceptElement(concept.code, concept.display,concept.definition);
        if(concept.concept!=null){
          newConcept.concept=this.getConceptList(concept.concept);
        }
        concepts.push(newConcept);
    });
    return concepts;
  }
}
