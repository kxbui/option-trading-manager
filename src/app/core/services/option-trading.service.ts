import { Injectable } from '@angular/core';
import { FirestoreBuilderService, FirestoreService } from 'firestore';
import { forkJoin, Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OptionTradingService {

  constructor(private firestore: FirestoreService, private userService: UserService) { }

  addOption(form: any): Observable<any> {
    const url = encodeURI(
      `documents/users/${this.userService.user.localId}/years/${form.expirationDate.getFullYear()}/options`
    );
    return this.firestore.post(url, { fields: FirestoreBuilderService.build(form) });

  }

  getOptionsByYears(years: { value: string }[]): Observable<any> {
    const arr = years.map(({ value }) => this.firestore.get(`documents/users/${this.userService.user.localId}/years/${value}/options`).pipe(
      map(({ documents }) => documents.map((item: any) => item.fields))
    ))
    return forkJoin(arr).pipe(
      map(arrays => arrays.reduce((a, b) => a.concat(b), []))
    );
  }

  handle(resp: any) {
    const s = null;
  }
}
