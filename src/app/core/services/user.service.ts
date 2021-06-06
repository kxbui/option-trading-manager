import { Injectable } from '@angular/core';
import { FirestoreService } from 'firestore';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const OPT_TRD_USER = 'OPT_TRD_USER';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: any | null = null;

  constructor(private firestoreService: FirestoreService) { }

  setUser(user: any) {
    this.user = Object.assign({}, user);
    localStorage.setItem(OPT_TRD_USER, JSON.stringify(this.user));
    this.firestoreService.setIdToken(this.user.idToken);

  }

  removeUser() {
    this.user = null;
    localStorage.removeItem(OPT_TRD_USER);
  }

  loadUser() {
    const user = JSON.parse(localStorage.getItem(OPT_TRD_USER) as string);
    return user ? this.checkUser(user) : EMPTY;
  }

  checkUser(user: { refreshToken: string }) {
    return this.firestoreService.exchangeToken(user.refreshToken).pipe(
      tap((resp: any) => this.refreshToken(resp)),
      catchError(_ => this.refreshTokenError())
    )
  }

  refreshToken(resp: { refresh_token: string; id_token: string; user_id: string }) {
    this.setUser({ ...this.user, idToken: resp.id_token, refreshToken: resp.refresh_token, localId: resp.user_id })
  }

  refreshTokenError() {
    this.removeUser();
    return EMPTY;
  }
}
