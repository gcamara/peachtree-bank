import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Transaction, Transfer, UserAccount } from '../model';
import { TransactionsService } from '../transactions/transactions.service';

/**
 * The initial value for this account; assuming we don't have a backend to retrieve this data.
 */
const startUserAccount = { description: 'Free Checking(4692)', balance: 5824.76 };

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userAccount$ = new BehaviorSubject<UserAccount>(startUserAccount);

  constructor(public transactionService: TransactionsService) { }

  /**
   * Make a transfer to a given account.
   * @param amount the amount to be transfered.
   */
  transfer(transfer: Transfer): Observable<boolean> {
    return new Observable((observer) => {

      // Simulates a backend validation.
      if (this.userAccount$.getValue().balance - transfer.amount < -500) {
        observer.error(`You don't have enough money.`);
      }

      // Deep copy using JSON trick (only recommended in this case because it's a simple case).
      const transactions: Transaction[] = JSON.parse(JSON.stringify(this.transactionService.getTransactions().getValue()));
      transactions.push({
        dates: {
          valueDate: new Date().getTime()
        },
        transaction: {
          amountCurrency: {
            amount: transfer.amount,
            currencyCode: 'EUR'
          },
          creditDebitIndicator: 'DBIT',
          type: 'Online Transfer'
        },
        merchant: {
          name: transfer.to,
          accountNumber: null
        }
      });

      this.transactionService.getTransactions().next(transactions);
      this.userAccount$.next({
        ...this.userAccount$.value,
        balance: this.userAccount$.value.balance - transfer.amount
      });
      observer.next(true);
    });
  }

  /**
   * Return the subject of the current user account to watch changes.
   */
  getAccount(): BehaviorSubject<UserAccount> {
    return this.userAccount$;
  }
}
