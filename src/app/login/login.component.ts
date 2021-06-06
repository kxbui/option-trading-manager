import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirestoreService } from 'firestore';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  userForm!: FormGroup;
  loading$ = new BehaviorSubject<boolean>(false);

  constructor(private fb: FormBuilder, private firestore: FirestoreService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  login() {
    this.loading$.next(true);
    const form = this.userForm.value;
    return this.firestore.signIn(form.email, form.password).pipe(
      tap((resp: any) => this.userService.setUser(resp)),
      tap(_ => this.router.navigate(['active-trade'])),
      tap(_ => this.loading$.next(false)),
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
