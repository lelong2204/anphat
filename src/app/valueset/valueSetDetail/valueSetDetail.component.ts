import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { FhirService } from 'src/app/services/fhir.service';

@Component({
  selector: 'app-valueSetDetail',
  templateUrl: './valueSetDetail.component.html',
  styleUrls: ['./valueSetDetail.component.less'],
})
export class ValueSetDetailComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;

  valueSet: any;
  editButtonOptions: any;
  activeButtonOptions: any;
  settingsButtonOptions: any;
  codeSystems: any[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private fhirService: FhirService
  ) {
    var __this = this;
    this.activatedRoute.params.subscribe((params: Params) => {
      var id: string = params['id'];

      fhirService.read('ValueSet', id).subscribe({
        next(value) {
          if(value.compose==null){
            value.compose={include:[]}
          }

          __this.valueSet = value;
        },
      });
    });

    this.editButtonOptions = {
      icon: 'edit',
      onClick: () => {
        notify('Refresh button has been clicked!');
      },
    };

    this.settingsButtonOptions = {
      text: 'Cài đặt',
      icon: 'preferences',
      onClick: () => {},
    };

    fhirService.get('CodeSystem').subscribe({
      next(result) {
        __this.codeSystems = result.entry;
      },
    });
  }

  ngOnInit() {}

  addInclude() {
    if (this.valueSet.compose == null) {
      this.valueSet.compose = {
        include: [{ system: '' }],
      };
    } else {
      this.valueSet.compose.include.push({ system: '' });
    }
  }

  onCodeSystemSelectionChanged(selectedRowKeys: any[], i: number,component:any) {
    if (selectedRowKeys.length > 0) {
    this.valueSet.compose.include[i].system=selectedRowKeys[0];
    }
  }

  save(){
    this.fhirService.put(this.valueSet).subscribe({next(value) {
      console.log(value);
    },})
  }

  addNewInclude(e:any){
    this.dataGrid.instance.addRow();
  }

  onIncludeRowInserted(e:any){
    var __this=this;
    delete e.data['__KEY__'];
    var codeSystem= this.codeSystems.filter(x=>x.fullUrl==e.data.system)[0];
    var valueSetConcepts=[];
    for(var i=0;i<codeSystem.resource.concept.length;i++){
      valueSetConcepts.push({
        code:codeSystem.resource.concept[i].code,
        display:codeSystem.resource.concept[i].display
      })
    }
    for(var i=0;i<this.valueSet.compose.include.length;i++){
      if(__this.valueSet.compose.include[i].system==e.data.system){
        __this.valueSet.compose.include[i].concept=valueSetConcepts;
      }
    }
  }
}
