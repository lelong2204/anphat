import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { FhirService } from 'src/app/services/fhir.service';

@Component({
  selector: 'activity-definition-setting',
  templateUrl: './activity-definition-setting-component.component.html',
  styleUrls: ['./activity-definition-setting-component.component.less']
})
export class ActivityDefinitionSettingComponentComponent implements AfterViewInit {
  popupVisible:boolean=false;

  @Input() showPopup:boolean;
  formData:any;
  namePattern: any = /^[^0-9]+$/
  conceptOptions: any[] = []
  addConceptButtonOptions: any

  buttonOptions: any = {
    text: 'Lưu',
    type: 'success',
    useSubmitBehavior: true,
  };
  settings:any[]
  @Output() settingUpdateEvent = new EventEmitter<any>()
  @Output() settingPopupHideEvent = new EventEmitter<any>()
  constructor(private fhirService:FhirService) { 
    this.settings = [
      {
        id: '1',
        text: 'Đối tượng tham gia',
        expanded: true,
        fhirId: 'action-participant-type',
        fullName: 'ActionParticipantType',
      },
      {
        id: '2',
        text: 'Vai trò tham gia',
        fhirId: 'action-participant-role',
        fullName: 'ActionParticipantRole',
      }
    ]

    var settingData = this.settings[0]
    this.GetFhirData(settingData)
    this.addConceptButtonOptions = {
      icon: 'add',
      text: 'Thêm lựa chọn',
      onClick: () => {
        if (this.formData.concept == null) {
          this.formData.concept = []
        }
        this.formData.concept.push({})
        this.conceptOptions = this.getConceptsOptions(this.formData.concept)
      },
    }
  }

  ngAfterViewInit() {
  }

  getConceptsOptions(concept: any) {
    const options = []
    for (let i = 0; i < concept.length; i++) {
      options.push(this.generateNewConceptOptions(i))
    }
    return options
  }
  generateNewConceptOptions(index: number) {
    return {
      buttons: [
        {
          name: 'trash',
          location: 'after',
          options: {
            stylingMode: 'text',
            icon: 'trash',
            onClick: () => {
              this.formData.concept.splice(index, 1)
              this.conceptOptions = this.getConceptsOptions(
                this.formData.concept,
              )
            },
          },
        },
      ],
    }
  }

  changeSelection(e:any){
    const settingData = e.itemData

    this.GetFhirData(settingData)
  }

  GetFhirData(settingData:any){
    var __this=this;
    if (settingData.fhirId != null) {
      this.fhirService.read('CodeSystem', settingData.fhirId).subscribe({
        next(value) {
          if (value != null) {
            __this.formData = value
            if (value.concept != null) {
              __this.conceptOptions = __this.getConceptsOptions(
                __this.formData.concept,
              )
            }
          } 
        },
        error(err) {
          __this.formData = {
            id: settingData.fhirId,
            url: `CodeSystem/${settingData.fhirId}`,
            resourceType: 'CodeSystem',
            name: settingData.fullName,
            title: settingData.text,
            description: settingData.text,
            status: 'active',
            caseSensitive: true,
            hierarchyMeaning: 'is-a',
            content: 'complete',
            concept: [],
          }
          __this.conceptOptions = __this.getConceptsOptions(
            __this.formData.concept,
          )
        },
      })
    }
  }

  onFormSubmit(e:any){
    var __this = this
    __this.fhirService.put(__this.formData).subscribe({
      next(value) {
        __this.settingUpdateEvent.emit(value)
        notify(
          {
            message: 'Cập nhật thành công',
            position: {
              my: 'center top',
              at: 'center top',
            },
          },
          'success',
          3000,
        )
      },
    })
    e.preventDefault()
  }

  popup_hidden(e:any){
    this.popupVisible=false;
    this.settingPopupHideEvent.emit(e);
  }

}
