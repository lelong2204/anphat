import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import { Router } from '@angular/router'
import { FhirService } from 'src/app/services/fhir.service'

@Component({
  selector: 'valueSetPopup',
  templateUrl: './valueSetPopup.component.html',
  styleUrls: ['./valueSetPopup.component.less'],
})
export class ValueSetPopupComponent implements AfterViewInit {
  @Input() popupVisible: boolean = false
  @Output() popupHiddenEvent = new EventEmitter<any>()
  formData: any = {
    resourceType: 'ValueSet',
    status: 'draft',
    publisher: 'An Phat Smart Medical',
    date: this.dateStringFormat(new Date())
  }
  buttonOptions: any = {
    text: 'Lưu',
    type: 'success',
    useSubmitBehavior: true,
  }
  constructor(private fhirService:FhirService, private router: Router) {}

  ngAfterViewInit() {}

  popup_hidden(e: any) {
    this.popupVisible = false
    this.popupHiddenEvent.emit(this.popupVisible)
  }

  onFormSubmit(e: any) {
    var __this=this;
    this.fhirService.post(this.formData).subscribe({next(value) {
      __this.router.navigate(['/valueSet/'+value.id])

    },})
    e.preventDefault()
  }

  dateStringFormat(date: Date): string {
    return [
      this.padTo2Digits(date.getFullYear()),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate()),
    ].join('-');
  }
  padTo2Digits(num:number):string {
    return num.toString().padStart(2, '0');
  }
}
