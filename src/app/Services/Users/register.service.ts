import { Injectable } from '@angular/core';
import { User } from '../../Models/user.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor() {}

  registerUser(user: User): string {
    try {
      if ('user' in localStorage) {
        let savedUser: User[] = JSON.parse(
          localStorage.getItem('user')!
        ) as User[];
        savedUser.push(user);
        localStorage.setItem('user', JSON.stringify(savedUser));
      } else {
        localStorage.setItem('user', JSON.stringify([user]));
      }
      return '200';
    } catch (error) {
      return '500';
    }
  }
}
