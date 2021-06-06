import { Injectable } from '@angular/core';
import { FirestoreService } from 'firestore';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  metadata: { years: any[] } | null = null;

  constructor(private firestore: FirestoreService) { }

  setMetadata(metadata: any) {
    this.metadata = { ...this.metadata, years: metadata.years.map((value: number) => ({ value })) };
  }

  getMetadata() {
    const url = encodeURI(`documents/metadata`);
    return this.metadata ? of(this.metadata) : this.firestore.get(url).pipe(
      map(({ documents }) => documents.map((item: any) => ({ ...item.fields }))),
      tap(doc => this.setMetadata(doc[0])));
  }
}
