import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { MetadataService } from '../core/services/metadata.service';

@Injectable({
  providedIn: 'root'
})
export class RecentTradeResolver implements Resolve<any> {
  constructor(private metadataService: MetadataService ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.metadataService.getMetadata();
  }
}
