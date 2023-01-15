import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
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
import { environment } from '../../environments/environment'
import { ApiException } from './authentication.service';
import { SearchParams } from '../_models/searchParams';

@Injectable({
  providedIn: 'root'
})
export class FhirService {
  private baseUrl :string=environment.fhirApiUrl;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;
  
  constructor( @Inject(HttpClient)private http: HttpClient) { }

  get(resourceType:string,searchParams?:SearchParams[]):Observable<any> {
    let url_ = `${this.baseUrl}/${resourceType}`;
    url_ = url_.replace(/[?&]$/, '');

    if(searchParams!=null && searchParams.length>0){
      let params=`?`;
      searchParams.forEach(searchParam => {
        if (params.length > 1) {
          params += "&"
        }
        params+=`${searchParam.key}${(searchParam.comparator) !=null ? searchParam.comparator:"="}${searchParam.value}`
      });
      url_+=params
    }

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'text/plain',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGet(<any>response_);
            } catch (e) {
              return <Observable<any>>(<any>_observableThrow(e));
            }
          } else return <Observable<any>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processGet(response: HttpResponseBase): Observable<any> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result200: any = null;
          let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
          return _observableOf(resultData200);
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return throwException('An unexpected server error occurred.', status, _responseText, _headers);
        })
      );
    }
    return _observableOf<any>(<any>null);
  }

  read(resourceType:string,id:string):Observable<any> {
    let url_ = `${this.baseUrl}/${resourceType}/${id}`;
    url_ = url_.replace(/[?&]$/, '');
  
    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'text/plain',
      }),
    };
  
    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGet(<any>response_);
            } catch (e) {
              return <Observable<any>>(<any>_observableThrow(e));
            }
          } else return <Observable<any>>(<any>_observableThrow(response_));
        })
      );
  }

  post(resource:any):Observable<any> {
    let url_ = `${this.baseUrl}/${resource.resourceType}`;
    url_ = url_.replace(/[?&]$/, '');
    const content_ = JSON.stringify(resource);
    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json',
      }).set('content-type', 'application/json'),
    };
  
    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processPost(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGet(<any>response_);
            } catch (e) {
              return <Observable<any>>(<any>_observableThrow(e));
            }
          } else return <Observable<any>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processPost(response: HttpResponseBase): Observable<any> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 201) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let resultData201 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
          return _observableOf(resultData201);
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return throwException('An unexpected server error occurred.', status, _responseText, _headers);
        })
      );
    }
    return _observableOf<any>(<any>null);
  }

  put(resource:any):Observable<any> {
    let url_ = `${this.baseUrl}/${resource.resourceType}/${resource.id}`;
    url_ = url_.replace(/[?&]$/, '');
    const content_ = JSON.stringify(resource);
  
    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }),
    };
  
    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGet(<any>response_);
            } catch (e) {
              return <Observable<any>>(<any>_observableThrow(e));
            }
          } else return <Observable<any>>(<any>_observableThrow(response_));
        })
      );
  }

  delete(url:string):Observable<any> {
    let url_ = `${this.baseUrl}/${url}`;
    url_ = url_.replace(/[?&]$/, '');
    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'text/plain',
      }),
    };

    console.log(url_)
    return this.http
      .request('delete', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processDelete(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processDelete(<any>response_);
            } catch (e) {
              return <Observable<any>>(<any>_observableThrow(e));
            }
          } else return <Observable<any>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processDelete(response: HttpResponseBase): Observable<any> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result200: any = null;
          let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
          return _observableOf(resultData200);
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return throwException('An unexpected server error occurred.', status, _responseText, _headers);
        })
      );
    }
    return _observableOf<any>(<any>null);
  }
}




function throwException(
  message: string,
  status: number,
  response: string,
  headers: { [key: string]: any },
  result?: any
): Observable<any> {
  if (result !== null && result !== undefined) return _observableThrow(result);
  else return _observableThrow(new ApiException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
    if (!blob) {
      observer.next('');
      observer.complete();
    } else {
      let reader = new FileReader();
      reader.onload = (event) => {
        observer.next((<any>event.target).result);
        observer.complete();
      };
      reader.readAsText(blob);
    }
  });
}