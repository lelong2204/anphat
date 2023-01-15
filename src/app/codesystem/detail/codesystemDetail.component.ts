import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FhirService } from 'src/app/services/fhir.service';
import notify from 'devextreme/ui/notify';

@Component({
    selector: 'codesystem-detail',
    templateUrl: './codesystemDetail.component.html',
    styleUrls: ['./codesystemDetail.component.less']
})
export class CodeSystemDetailComponent implements OnInit {
    codeSystem:any;
    namePattern: any = /^[^0-9]+$/;
    addConceptButtonOptions:any;

    buttonOptions: any = {
        text: 'Save',
        type: 'success',
        useSubmitBehavior: true,
      };
      conceptOptions: any[] = [];

    constructor(private activatedRoute: ActivatedRoute,private fhirService:FhirService) {
        var __this=this;

        __this.addConceptButtonOptions = {
            icon: 'add',
            text: 'Add concept',
            onClick: () => {
                if(this.codeSystem.concept==null){
                    this.codeSystem.concept=[];
                }
              this.codeSystem.concept.push({});
              this.conceptOptions = this.getConceptsOptions(this.codeSystem.concept);
            },
          };

        this.activatedRoute.params.subscribe((params: Params) => {
            var id: string = params['id'];

            fhirService.read("CodeSystem",id).subscribe({next(value) {
                __this.codeSystem=value;

                __this.conceptOptions = __this.getConceptsOptions(__this.codeSystem.concept);

            },})

            fhirService.read('CodeSystem',"publication-status").subscribe({next(result) {
                console.log(result);
                },})
          });
     }

    ngOnInit(): void { }

    onFormSubmit(e:any):void{
        var __this=this;
        __this.fhirService.put(__this.codeSystem).subscribe({next(value) {
            notify({
                message: "Updated Successfully",
                position: {
                  my: 'center top',
                  at: 'center top',
                },
              }, 'success', 3000);
        },})
        e.preventDefault();
    }

    

    getConceptsOptions(concept:any){
        const options = [];
        for (let i = 0; i < concept.length; i++) {
          options.push(this.generateNewConceptOptions(i));
        }
        return options;
    }
    generateNewConceptOptions(index: number) {
        return {
          buttons: [{
            name: 'trash',
            location: 'after',
            options: {
              stylingMode: 'text',
              icon: 'trash',
              onClick: () => {
                this.codeSystem.concept.splice(index, 1);
                this.conceptOptions = this.getConceptsOptions(this.codeSystem.concept);
              },
            },
          }],
        };
      }
}
