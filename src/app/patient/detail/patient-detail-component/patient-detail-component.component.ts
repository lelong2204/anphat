import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FhirService } from 'src/app/services/fhir.service';
import { Patient } from 'src/app/_models/resources/patient';
import { formatDate } from '@angular/common';
import { SharedService } from 'src/app/services/shared.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-patient-detail-component',
  templateUrl: './patient-detail-component.component.html',
  styleUrls: ['./patient-detail-component.component.less'],
})
export class PatientDetailComponentComponent implements OnInit {
  patient: Patient;
  dropDownOptions: any;
  nameEditorOptions: any;
  administrativeGender: any;
  currentIntroduction:any={};
  selectedIndex: number;
  tabs:any[]=[
    {name:'overview',title:'Tổng quan',canClose:false},
    {name:'introduction',title:'Giới thiệu',canClose:false},
    {name:'clinical',title:'Cận lâm sàng',canClose:true}
  ]

  introductionList:any[]=[
    {code:'identifier',display:'Định danh'},
    // {code:'name',display:'Tên'},
    {code:'address',display:'Địa chỉ'},
    {code:'telecom',display:'Liên hệ'},
    {code:'contact',display:'Liên hệ người thân'}
  ]
  constructor(
    private activatedRoute: ActivatedRoute,
    private fhirService: FhirService,
    private sharedService: SharedService,
    private titleService: Title,
    @Inject(LOCALE_ID) private locale: string
  ) {
    var __this = this;
    __this.selectedIndex = 0;
    __this.sharedService.emitChange('Thông tin bệnh nhân');
    __this.titleService.setTitle('Thông tin bệnh nhân - An Phat Smart Medical');
    __this.dropDownOptions = { width: 500 };

    __this.nameEditorOptions = {
      disabled: true,
    };

    this.activatedRoute.params.subscribe((params: Params) => {
      var id: string = params['id'];
      fhirService.read('Patient', id).subscribe({
        next(value: any) {
          __this.patient = value;
        },
      });

      this.fhirService.read('CodeSystem', 'administrative-gender').subscribe({
        next(value) {
          __this.administrativeGender = value;
        },
      });
    });
  }

  displayName(): string {
    if (this.patient.name.length > 0) {
      var name = this.patient.name.filter((x) => x.use == 'official')[0];
      if (name != null)
        return `${name.family} ${name.given[0]} ${name.given[1]}`;
    }
    return '';
  }
  dateDisplayFormat(birthDate: Date): string {
    var dateString = formatDate(birthDate, 'yyyy-MM-dd', this.locale);
    return dateString;
  }

  displayGender(): string {
    var __this = this;
    if (this.patient.gender != null && this.patient.gender != '') {
      for (var i = 0; i < __this.administrativeGender.concept.length; i++) {
        if (
          __this.administrativeGender.concept[i].code == __this.patient.gender
        ) {
          return __this.administrativeGender.concept[i].display;
        }
      }
    }
    return '';
  }

  
  calculateAge(birthDate: Date): number {
    if (birthDate) {
      var today = new Date();
      var birthYear: number = +formatDate(birthDate, 'yyyy', this.locale);
      var age = today.getFullYear() - birthYear;
      return age;
    }
    return 0;
  }

  ngOnInit(): void {
    var __this = this;
  }

  introductionListSelectionChanged(e:any){
    this.currentIntroduction=e.addedItems[0];
  }
  closeButtonHandler(tab:any){
    const index = this.tabs.indexOf(tab);

    this.tabs.splice(index, 1);
    if (index >= this.tabs.length && index > 0) this.selectedIndex = index - 1;
  }
}
