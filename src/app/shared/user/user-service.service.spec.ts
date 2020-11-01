import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Transfer } from '../model';
import { TransactionsService } from '../transactions/transactions.service';
import { UserService } from './user-service.service';


describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransactionsService]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not transfer()', () => {
    const dummyTransfer: Transfer = { amount: 10000, to: 'Dummy Beneficiary' };
    const transfer = service.transfer(dummyTransfer);
    transfer.subscribe(
      () => fail(),
      (error) => {
        expect(error).toEqual(`You don't have enough money.`);
      });
  });

  it('should transfer()', () => {
    const dummyTransfer: Transfer = { amount: 824.76, to: 'Dummy Beneficiary' };
    const transfer = service.transfer(dummyTransfer);
    transfer.subscribe(() => {
      expect(service.getAccount().value.balance).toEqual(5000);
      expect(service.transactionService.getTransactions().value.length).toEqual(1);
    });
  });
});

