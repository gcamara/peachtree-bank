import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaction } from '../model';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  transactions$ = new BehaviorSubject<Transaction[]>([]);

  constructor(public http: HttpClient) {
    http.get('./assets/mock/transactions.json')
      .pipe(
        map((result: {data: Transaction[]}) => result.data)
      )
      .subscribe((data: Transaction[]) => this.transactions$.next(data));
  }

  /** Get the transactions to subscribe */
  getTransactions(): BehaviorSubject<Transaction[]> {
    return this.transactions$;
  }

}
