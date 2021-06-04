import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirestoreService } from 'firestore';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  userForm!: FormGroup;
  loading$ = new BehaviorSubject<boolean>(false);

  constructor(private fb: FormBuilder, private firestore: FirestoreService, private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }

  login() {
    const form = this.userForm.value;
    return this.firestore.signIn(form.email, form.password).pipe(
      tap((resp: any) => this.firestore.setIdToken(resp.idToken)),
      tap(_ => this.router.navigate(['active-trade'])),
    ).subscribe();
  }

  buildForm(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.pattern('^(!?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(6),
          Validators.maxLength(25)
        ]
      ]
    });
  }

}
