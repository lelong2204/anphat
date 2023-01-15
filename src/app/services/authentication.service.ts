import { Injectable } from '@angular/core'
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpResponseBase,
} from '@angular/common/http';
import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
} from 'rxjs/operators';
import {
  Observable,
  BehaviorSubject,
  throwError as _observableThrow,
  of as _observableOf,
} from 'rxjs';
import { map } from 'rxjs/operators'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currenTokenSubject: BehaviorSubject<string>;
  public authToken: Observable<string>;

  private currenUserNameSubject: BehaviorSubject<string>;
  public currentUserName: Observable<string>;

  private currentPermissionsSubject: BehaviorSubject<string>;
  public currentPermissions: Observable<string>;


  protected jsonParseReviver:
    | ((key: string, value: any) => any)
    | undefined = undefined

  constructor(private http: HttpClient) {
    this.currenTokenSubject = new BehaviorSubject<string>(
      localStorage.getItem('authToken') || '',
    )
    this.authToken = this.currenTokenSubject.asObservable();

    this.currenUserNameSubject=new BehaviorSubject<string>(
      localStorage.getItem('userName')||'');
    this.currentUserName = this.currenUserNameSubject.asObservable();
    
    this.currentPermissionsSubject=new BehaviorSubject<string>(

      localStorage.getItem('permissions')||'');
    this.currentPermissions = this.currentPermissionsSubject.asObservable();
  }
  public get currentUserValue(): string {
    return this.currenTokenSubject.value
  }

  login(
    userName: string,
    password: string,
    userData: string,
  ): Observable<void> {
    const content_ = JSON.stringify({ userName, password, userData })
    let url_ = `${environment.medicalViewerApiUrl}api/auth/AuthenticateUser`
    const options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }
    return this.http.request('post', url_, options_).pipe(
      _observableMergeMap((response_: any) => {
        return this.processLogin(userName, response_)
      }),
    )
  }

  protected processLogin(userName:string,response: HttpResponseBase): Observable<any> {
    var __this=this;
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined

    let _headers: any = {}
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key)
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          localStorage.setItem('authToken', _responseText);
          this.currenTokenSubject.next(_responseText);

          localStorage.setItem('userName',userName);
          this.currenUserNameSubject.next(userName);


          this.getUserPermission(userName).subscribe({next(permissions:string[]) {
            var permisionValue=permissions.join(',');
            localStorage.setItem('permissions',permisionValue);
            __this.currentPermissionsSubject.next(permisionValue);
          },})
          return _observableOf(_responseText)
        }),
      )
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          )
        }),
      )
    }
    return _observableOf<any>(<any>null)
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('permissions');
    this.currenTokenSubject.next('');
    this.currenUserNameSubject.next('');
    this.currentPermissionsSubject.next('');
    
  }

  getUserPermission(userName: string): Observable<any> {
    let url_ = `${environment.medicalViewerApiUrl}api/auth/GetUserPermissions?name=${userName}&rnd=${new Date().getTime()}`;
    
    const options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }
    return this.http.request('get', url_, options_).pipe(
      _observableMergeMap((response_: any) => {
        return this.processGetUserPermission(response_)
      }),
    )
  }

  protected processGetUserPermission(
    response: HttpResponseBase,
  ): Observable<any> {
    const status = response.status
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined

    let _headers: any = {}
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key)
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result200: any = null
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver)
          return _observableOf(resultData200)
        }),
      )
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          )
        }),
      )
    }
    return _observableOf<any>(<any>null)
  }
}

function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
    if (!blob) {
      observer.next('')
      observer.complete()
    } else {
      let reader = new FileReader()
      reader.onload = (event) => {
        observer.next((<any>event.target).result)
        observer.complete()
      }
      reader.readAsText(blob)
    }
  })
}
function throwException(
  message: string,
  status: number,
  response: string,
  headers: { [key: string]: any },
  result?: any,
): Observable<any> {
  if (result !== null && result !== undefined) return _observableThrow(result)
  else
    return _observableThrow(
      new ApiException(message, status, response, headers, null),
    )
}

export class ApiException extends Error {
  message: string
  status: number
  response: string
  headers: { [key: string]: any }
  result: any

  constructor(
    message: string,
    status: number,
    response: string,
    headers: { [key: string]: any },
    result: any,
  ) {
    super()

    this.message = message
    this.status = status
    this.response = response
    this.headers = headers
    this.result = result
  }

  protected isApiException = true

  static isApiException(obj: any): obj is ApiException {
    return obj.isApiException === true
  }
}
