import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderWelcomeComponent } from '../../../../Shared/HeaderWelcome/header-welcome/header-welcome.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink, HeaderWelcomeComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {}
