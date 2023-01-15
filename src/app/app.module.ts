import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import {
  DxSelectBoxModule,
  DxTextAreaModule,
  DxTextBoxModule,
  DxDateBoxModule,
  DxFormModule,
  DxDataGridModule,
  DxTemplateModule,
  DxToolbarModule,
  DxTreeViewModule,
  DxScrollViewModule,
  DxPopupModule,
  DxDropDownBoxModule,
  DxTagBoxModule,
  DxAccordionModule,
  DxTreeListModule,
  DxTabPanelModule,
DxResponsiveBoxModule,
DxListModule,
DxFileUploaderModule,
DxBoxModule,
DxButtonModule
} from 'devextreme-angular';
import { LogoutComponent } from './logout/logout.component';
import { ServiceRequestComponent } from './service-request/service-request.component';
import { PatientComponent } from './patient/patient.component';
import { PractitionerComponent } from './practitioner/practitioner.component';
import { SettingsComponent } from './settings/settings.component';
import { CodesystemComponent } from './codesystem/codesystem.component';
import { ValuesetComponent } from './valueset/valueset.component';
import { LocationComponent } from './location/location.component';
import { OrganizationComponent } from './organization/organization.component';
import { CareplanComponent } from './careplan/careplan.component';
import { DiagnosticreportComponent } from './diagnosticreport/diagnosticreport.component';
import { CodeSystemDetailComponent } from './codesystem/detail/codesystemDetail.component';
import { CoverageComponent } from './coverage/coverage.component';
import { ImagingStudyComponent } from './imaging-study/imaging-study.component';
import { AdminComponent } from './admin/admin.component';
import { GoalComponent } from './goal/goal.component';
import { GoalDetailComponent } from './goal/detail/detail.component';
import { CareplanDetailComponent } from './careplan/careplan-detail/careplan-detail.component';
import { ActivityDefinitionComponent } from './activity-definition/activity-definition.component';
import { ActivityDefinitionDetailComponent } from './activity-definition/activity-definition-detail/activity-definition-detail.component';
import { PlanDefinitionComponent } from './plan-definition/plan-definition.component';
import { PlanDefinitionDetailComponentComponent } from './plan-definition/detail/plan-definition-detail-component/plan-definition-detail-component.component';
import { CareplanGoalcomponentComponent } from './careplan/careplan-goal/careplan-goalcomponent/careplan-goalcomponent.component';
import { LocationDetailComponent } from './location-detail/location-detail.component';
import { ActivityDefinitionSettingComponentComponent } from './activity-definition/activity-definition-setting/activity-definition-setting-component/activity-definition-setting-component.component';
import { PlanDefinitionActionComponentComponent } from './plan-definition/plan-definition-action-component/plan-definition-action-component/plan-definition-action-component.component';
import { GoalTargetComponentComponent } from './goal/goal-target/goal-target-component/goal-target-component.component';
import { GoalOutcomeComponentComponent } from './goal/goal-outcome/goal-outcome-component/goal-outcome-component.component';
import { PatientDetailComponentComponent } from './patient/detail/patient-detail-component/patient-detail-component.component';
import { IdentifierComponentComponent } from './identifier/identifier-component/identifier-component.component';
import { HumanNameComponent } from './human-name/human-name/human-name.component';
import { AddressElementComponent } from './commonComponents/address-element/address-element.component';
import { TelecomElementComponent } from './commonComponents/telecom-element/telecom-element/telecom-element.component';
import { ContactElementComponent } from './commonComponents/contact-element/contact-element.component';
import { PatientSettingComponent } from './patient/patient-setting/patient-setting.component';
import { ValueSetPopupComponent } from './valueset/valueSetPopup/valueSetPopup.component';
import { ValueSetDetailComponent } from './valueset/valueSetDetail/valueSetDetail.component';
import { DeviceComponent } from './device/device.component';
import { ConceptElementComponent } from './commonComponents/concept-element/concept-element.component';
import { DesignationElementComponent } from './commonComponents/designation-element/designation-element.component';
import { ValueSetConceptElementComponent } from './commonComponents/valueSetConcept-element/valueSetConcept-element.component';

@NgModule({
  declarations: [	
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LogoutComponent,
    ServiceRequestComponent,
    PatientComponent,
    PractitionerComponent,
    SettingsComponent,
    CodesystemComponent,
    ValuesetComponent,
    LocationComponent,
    OrganizationComponent,
    CareplanComponent,
    DiagnosticreportComponent,
    CodeSystemDetailComponent,
    CoverageComponent,
    ImagingStudyComponent,
    AdminComponent,
    GoalComponent,
    GoalDetailComponent,
    CareplanDetailComponent,
    ActivityDefinitionComponent,
    ActivityDefinitionDetailComponent,
    PlanDefinitionComponent,
    PlanDefinitionDetailComponentComponent,
    CareplanGoalcomponentComponent,
    LocationDetailComponent,
    ActivityDefinitionSettingComponentComponent,
    PlanDefinitionActionComponentComponent,
    GoalTargetComponentComponent,
    GoalOutcomeComponentComponent,
    PatientDetailComponentComponent,
    IdentifierComponentComponent,HumanNameComponent,AddressElementComponent,TelecomElementComponent,ContactElementComponent,
    PatientSettingComponent,ValueSetPopupComponent,ValueSetDetailComponent,
      DeviceComponent,ConceptElementComponent,DesignationElementComponent,ValueSetConceptElementComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxFormModule,
    DxDataGridModule,
    DxToolbarModule,
    DxTemplateModule,
    DxTreeViewModule,
    DxScrollViewModule,
    DxPopupModule,
    DxDropDownBoxModule,
    DxResponsiveBoxModule,
    DxListModule,
    DxTagBoxModule,DxAccordionModule,DxTreeListModule,DxTabPanelModule,DxFileUploaderModule,DxBoxModule,
    DxTextBoxModule,DxButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
