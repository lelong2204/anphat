import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = `${environment.fhirApiUrl}/api/account`
  private currentUserSource = new BehaviorSubject<any | null>(null)

  currenUser$ = this.currentUserSource.asObservable()

  constructor(private http: HttpClient) {
    this.currentUserSource = new BehaviorSubject<string>(
      localStorage.getItem('user') || '',
    )
    this.currenUser$ = this.currentUserSource.asObservable()
  }

  login(model: any): Observable<any> {
    return this.http.post(this.baseUrl + '/login', model).pipe(
      map((response: any) => {
        const user = response

        const roles = this.getDecodedToken(user.token).role
        user.roles = []
        Array.isArray(roles) ? (user.roles = roles) : user.roles.push(roles)
        if (user) {
          localStorage.setItem('user', JSON.stringify(user))
          this.currentUserSource.next(user)
        }
      }),
    )
  }

  setCurrentUser(user: any) {
    this.currentUserSource.next(user)
  }

  logout() {
    localStorage.removeItem('user')
    this.currentUserSource.next(null)
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]))
  }
}
