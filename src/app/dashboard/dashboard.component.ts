import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { AuthenticationService } from '../services/authentication.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  currentUser:any;
  constructor(private authenticationService:AuthenticationService,
    private accountService:AccountService,
    private router: Router,
    private sharedService: SharedService) {
    this.sharedService.emitChange("Dashboard");

   }

  ngOnInit(): void {
    var __this=this;
  //  this.authenticationService.authToken.subscribe({next(value) {
  //   if(value===""){
  //     __this.router.navigate(['/login']);
  //   }
  //  },});
  }

  

}
