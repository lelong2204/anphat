import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'patient-setting',
  templateUrl: './patient-setting.component.html',
  styleUrls: ['./patient-setting.component.less']
})
export class PatientSettingComponent implements AfterViewInit {

  @Input() popupVisible:boolean=false;

  @Output() settingHiddenEvent =new EventEmitter<any>();
  menuList:any[]=[
    {code:'administrative-gender',display:'Giới tính'},
    {code:'marital-status',display:'Trạng thái kết hôn'},
  ];
  currentMenu:any={}
  constructor() { }

  ngAfterViewInit() {

  }

  popup_hidden(e:any){
    this.popupVisible=false;
    this.settingHiddenEvent.emit(this.popupVisible);
  }

  menuListSelectionChanged(e:any){

  }

}
