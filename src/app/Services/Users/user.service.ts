// External imports
import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';

// Own imports
import { UserType } from '../../Models/user.model';
import { FireBaseApp } from '../../../../FirebaseCredentials';
export const auth = getAuth(FireBaseApp);
auth.languageCode = 'it';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor() {}

  /**
   * Authenticates a user with the provided email and password.
   *
   * @param {UserType} user - The user object containing the email and password.
   * @return {Promise<User | string>} A promise that resolves to the authenticated user object if successful, or a string representing the error code if authentication fails.
   */
  Auth(user: UserType) {
    const currentUser = signInWithEmailAndPassword(
      auth,
      user.Email,
      user.Password
    )
      .then((resp) => {
        return resp.user;
      })
      .catch((error) => {
        return error.code;
      });
    return currentUser;
  }

  /**
   * Creates a new user with the provided user information.
   *
   * @param {UserType} user - The user object containing the email and password.
   * @return {Promise<AuthResult>} A promise that resolves to the created user object if successful,
   * or rejects with the error code if there was an error.
   */
  CreateUser(user: UserType) {
    const currentUser = createUserWithEmailAndPassword(
      auth,
      user.Email,
      user.Password
    )
      .then((resp) => {
        return resp.user;
      })
      .catch((error) => {
        return error.code;
      });
    return currentUser;
  }

  /**
   * Signs out the current user by removing the "currentUser" and "token" items from local storage and calling the signOut function.
   *
   * @return {Promise<void>} A promise that resolves when the sign-out is successful, or rejects with an error message if there is an error.
   */
  async SignOut() {
    try {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
      return await signOut(auth);
    } catch (error: any) {
      alert(error.message);
    }
  }

  /**
   * Sends a password reset email to the specified email address.
   *
   * @param {string} email - The email address to send the password reset email to.
   * @return {Promise<any>} A promise that resolves with the response from the password reset email request,
   * or rejects with the error code if there was an error.
   */
  RecoverPass(email: string) {
    const resp = sendPasswordResetEmail(auth, email)
      .then((resp) => {
        return resp;
      })
      .catch((error) => {
        return error.code;
      });
    return resp;
  }
}
