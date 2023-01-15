import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityDefinitionDetailComponent } from './activity-definition/activity-definition-detail/activity-definition-detail.component';
import { ActivityDefinitionComponent } from './activity-definition/activity-definition.component';
import { AdminComponent } from './admin/admin.component';
import { CareplanDetailComponent } from './careplan/careplan-detail/careplan-detail.component';
import { CareplanComponent } from './careplan/careplan.component';
import { CodesystemComponent } from './codesystem/codesystem.component';
import { CodeSystemDetailComponent } from './codesystem/detail/codesystemDetail.component';
import { CoverageComponent } from './coverage/coverage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeviceComponent } from './device/device.component';
import { DiagnosticreportComponent } from './diagnosticreport/diagnosticreport.component';
import { GoalDetailComponent } from './goal/detail/detail.component';
import { GoalComponent } from './goal/goal.component';
import { ImagingStudyComponent } from './imaging-study/imaging-study.component';
import { LocationComponent } from './location/location.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { OrganizationComponent } from './organization/organization.component';
import { PatientDetailComponentComponent } from './patient/detail/patient-detail-component/patient-detail-component.component';
import { PatientComponent } from './patient/patient.component';
import { PlanDefinitionDetailComponentComponent } from './plan-definition/detail/plan-definition-detail-component/plan-definition-detail-component.component';
import { PlanDefinitionComponent } from './plan-definition/plan-definition.component';
import { PractitionerComponent } from './practitioner/practitioner.component';
import { ServiceRequestComponent } from './service-request/service-request.component';
import { SettingsComponent } from './settings/settings.component';
import { ValuesetComponent } from './valueset/valueset.component';
import { ValueSetDetailComponent } from './valueset/valueSetDetail/valueSetDetail.component';

const routes: Routes = [
  { path: '', redirectTo:'dashboard' ,pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'codeSystem', component: CodesystemComponent },
  {
    path: 'codeSystem/:id',
    component: CodeSystemDetailComponent,
},
  { path: 'admin', component: AdminComponent },
  { path: 'valueSet', component: ValuesetComponent },
  {
    path: 'valueSet/:id',
    component: ValueSetDetailComponent,
},
  { path: 'patient', component: PatientComponent },
  { path: 'patient/detail/:id', component: PatientDetailComponentComponent },
  { path: 'practitioner', component: PractitionerComponent },
  { path: 'location', component: LocationComponent },
  { path: 'organization', component: OrganizationComponent },
  { path: 'device', component: DeviceComponent },
  { path: 'carePlan', component: CareplanComponent },
  {
    path: 'carePlan/detail/:id',
    component: CareplanDetailComponent,
},
  { path: 'activityDefinition', component: ActivityDefinitionComponent },
  { path: 'activityDefinition/detail/:id', component: ActivityDefinitionDetailComponent },
  { path: 'diagnosticReport', component: DiagnosticreportComponent },
  { path: 'serviceRequest', component: ServiceRequestComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'coverage', component: CoverageComponent },
  { path: 'imagingStudy', component: ImagingStudyComponent },
  { path: 'goal', component: GoalComponent },
  {
    path: 'goal/detail/:id',
    component: GoalDetailComponent,
},
{ path: 'planDefinition', component: PlanDefinitionComponent },
{ path: 'planDefinition/detail/:id', component: PlanDefinitionDetailComponentComponent },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
