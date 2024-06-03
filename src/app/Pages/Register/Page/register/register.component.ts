import { Component, signal } from '@angular/core';
import { HeaderWelcomeComponent } from '../../../../Shared/HeaderWelcome/header-welcome/header-welcome.component';
import { RouterLink } from '@angular/router';
import { RegisterService } from '../../../../Services/Users/register.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertComponent } from '../../../../Shared/Alert/alert/alert.component';
import {
  AlertPositionX,
  AlertPositionY,
  AlertProps,
  AlertType,
} from '../../../../Models/alert.model';

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
  inputSelected = signal('');
  userToCreate = signal({
    name: '',
    email: '',
    password: '',
    conf: '',
  });
  inputClicked(input: string) {
    this.inputSelected.set(input);
  }
  goDown() {
    this.inputSelected.set('');
  }
  registerUser() {
    if (
      this.userToCreate().name === '' ||
      this.userToCreate().email === '' ||
      this.userToCreate().password === '' ||
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
    if (this.userToCreate().conf !== this.userToCreate().password) {
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
      const response = this.registerService.registerUser({
        name: this.userToCreate().name,
        email: this.userToCreate().email,
        password: this.userToCreate().password,
      });
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
          name: '',
          email: '',
          password: '',
          conf: '',
        });
      } else {
        this.alertInfo.set({
          showAlert: true,
          title: 'Error',
          description: 'Error creating user',
          type: this.alertType().Error,
          controled: false,
          cancelBtn: false,
          confirmBtn: false,
          delay: 2000,
          x: AlertPositionX.Right,
          y: AlertPositionY.Top,
        });
      }
    }
  }
  alertShow() {
    this.registerUser();
  }
}
