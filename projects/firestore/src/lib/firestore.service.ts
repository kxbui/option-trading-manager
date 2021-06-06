import { Injectable, InjectionToken, Inject } from '@angular/core';
import { FirestoreConfig } from './firestore-config';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { HttpRequestOptions } from './http-request-options';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FireStoreParser } from './firestore-parser';

export const FirestoreConfigService = new InjectionToken<FirestoreConfig>(
  'FirestoreConfig'
);

@Injectable()
export class FirestoreService {
  constructor(
    @Inject(FirestoreConfigService) private config: FirestoreConfig,
    private http: HttpClient
  ) {
    config.apiBase = `https://firestore.googleapis.com/v1/projects/${this.config.projectId}/databases/(default)/`;
  }

  signIn(email: string, password: string) {
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.config.apiKey}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    );
  }

  exchangeToken(refresh_token: string) {
    return this.http.post(
      `https://securetoken.googleapis.com/v1/token?key=${this.config.apiKey}`,
      {
        grant_type: 'refresh_token',
        refresh_token
      }
    );
  }

  setIdToken(token: string) {
    this.config.idToken = token;
  }

  getIdToken() {
    return this.config.idToken;
  }

  get(url: string, search = {}) {
    return this.api({
      method: 'get',
      url,
      search,
      headers: this.getHeaders()
    });
  }

  post(url: string, body = {}) {
    return this.api({
      method: 'post',
      url,
      body,
      headers: this.getHeaders()
    });
  }

  delete(url: string) {
    return this.api({
      method: 'delete',
      url,
      headers: this.getHeaders()
    });
  }

  patch(url: string, body = {}) {
    return this.api({
      method: 'patch',
      url,
      body,
      headers: this.getHeaders()
    });
  }

  private api(requestOptions: HttpRequestOptions): Observable<any> {
    return this.http
      .request<any>(
        requestOptions.method || 'get',
        this.config.apiBase + requestOptions.url,
        {
          params: this.toQueryString(requestOptions.search || {}),
          body: JSON.stringify(requestOptions.body),
          headers: requestOptions.headers
        }
      )
      .pipe(map(resp => FireStoreParser(resp)));
  }

  private toQueryString(obj: any): HttpParams {
    let params = new HttpParams();
    Object.keys(obj).forEach((key: string) => {
      if (obj.hasOwnProperty(key)) {
        const val = encodeURIComponent(obj[key]);
        params = params.append(encodeURIComponent(key), val);
      }
    });
    return params;
  }

  private getHeaders(): HttpHeaders {
    return this.auth();
  }

  private auth(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Bearer ${this.config.idToken}`);
    headers = headers.append('Content-Type', 'application/json');
    return headers;
  }
}

