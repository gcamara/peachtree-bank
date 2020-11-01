import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserAccount } from '../model';

/**
 * The initial value for this account; assuming we don't have a backend to retrieve this data.
 */
const startUserAccount = { description: 'Free Checking(4692)', amount: 5824.76 };

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userAccount$ = new BehaviorSubject<UserAccount>(startUserAccount);

  constructor() { }

  /**
   * Make a transfer to a given account.
   * @param amount the amount to be transfered.
   */
  transfer(amount: number): void {

  }

  /**
   * Return the subject of the current user account to watch changes.
   */
  getAccount(): BehaviorSubject<UserAccount> {
    return this.userAccount$;
  }
}
