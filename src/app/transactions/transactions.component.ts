import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map } from 'rxjs/operators';
import { FilterOrder, SortFilter, sortFiltersTypes, Transaction } from '../shared/model';
import { TransactionsService } from '../shared/transactions/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit, OnDestroy {

  /** The filter control of the search field */
  filterControl: FormControl;

  /** The filtered transactions after user input */
  filteredTransactions: Transaction[];

  /** The transactions from the service */
  transactions$ = new BehaviorSubject<Transaction[]>([]);

  /** Subscriptions to unsubscribe onDestroy */
  transferSubscription: Subscription;
  transferServiceSubscription: Subscription;
  filterControlSubscription: Subscription;

  /** The user input */
  textFilter = '';

  /** Filter order */
  order: FilterOrder = 'ASC';

  /** Filter type */
  sortFilter: SortFilter = 'BENEFICIARY';

  /** Filter types to iterate over and create buttons */
  filterTypes = sortFiltersTypes;

  /** Subscribe to watch when the data changes */
  constructor(transactionsService: TransactionsService) {
    this.transferSubscription = this.transactions$
      .pipe(
        map((data: Transaction[]) => {
          /** This will guarantee that the last transfer appears on top on transfer event. */
          this.textFilter = '';
          this.sortFilter = 'DATE';
          this.order = 'DESC';
          return this.filterData(data);
        })
      )
      .subscribe(data => {
        this.filteredTransactions = data;
      });

    this.transferServiceSubscription = transactionsService.getTransactions()
      .subscribe(data => this.transactions$.next(data));
  }

  ngOnInit(): void {
    this.filterControl = new FormControl('');

    this.filterControlSubscription = this.filterControl.valueChanges
    .subscribe((text: string) => {
      this.textFilter = text;
      this.filteredTransactions = this.filterData(this.transactions$.getValue());
    });
  }

  /**
   * Filter data according to the selected filter and order.
   * It's used as arrow function to prevent the use of binding the "this"
   *
   * @param data The result to be filtered
   */
  filterData = (data: Transaction[]): Transaction[] => {
    let result = data;
    if (this.textFilter.length) {
      result = data.filter((transaction: Transaction) => {
        if (this.sortFilter === 'DATE') {
          return new Date(transaction.dates.valueDate).getTime() <= new Date(this.textFilter).getTime();
        }

        if (this.sortFilter === 'AMOUNT') {
          return transaction.transaction.amountCurrency.amount === parseFloat(this.textFilter);
        }

        if (this.sortFilter === 'BENEFICIARY') {
          return transaction.merchant.name.toLocaleLowerCase().includes(this.textFilter.toLocaleLowerCase());
        }
      });
    }

    /** Order after filter */
    result = this.orderData(result);
    return result;
  }

  /** Orders the data depending on the Order Type */
  orderData(data: Transaction[]): Transaction[] {
    return data.sort(this.compareFields);
  }

  /**
   * Compare check which filter is selected and compare fields based on it.
   *
   * @param transactionA The first transaction
   * @param transactionB The second transaction
   */
  compareFields = (transactionA: Transaction, transactionB: Transaction): number => {
    // Will change the order by multiplying
    const factor = this.order === 'ASC' ? -1 : 1;

    if (this.sortFilter === 'DATE') {
      const fieldA = new Date(transactionA.dates.valueDate);
      const fieldB = new Date(transactionB.dates.valueDate);

      if (fieldA.getTime() === fieldB.getTime()) {
        return 0;
      }
      return fieldA.getTime() < fieldB.getTime() ? -1 * factor : 1 * factor;
    }

    if (this.sortFilter === 'AMOUNT') {
      return factor * (transactionA.transaction.amountCurrency.amount - transactionB.transaction.amountCurrency.amount);
    }

    if (this.sortFilter === 'BENEFICIARY') {
      return factor * (transactionA.merchant.name.toLocaleLowerCase().localeCompare(transactionB.merchant.name.toLowerCase()));
    }

  }

  /**
   * Changes the filter type and perform a filter.
   * @param filter the SortFilter
   */
  changeFilterType(filter: SortFilter): void {
    if (filter === this.sortFilter) {
      this.order = this.order === 'ASC' ? 'DESC' : 'ASC';
    }
    this.sortFilter = filter;

    this.filteredTransactions = this.filterData(this.transactions$.getValue());
  }

  /**
   * Keeps track of the element on ngFor for performance purposes.
   * @param index the index
   * @param transaction the element
   */
  trackByMerchant(index: number, transaction: Transaction): string {
    return transaction?.merchant.name;
  }

  ngOnDestroy(): void {
    this.transferServiceSubscription.unsubscribe();
    this.transferSubscription.unsubscribe();
    this.filterControlSubscription.unsubscribe();
  }

  /** Gets the arrow direction depending on the current order. */
  get arrowDirection(): string {
    return this.order === 'ASC' ? 'up' : 'down';
  }

}
