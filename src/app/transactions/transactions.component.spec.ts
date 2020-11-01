import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '../shared/form-field/form-field.component';
import { InputComponent } from '../shared/input/input.component';
import { Transaction } from '../shared/model';
import { PanelComponent } from '../shared/panel/panel.component';
import { TransactionsComponent } from './transactions.component';
import { TransferComponent } from './transfer/transfer.component';

const dummyTransactions: Transaction[] = [
  {
    categoryCode: '#12a580',
    dates: {
      valueDate: 1600387200000
    },
    transaction: {
      amountCurrency: {
        amount: 82.02,
        currencyCode: 'EUR'
      },
      type: 'Card Payment',
      creditDebitIndicator: 'DBIT'
    },
    merchant: {
      name: 'The Tea Lounge',
      accountNumber: 'SI64397745065188826'
    }
  },
  {
    categoryCode: '#12a580',
    dates: {
      valueDate: 1600493600000
    },
    transaction: {
      amountCurrency: {
        amount: 5000,
        currencyCode: 'EUR'
      },
      type: 'Salaries',
      creditDebitIndicator: 'CRDT'
    },
    merchant: {
      name: 'Backbase',
      accountNumber: 'SI64397745065188826'
    }
  }
];

const dummyCopy = dummyTransactions.slice();

describe('TransactionsComponent', () => {
  let component: TransactionsComponent;
  let fixture: ComponentFixture<TransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionsComponent, FormFieldComponent, InputComponent, TransferComponent, PanelComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filterData()', () => {
    const data = component.filterData(dummyTransactions);
    expect(data).toEqual(dummyCopy.slice().reverse(), 'on initial setup - Filter: DATE / Order: DESC');
  });

  it('should orderData()', () => {
    expect(component.orderData(dummyTransactions)).toEqual(dummyCopy.slice().reverse(), 'on initial setup');
  });

  it('should changeFilterType()', () => {
    expect(component.sortFilter).toEqual('DATE');
    expect(component.order).toEqual('DESC');

    component.changeFilterType('AMOUNT');
    expect(component.sortFilter).toEqual('AMOUNT');
    expect(component.order).toEqual('DESC');
    component.changeFilterType('AMOUNT');
    expect(component.order).toEqual('ASC');
  });

  it('should get arrowDirection()', () => {
    expect(component.arrowDirection).toEqual('up');
    component.order = 'ASC';
    expect(component.arrowDirection).toEqual('down');
  });
});
