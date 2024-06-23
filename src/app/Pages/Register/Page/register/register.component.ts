import { Component, signal } from '@angular/core';
import { HeaderWelcomeComponent } from '../../../../Shared/HeaderWelcome/header-welcome/header-welcome.component';
import { RouterLink } from '@angular/router';
import { RegisterService } from '../../../../Services/Users/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertComponent } from '../../../../Shared/Alert/alert/alert.component';
import {
  AlertPositionX,
  AlertPositionY,
  AlertProps,
  AlertType,
} from '../../../../Models/alert.model';
import { UserTypeValidation } from '../../../../Models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HeaderWelcomeComponent, RouterLink, FormsModule, AlertComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {}

  showError = signal({ Email: false, Password: false, Message: '' });
  alertType = signal(AlertType);
  alertPositionX = signal(AlertPositionX);
  alertPositionY = signal(AlertPositionY);
  alertInfo = signal<AlertProps>({
    showAlert: false,
    title: '',
    description: '',
    type: this.alertType().Success,
    controled: false,
    cancelBtn: false,
    confirmBtn: false,
    delay: 1000,
    x: AlertPositionX.Right,
    y: AlertPositionY.Top,
  });
  userToCreate = signal({
    Email: '',
    Password: '',
    conf: '',
  });

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

  inputClicked(input: string) {
    switch (input) {
      case 'email':
        this.showError.update((state) => ({
          ...state,
          Email: false,
          Message: '',
        }));
        break;
      case 'pass':
        this.showError.update((state) => ({
          ...state,
          Password: false,
          Message: '',
        }));
        break;
      case 'conf':
        this.showError.update((state) => ({
          ...state,
          Password: false,
          Message: '',
        }));
        break;
      default:
        break;
    }
  }
  async registerUser() {
    if (
      this.userToCreate().Email === '' ||
      this.userToCreate().Password === '' ||
      this.userToCreate().conf === ''
    ) {
      this.alertInfo.set({
        showAlert: true,
        title: 'Error',
        description: 'Please fill in all fields',
        type: this.alertType().Error,
        controled: false,
        cancelBtn: false,
        confirmBtn: false,
        delay: 2000,
        x: AlertPositionX.Right,
        y: AlertPositionY.Top,
      });
      return;
    }
    if (this.userToCreate().conf !== this.userToCreate().Password) {
      this.alertInfo.set({
        showAlert: true,
        title: 'Error',
        description: 'Passwords do not match',
        type: this.alertType().Error,
        controled: false,
        cancelBtn: false,
        confirmBtn: false,
        delay: 2000,
        x: AlertPositionX.Right,
        y: AlertPositionY.Top,
      });
      return;
    } else {
      const response = await this.registerService.CreateUser(
        this.userToCreate()
      );
      console.log('This Is  response:', response);
      if (response.accessToken) {
        this.userToCreate.set({ Email: '', Password: '', conf: '' });
        localStorage.setItem('currentUser', JSON.stringify(response));
        localStorage.setItem('token', JSON.stringify(response.accessToken));
        this.router.navigate(['/home']);
        if (response === '200') {
          this.alertInfo.set({
            showAlert: true,
            title: 'User Created With success',
            description: 'You can now log in',
            type: this.alertType().Success,
            controled: false,
            cancelBtn: false,
            confirmBtn: false,
            delay: 2000,
            x: AlertPositionX.Right,
            y: AlertPositionY.Top,
          });
          this.userToCreate.set({
            Email: '',
            Password: '',
            conf: '',
          });
        }
      } else {
        this.handleError(response);
      }
    }
  }
  alertShow() {
    this.registerUser();
  }
}
