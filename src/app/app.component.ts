import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  links = [{ label: 'Recent Trades', link: '/recent-trade' }, { label: 'Past Years', link: '/history' }];

  constructor(public userService: UserService, private router: Router) { }

  logout() {
    this.userService.removeUser();
    this.router.navigate(['/login']);
  }
}
