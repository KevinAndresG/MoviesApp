import { Component, signal } from '@angular/core';
import { UserType, UserTypeValidation } from '../../../../Models/user.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderWelcomeComponent } from '../../../../Shared/HeaderWelcome/header-welcome/header-welcome.component';
import { RegisterService } from '../../../../Services/Users/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HeaderWelcomeComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private router: Router,
    private registerService: RegisterService
  ) {}
  user = signal<UserType>({ Email: '', Password: '' });
  showError = signal({ Email: false, Password: false, Message: '' });

  handleError(errorType: string) {
    const errorMap: Record<string, UserTypeValidation> = {
      'auth/invalid-email': {
        Email: true,
        Password: false,
        Message: errorType.split('/')[1],
      },
      'auth/user-not-found': {
        Email: true,
        Password: false,
        Message: errorType.split('/')[1],
      },
      'auth/wrong-password': {
        Password: true,
        Email: false,
        Message: errorType.split('/')[1],
      },
      'auth/email-already-in-use': {
        Email: true,
        Password: false,
        Message: errorType.split('/')[1],
      },
      'auth/weak-password': {
        Password: true,
        Email: false,
        Message: errorType.split('/')[1],
      },
      'auth/invalid-credential': {
        Password: true,
        Email: false,
        Message: errorType.split('/')[1],
      },
      'auth/missing-password': {
        Password: true,
        Email: false,
        Message: errorType.split('/')[1],
      },
    };
    this.showError.set(errorMap[errorType]);
  }
  async login() {
    const response = await this.registerService.Auth(this.user());
    if (response.accessToken) {
      this.user.set({ Email: '', Password: '' });
      localStorage.setItem('currentUser', JSON.stringify(response));
      localStorage.setItem('token', JSON.stringify(response.accessToken));
      this.router.navigate(['/home']);
    } else {
      this.handleError(response);
    }
  }
}
