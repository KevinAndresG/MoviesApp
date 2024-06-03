import { Component, signal } from '@angular/core';
import { User, UserLogin } from '../../../../Models/user.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderWelcomeComponent } from '../../../../Shared/HeaderWelcome/header-welcome/header-welcome.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HeaderWelcomeComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private router: Router) {}
  user = signal<UserLogin>({ email: '', password: '' });
  getUserList() {
    if ('user' in localStorage) {
      let usersList: User[] = JSON.parse(localStorage.getItem('user')!);
      for (const [i, user] of Object.values(usersList).entries()) {
        if (
          user.email === this.user().email &&
          user.password === this.user().password
        ) {
          this.router.navigate(['/home']);
          break;
        }
        if (i === Object.keys(usersList).length - 1) {
          alert('Email or password is incorrect');
        }
      }
    }
  }
}
