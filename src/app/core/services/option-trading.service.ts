import { Injectable } from '@angular/core';
import { FirestoreBuilderService, FirestoreService } from 'firestore';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
      map(({ documents }) => documents ? documents.map((item: any) => item) : [])
    ))
    return forkJoin(arr).pipe(
      map(arrays => arrays.reduce((a, b) => a.concat(b), []))
    );
  }

  deleteOption(path: string): Observable<any> {
    return this.firestore.delete(this.getUrl(path));
  }

  editOption(path: string, form: any): Observable<any> {
    const params = { 'updateMask.fieldPaths': Object.keys(form) };
    return this.firestore.patch(this.getUrl(path), { fields: FirestoreBuilderService.build(form) }, params);
  }
  

  getUrl(path: string) {
    const nameArr = path.split('/');
    return nameArr.splice(nameArr.findIndex(item => item === 'documents')).join('/');
  }


}
