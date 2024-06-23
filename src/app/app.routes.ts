import { Routes } from '@angular/router';
import { ProtectedRoutesService } from './Services/ProtectedRoutes/protected-routes.service';

export const routes: Routes = [
  {
    path: 'welcome',
    loadComponent: () =>
      import('./Pages/Welcome/Page/Welcome/welcome.component').then(
        (m) => m.WelcomeComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./Pages/Login/Page/Login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./Pages/Register/Page/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./Pages/Home/Page/home/home.component').then(
        (m) => m.HomeComponent
      ),
    // canActivate: [ProtectedRoutesService],
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
];
