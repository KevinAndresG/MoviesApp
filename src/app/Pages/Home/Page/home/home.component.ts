import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../../../Services/Users/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private router: Router,
    private registerService: RegisterService
  ) {}
  logOut() {
    this.registerService.SignOut();
    this.router.navigate(['/login']);
  }
}
