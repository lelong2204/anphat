import { Component, OnInit } from '@angular/core'
import notify from 'devextreme/ui/notify'
import { FhirService } from '../services/fhir.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less'],
})
export class SettingsComponent implements OnInit {
  settingData: any
  resourceData: any = {}
  settings: any[]
  namePattern: any = /^[^0-9]+$/
  addConceptButtonOptions: any

  buttonOptions: any = {
    text: 'Save',
    type: 'success',
    useSubmitBehavior: true,
  }
  conceptOptions: any[] = []
  constructor(private fhirService: FhirService) {
    this.settings = [
      {
        id: '1',
        text: 'Cài đặt chung',
        expanded: true,
        items: [
          {
            id: '1_1',
            text: 'Danh mục giới tính',
            fullName: 'AdministrativeGender',
            description: 'Danh mục giới tính',
            fhirId: 'administrative-gender',
            selected: true,
          },
          {
            id: '1_2',
            text: 'Trạng thái xuất bản',
            fullName: 'PublicationStatus',
            description: 'Trạng thái xuất bản',
            fhirId: 'publication-status',
          },
          {
            id: '1_3',
            text: 'Sử dụng mã định danh',
            fullName: 'IdentifierUse',
            description: 'Mục đích sử dụng mã định danh',
            fhirId: 'identifier-use',
          },
          {
            id: '1_4',
            text: 'Loại định danh',
            fullName: 'IdentifierType',
            description: 'Loại định danh',
            fhirId: 'identifier-type',
          },
          {
            id: '1_5',
            text: 'Bộ phận cơ thể',
            fullName: 'BodySite',
            description: 'Bộ phận cơ thể.',
            fhirId: 'body-site',
          },
          {
            id: '1_6',
            text: 'Đầu mối liên hệ',
            fullName: 'ContactPoint',
            description: 'Đầu mối liên hệ',
            items: [
              {
                id: '1_6_1',
                text: 'Hình thức liên lạc',
                fullName: 'ContactPointSystem',
                description: 'Hình thức liên lạc',
                fhirId: 'contact-point-system',
              },
              {
                id: '1_6_2',
                text: 'Sử dụng mối liên hệ',
                fullName: 'ContactPointSystem',
                description: 'Sử dụng hình thức liên lạc',
                fhirId: 'contact-point-use',
              },
            ],
          },
          {
            id: '1_7',
            text: 'Địa chỉ',
            fullName: 'Address',
            description: 'Địa chỉ',
            items: [
              {
                id: '1_7_1',
                text: 'Sử dụng địa chỉ',
                fullName: 'Sử dụng địa chỉ',
                description: 'Sử dụng địa chỉ',
                fhirId: 'address-use',
              },
              {
                id: '1_7_2',
                text: 'Loại địa chỉ',
                fullName: 'AddressType',
                description: 'Loại địa chỉ',
                fhirId: 'address-type',
              },
            ],
          },
          {
            id: '1_8',
            text: 'Lâm sàng',
            fullName: 'Clinical',
            description: 'Lâm sàng.',
            items:[
              {
                id: '1_8_1',
                text: 'Danh mục dịch vụ y tế',
                fullName: 'ProcedureCodes',
                fhirId: 'procedure-codes',
                description: 'Danh mục dịch vụ Y tế.',
              },
              {
                id: '1_8_2',
                text: 'Triệu chứng, chẩn đoán',
                fullName: 'ProcedureReason',
                fhirId: 'procedure-reason',
                description: 'Triệu chứng, chẩn đoán.',
              },
            ]
          },
          {
            id: '1_9',
            text: 'Chẩn đoán và điều trị',
            fullName: 'Diagnostic',
            description: 'Chẩn đoán và điều trị.',
            items:[
              {
                id: '1_9_1',
                text: 'Chỉ số cần theo dõi',
                fullName: 'ObservationCodes',
                fhirId: 'observation-codes',
                description: 'Chỉ số cần theo dõi.',
              }
            ]
          }
        ],
      },
      {
        id: '2',
        text: 'Bệnh nhân',
        items: [
          {
            id: '2_1',
            text: 'Liên hệ',
            fullName: 'Contact',
            description: 'Liên hệ.',
            items: [
              {
                id: '2_1_1',
                text: 'Thông tin mối quan hệ',
                fhirId: 'person-contact-relationship',
                fullName: 'PatientContactRelationship',
                description: 'Thông tin mối quan hệ.',
              },
            ],
          },
          {
            id: '2_2',
            text: 'Trạng thái kết hôn',
            fullName: 'MaritalStatus',
            description: 'Trạng thái kết hôn.',
            fhirId: 'marital-status',
          },
        ],
      },
      {
        id: '3',
        text: 'Bác sĩ',
        description: 'Thông tin bác sĩ.',
        items: [
          {
            id: '3_1',
            text: 'Vai trò bác sĩ',
            fullName: 'PractitionerRole',
            description: 'Vai trò bác sĩ',
            items: [
              // {
              //   id: '3_1_1',
              //   text: 'Role Identifier',
              //   fhirId: 'role-identifier',
              //   fullName: 'Role identifier',
              //   description: 'Danh tính vai trò bác sĩ',
              // },
              {
                id: '3_1_2',
                text: 'Loại vai trò',
                fhirId: 'role-code',
                fullName: 'RoleCode',
                description: 'Loại vai trò',
              },
              {
                id: '3_1_3',
                text: 'Vai trò chuyên môn',
                fhirId: 'practice-codes',
                fullName: 'RoleSpecialty',
                description: 'Vai trò chuyên môn',
              },
            ],
          },
        ],
      },
      {
        id: '4',
        text: 'Địa điểm',
        items: [
          {
            id: '4_1',
            text: 'Loại vật lý',
            fhirId: 'location-physical-type',
            fullName: 'PhysicalType',
            description: 'Loại địa điểm vật lý',
          },
          {
            id: '4_2',
            text: 'Trạng thái địa điểm',
            fhirId: 'location-status',
            fullName: 'LocationStatus',
            description: 'Trạng thái địa điểm',
          },
          {
            id: '4_3',
            fhirId: 'bed-status',
            text: 'Trạng thái giường bệnh',
            fullName: 'BedStatus',
            description: 'Trạng thái giường bệnh',
          },
          {
            id: '4_4',
            fhirId: 'location-mode',
            text: 'Kiểu địa điểm',
            fullName: 'LocationMode',
            description: 'Kiểu địa điểm.',
          },
        ],
      },
      {
        id: '5',
        text: 'Tổ chức',
        items: [
          {
            id: '5_2',
            fhirId: 'organization-type',
            text: 'Loại tổ chức',
            fullName: 'OrganizationType',
            description: 'Loại tổ chức.',
          }
        ],
      },
      {
        id: '7',
        text: 'Yêu cầu dịch vụ',
        items: [
          {
            id: '7_1',
            text: 'Trạng thái yêu cầu',
            fullName: 'RequestStatus',
            fhirId: 'request-status',
            description: 'Trạng thái chỉ định.',
          },
          {
            id: '7_2',
            text: 'Mục đích yêu cầu',
            fullName: 'RequestIntent',
            fhirId: 'request-intent',
            description: 'Mục đích yêu cầu.',
          },
          {
            id: '7_3',
            text: 'Phân loại yêu cầu',
            fullName: 'ServiceRequestCategory',
            fhirId: 'servicerequest-category',
            description: 'Phân loại yêu cầu.',
          },
          {
            id: '7_4',
            text: 'Mức độ ưu tiên',
            fullName: 'RequestPriority',
            fhirId: 'request-priority',
            description: 'Mức độ ưu tiên.',
          },
          
        ],
      },
      {
        id: '9',
        text: 'Định nghĩa hành động',
        items: [
          {
            id: '9_1',
            text: 'Kiểu tài nguyên yêu cầu',
            fhirId:'request-resource-types',
            fullName: 'RequestResourceTypes',
            description: 'Kiểu tài nguyên yêu cầu.',
          },
        ],
      },
      {
        id: '6',
        text: 'Quy trình chăm sóc',
        items: [
          {
            id: '6_1',
            fhirId: 'care-plan-status',
            text: 'Trạng thái quy trình',
            fullName: 'Care plan status',
            description: 'Trạng thái quy trình',
          },
          {
            id: '6_2',
            fhirId: 'care-plan-intent',
            text: 'Mục đích quy trình',
            fullName: 'CarePlanIntent',
            description: 'Mục đích quy trình',
          },
          {
            id: '6_3',
            fhirId: 'care-plan-category',
            text: 'Phân loại quy trình',
            fullName: 'category',
            description: 'Danh mục quy trình.',
          },
          {
            id: '6_4',
            fhirId: 'care-plan-activity-kind',
            text: 'Hành động',
            fullName: 'Activity',
            description: 'Loại hành động.',
            items: [
              {
                id: '6_4_1',
                fhirId: 'care-plan-activity-kind',
                text: 'Loại hành động',
                fullName: 'Kind',
                description: 'Loại hành động.',
              },
              {
                id: '6_4_2',
                fhirId: 'care-plan-activity-status',
                text: 'Trạng thái hành động',
                fullName: 'Status',
                description: 'Trạng thái hành động.',
              },
            ],
          },
        ],
      },
      {
        id: '8',
        text: 'Ca chụp',
        items: [
          {
            id: '8_1',
            text: 'Trạng thái ca chụp',
            fhirId: 'imagingstudy-status',
            fullName: 'ImagingStudyStatus',
            description: 'Trạng thái ca chụp.',
          },
          {
            id: '8_2',
            text: 'Phương thức chụp',
            fullName: 'ImagingModality',
            fhirId: 'imaging-modality',
            description: 'Phương thức chụp.',
          },
        ],
      },
    ]
    this.settingData = this.settings[0].items[0]
    this.GetFhirData(this.settingData)
    this.addConceptButtonOptions = {
      icon: 'add',
      text: 'Add concept',
      onClick: () => {
        if (this.resourceData.concept == null) {
          this.resourceData.concept = []
        }
        this.resourceData.concept.push({})
        this.conceptOptions = this.getConceptsOptions(this.resourceData.concept)
      },
    }
  }

