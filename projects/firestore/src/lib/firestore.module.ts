import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreConfig } from './firestore-config';
import { FirestoreService, FirestoreConfigService } from './firestore.service';

@NgModule({
  imports: [CommonModule]
})
export class FirestoreModule {
  static forRoot(config: FirestoreConfig): ModuleWithProviders<FirestoreModule> {
    return {
      ngModule: FirestoreModule,
      providers: [
        FirestoreService,
        {
          provide: FirestoreConfigService,
          useValue: config
        }
      ]
    };
  }
}
