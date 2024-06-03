import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-welcome',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-welcome.component.html',
  styleUrl: './header-welcome.component.scss',
})
export class HeaderWelcomeComponent {}
