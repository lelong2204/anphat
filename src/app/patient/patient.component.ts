import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FhirService } from '../services/fhir.service';
import { SharedService } from '../services/shared.service';
import {formatDate} from '@angular/common';
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.less'],
})
export class PatientComponent implements OnInit {
  dataSource: any;
  popupVisible: boolean = false;
  settingPopupVisible:boolean=false;
  dropDownOptions:any;
  administrativeGender:any;
  telecomSystem:any;
  telecomUse:any;
  formData:any={
    resourceType:'Patient',
    active:true,
    name:[
      {
        use:'official',
        family:'',
        given:[]
      }
    ],
    identifier:[{
      use:'official',
      type:{
        coding:[{code:'CCCD',display:'Căn cước công dân'}],
        text:'Căn cước công dân'
      },
      value:'',
      period:{
        start:new Date(),
        end:(new Date((new Date()).getFullYear()+3,1,1))
      },
      assigner:{
        display:''
      }
    },
    {
      use:'official',
      type:{
        coding:[{code:'CMND',display:'Chứng minh nhân dân'}],
        text:'Chứng minh nhân dân'
      },
      value:'',
      period:{
        start:new Date(),
        end:(new Date((new Date()).getFullYear()+3,1,1))
      },
      assigner:{
        display:''
      }
    }
  ],
  address:[{line:[]}],
  telecom:[]
  }
  buttonOptions:any={
    text: 'Tạo',
    type: 'success',
    useSubmitBehavior: true,
  }
  addContactBtnOption: any = {
		icon: 'plus',
		onClick: () => {
			this.formData.telecom.push({})
		}
	};

  addressUse:any;
  addressType:any;

  constructor(
    private fhirService: FhirService,
    private sharedService: SharedService,
    private titleService: Title,
    @Inject(LOCALE_ID) private locale: string
  ) {
    var __this = this;

    __this.dropDownOptions={
      witdh:1500
    }
    this.sharedService.emitChange('Bệnh nhân');
    __this.titleService.setTitle('Bệnh nhân - An Phat Smart Medical');

    this.fhirService.get('Patient').subscribe({
      next(result) {
        __this.dataSource = result.entry;
      },
    });
  }

  ngOnInit(): void {
var __this=this;
    this.fhirService.read("CodeSystem",'administrative-gender').subscribe({next(value) {
      __this.administrativeGender=value;
    },})

    this.fhirService.read("CodeSystem","contact-point-system")
    .subscribe((value) => {
      this.telecomSystem = value
    })

    this.fhirService.read("CodeSystem","contact-point-use")
			.subscribe((value: any) => {
				this.telecomUse = value
			})

      this.fhirService.read("CodeSystem","address-use")
			.subscribe((value: any) => {
				this.addressUse = value
			})
		this.fhirService.read("CodeSystem","address-type")
			.subscribe((value: any) => {
				this.addressType = value
			})
  }

  dateDisplayFormat(birthDate:Date):string{
    var dateString = formatDate(birthDate,'yyyy-MM-dd',this.locale);
    return dateString;
  }

  onToolbarPreparing(e: any) {
    let toolbarItems = e.toolbarOptions.items
    let _this = this

    toolbarItems.push(
      {
      widget: 'dxButton',
      options: {
        icon: 'plus',
        onClick: function () {
          _this.popupVisible = !_this.popupVisible
        },
      },
      location: 'before',
    },
    {
      widget: 'dxButton',
      locateInMenu:'always',
      options: {
        text:'Cài đặt',
        icon: 'preferences',
        onClick:()=>{
          _this.settingPopupVisible=!_this.settingPopupVisible;
        }
      }
    }
    )
  }

  onFormSubmit(e:any){
var __this=this;
this.fhirService.post(this.formData).subscribe({next(value) {
  __this.popupVisible=!__this.popupVisible;
},})
e.preventDefault()

  }
  onGenderSelectionChanged(selectedRowKeys:any[]){
    if (selectedRowKeys.length > 0) {
      this.formData.gender = selectedRowKeys[0].code
    }
  }
  onTelecomSystemSelectionChanged(selectedRowKeys:any[],index:number){
    if(selectedRowKeys.length>0){
      this.formData.telecom[index].system=selectedRowKeys[0];
    }
  }

  settingHidden(e:any){
    this.settingPopupVisible=e;
  }
}
