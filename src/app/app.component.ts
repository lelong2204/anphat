import { Component } from '@angular/core'
import { Router } from '@angular/router'
import notify from 'devextreme/ui/notify'
import { AuthenticationService } from './services/authentication.service'
import { Location } from '@angular/common'
import { AccountService } from './services/account.service'
import { SharedService } from './services/shared.service'
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  homeButtonOptions: any
  backButtonOptions: any
  accountButtonOptions: any
  settingsButtonOptions: any
  logoutButtonOptions: any

  currentUserName: string
  permissions: string[]
  title = 'AP RIS'
  logined: boolean = false
  currentUser:any;
  currentPage:string="Bảng điều khiển";
  /**
   *
   */
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private accountService: AccountService,
    private location: Location,
    private sharedService: SharedService,
    private titleService:Title
  ) {
    var __this = this

    __this.getCurrentUser()
    __this.titleService.setTitle("Bảng điều khiển - An Phat Smart Medical");
    __this.authenticationService.currentUserName.subscribe({
      next(value) {
        __this.currentUserName = value
      },
    })

    __this.authenticationService.currentPermissions.subscribe({
      next(value) {
        __this.permissions = value.split(',')
      },
    })

    __this.homeButtonOptions = {
      icon: 'home',
      onClick: () => {
        __this.router.navigate(['/'])
      },
    }
    __this.backButtonOptions = {
      icon: 'back',
      onClick: () => {
        __this.location.back()
      },
    }
   
    __this.settingsButtonOptions = {
      text: 'Settings',
      onClick: () => {
        __this.router.navigate(['/settings'])
      },
    }

    __this.logoutButtonOptions = {
      text: 'Logout',
      onClick: () => {
        __this.authenticationService.logout()
        __this.accountService.logout()
        __this.logined = false
      },
    }
    sharedService.changeEmitted$.subscribe(text => {
      __this.currentPage=text;
  });
  }

  getCurrentUser() {
    var __this = this
    this.accountService.currenUser$.subscribe({
      next(user) {
        if (user != null && user!=="") {
          __this.logined = true;
          __this.currentUser=user;
          var loginedUser= JSON.parse(user);
          __this.accountButtonOptions = {
            text: loginedUser.userName,
            icon: 'user',
            onClick: () => {
              notify('Add button has been clicked!')
            },
          }
        } else {
          __this.router.navigate(['/login'])
        }
      },
    })
  }
}
