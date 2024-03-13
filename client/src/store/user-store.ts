import { makeAutoObservable } from 'mobx';
import { AuthStatus } from '../utils/const';

export class UserStore {
  authStatus: AuthStatus = AuthStatus.NotAuth;
  constructor() {
    makeAutoObservable(this);
  }
  setAuthStatus(status: AuthStatus) {
    this.authStatus = status;
  }
  getAuthStatus() {
    return this.authStatus;
  }
}
