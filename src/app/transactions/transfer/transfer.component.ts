import { Component, HostBinding, Input } from '@angular/core';
import { Color, Transaction } from 'src/app/shared/model';

const colors: Color[] = [
  { green: '#d51271' },
  { pink: '#d51271' },
  { emerald: '#12a580' },
  { red: '#c12020'},
  { orange: '#e25a2c'},
  { gold: '#c89616'},
  { yellow: '#fbbb1b' }
];

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent {

  @Input()
  transaction: Transaction;

  @HostBinding('style.borderLeftColor')
  color: string;

  constructor() {
    this.color = Object.values(colors[Math.floor(7 * Math.random())])[0];
  }

  /**
   * Returns the transaction date formatted to US Locale.
   */
  get formattedDate(): string {
    const date = new Date(this.transaction?.dates.valueDate);
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
  }

  /**
   * Returns the merchant name.
   */
  get merchant(): string {
    return this.transaction?.merchant.name ?? '';
  }

  /**
   * Returns the filename - in lowercase - and replaces all spaces for dashes.
   */
  get filename(): string {
    return this.merchant.toLowerCase().replace(/\s+/g, '-');
  }

  /**
   * Returns the payment type.
   */
  get payment(): string {
    return this.transaction?.transaction.type ?? '';
  }

  /**
   * Return the amount with currency formatted by Intl;
   */
  get amount(): string {
    const amount = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 })
      .format(this.transaction?.transaction.amountCurrency.amount ?? 0);
    const symbol = this.transaction.transaction.creditDebitIndicator === 'CRDT' ? '' : '-';
    return `${symbol}$${amount}`;
  }

}
