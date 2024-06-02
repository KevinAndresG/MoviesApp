import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../Components/Header/header/header.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink, HeaderComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {}
