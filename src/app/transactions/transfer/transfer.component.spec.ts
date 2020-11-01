import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Transaction } from 'src/app/shared/model';
import { TransferComponent } from './transfer.component';

const trasactionMock: Transaction = {
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
};

@Component({
  selector: 'app-transfer-test',
  template: `
    <app-transfer [transaction]="transactionMock"></app-transfer>
  `,
  styleUrls: ['./transfer.component.css']
})
class TestTransferComponent implements AfterViewInit {
  transactionMock = trasactionMock;

  @ViewChild(TransferComponent)
  testComponent: TransferComponent;

  ngAfterViewInit(): void { }
}

describe('TransferComponent', () => {
  let component: TestTransferComponent;
  let fixture: ComponentFixture<TestTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTransferComponent, TransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get formattedDate()', () => {
    component.ngAfterViewInit();
    expect(component.testComponent.formattedDate).toEqual('Sep 19');
  });

  it('should get merchant()', () => {
    component.ngAfterViewInit();
    expect(component.testComponent.merchant).toEqual(trasactionMock.merchant.name);
  });

  it('should get filename()', () => {
    component.ngAfterViewInit();
    expect(component.testComponent.filename).toEqual('backbase');
  });

  it('should get payment()', () => {
    component.ngAfterViewInit();
    expect(component.testComponent.payment).toEqual('Salaries');
  });

  it('should get amount()', () => {
    component.ngAfterViewInit();
    expect(component.testComponent.amount).toEqual('$5,000');
  });
});