  changeSelection(e: any) {
    const settingData = e.itemData
    this.settingData = settingData

    this.GetFhirData(settingData)
  }

  GetFhirData(settingData: any) {
    var __this = this
    if (settingData.fhirId != null) {
      this.fhirService.read('CodeSystem', settingData.fhirId).subscribe({
        next(value) {
          if (value != null) {
            __this.resourceData = value
            if (value.concept != null) {
              __this.conceptOptions = __this.getConceptsOptions(
                __this.resourceData.concept,
              )
            }
          } else {
          }
        },
        error(err) {
          __this.resourceData = {
            id: settingData.fhirId,
            url: `CodeSystem/${settingData.fhirId}`,
            resourceType: 'CodeSystem',
            name: settingData.fullName,
            title: settingData.text,
            description: settingData.description,
            status: 'active',
            caseSensitive: true,
            hierarchyMeaning: 'grouped-by',
            content: 'complete',
            concept: [],
          }
          __this.conceptOptions = __this.getConceptsOptions(
            __this.resourceData.concept,
          )
        },
      })
    }
  }

  ngOnInit(): void {}

  onFormSubmit(e: any): void {
    var __this = this
    __this.fhirService.put(__this.resourceData).subscribe({
      next(value) {
        notify(
          {
            message: 'Updated Successfully',
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
              this.resourceData.concept.splice(index, 1)
              this.conceptOptions = this.getConceptsOptions(
                this.resourceData.concept,
              )
            },
          },
        },
      ],
    }
  }
}
