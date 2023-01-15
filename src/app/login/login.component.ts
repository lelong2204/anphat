import { Component, OnInit } from '@angular/core'
import { AuthenticationService } from '../services/authentication.service'
import { UserLogin } from '../_models/userLogin'
import notify from 'devextreme/ui/notify'
import { Router } from '@angular/router'
import { AccountService } from '../services/account.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  user: UserLogin
  buttonOptions: any = {
    text: 'Login',
    type: 'success',
    useSubmitBehavior: true,
  }
  constructor(
    private authenticationService: AuthenticationService,
    private accountService: AccountService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.user = new UserLogin()
    // this.authenticationService.login("admin","admin","").subscribe({ next: (result: any) => {
    //   console.log(result);
    // }});
  }
  onFormSubmit(e: any): void {
    var __this = this;

    this.accountService.login(this.user).subscribe({
      next(response) {
        __this.router.navigate(['/'])
      },
    })
    e.preventDefault();

    //   this.authenticationService.login(this.user.UserName,this.user.Password,"").subscribe({ next: (result: any) => {
    //     this.router.navigate(['/']);
    //   },error(err) {
    //     notify({
    //       message: "Invalid User or Password",
    //       position: {
    //         my: 'center top',
    //         at: 'center top',
    //       },
    //     }, 'error', 3000);
    //   },});
    // }
  }
}
