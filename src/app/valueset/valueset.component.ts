import { Component, OnInit } from '@angular/core';
import { FhirService } from '../services/fhir.service';

@Component({
  selector: 'app-valueset',
  templateUrl: './valueset.component.html',
  styleUrls: ['./valueset.component.less']
})
export class ValuesetComponent implements OnInit {
  dataSource: any;
  popupVisible:boolean=false;
  settingPopupVisible:boolean=false;
  constructor(private fhirService:FhirService) {
    var __this=this;
    this.fhirService.get('ValueSet').subscribe({next(result) {
      __this.dataSource=result.entry;
    },})
   }

  ngOnInit(): void {
  }

  onToolbarPreparing(e:any){
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

  valueSetPopupHidden(e:any){
    this.popupVisible=e;
  }

}
