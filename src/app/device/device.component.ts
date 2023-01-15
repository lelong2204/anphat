import { Component, OnInit } from '@angular/core'
import { FhirService } from '../services/fhir.service'
import { SharedService } from '../services/shared.service'
import { confirm } from 'devextreme/ui/dialog'
import { ValueSet } from '../_models/resources/valueSet'

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.less'],
})
export class DeviceComponent implements OnInit {
  dataSource: any
  rootData: any
  formData: any
  popupVisible: boolean = false
  defaultFormData: any = { resourceType: 'Device' }
  deviceStatus: any
  statusConcepts:any[]=[]
  dropDownOptions:any;
  constructor(
    private fhirService: FhirService,
    private sharedService: SharedService,
  ) {
    var __this = this
    this.dropDownOptions = { width: 1000 };

    this.sharedService.emitChange('Quản lý thiết bị')
    this.getList()
    this.fhirService.read('ValueSet', 'device-status').subscribe({
      next(result:ValueSet) {
        __this.deviceStatus = result
        if(result.compose!=null){
          for(var i=0;i< result.compose.include.length;i++){
            __this.statusConcepts.push(...result.compose.include[i].concept)
          }
        }
      },
    })
  }

  ngOnInit() {
    
  }

  onToolbarPreparing(e: any) {
    let toolbarItems = e.toolbarOptions.items
    let _this = this

    toolbarItems.push({
      widget: 'dxButton',
      options: {
        text: 'Thêm mới',
        stylingMode: 'contained',
        type: 'success',
        onClick: function () {
          _this.formData = { ..._this.defaultFormData }
          _this.popupVisible = !_this.popupVisible
        },
      },
      location: 'before',
    })
  }

  getList() {
    this.fhirService.get('Device').subscribe((data: any) => {
      if (data.entry != null) {
        this.rootData = data.entry
      } else {
        this.rootData = []
      }
      this.dataSource = [...this.rootData]
    })
  }
  deleteRow(e: any) {
    let result = confirm(
      '<p>Are you sure to delete this organization?</p>',
      'Confirm Delete',
    )
    var _this = this
    result.then((result) => {
      if (result) {
        _this.fhirService
          .delete('organization/' + e.row.data.resource.id)
          .subscribe((data: any) => {
            _this.getList()
          })
      }
    })
  }
  statusSelectionChanged(e:any,cellInfo:any,component:any){
    if(e!=null){
      cellInfo.setValue(e.code);
      component.close()
    }
  }
  editRow(e: any) {}

  initNewDeviceRow(e:any){
    e.data.resource.resourceType="Device";
    if(e.data.resource.parent.reference==0){
     delete e.data.resource.parent
      // e.data.resource.parent.reference=''
    }

  }

  onDeviceRowInserted(e:any){
    var __this=this;
    var resource=e.data.resource;
    this.fhirService.post(resource).subscribe({next(value) {
      __this.getList();
    },})
  }
}
