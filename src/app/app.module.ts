import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FirestoreModule } from 'firestore';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './core/services/user.service';
import { AuthGuard } from './core/guards/auth.guard';

export function loadUser(userService: UserService) {
  return () => {
    return userService.loadUser()
  };
}

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'recent-trade',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./recent-trade/recent-trade.module').then(m => m.RecentTradeModule)
  },
  {
    path: 'history',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./history/history.module').then(m => m.HistoryModule)
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,

    // TODO
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,

    FirestoreModule.forRoot({
      apiKey: environment.firebaseConfig.apiKey,
      projectId: environment.firebaseConfig.projectId
    }),

    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadUser,
      deps: [UserService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
