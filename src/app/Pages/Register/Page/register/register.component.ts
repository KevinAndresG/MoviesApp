import { Component, signal } from '@angular/core';
import { HeaderWelcomeComponent } from '../../../../Shared/HeaderWelcome/header-welcome/header-welcome.component';
import { RouterLink } from '@angular/router';
import { RegisterService } from '../../../../Services/Users/register.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HeaderWelcomeComponent, RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {}
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
      alert('Please fill in all fields');
      return;
    }
    if (this.userToCreate().conf !== this.userToCreate().password) {
      alert('password and confirm password are not the same');
      return;
    } else {
      const response = this.registerService.registerUser({
        name: this.userToCreate().name,
        email: this.userToCreate().email,
        password: this.userToCreate().password,
      });
      if (response === '200') {
        alert('user created');
        this.router.navigate(['/login']);
      } else alert('user already exists');
    }
  }
}
