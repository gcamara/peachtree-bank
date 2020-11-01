import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TransactionsService } from './transactions.service';


describe('TransactionsService', () => {
  let service: TransactionsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(TransactionsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    const req = httpMock.expectOne('./assets/mock/transactions.json');
    expect(req.request.method).toEqual('GET');
    req.flush([]);

    httpMock.verify();
  });

  it('should getTransactions()', () => {
    expect(service.getTransactions().value.length).toEqual(0);
  });

});
