import { TestBed } from '@angular/core/testing';

import { TinkoffTransactionService } from './tinkoff-transaction.service';

describe('TinkoffTransactionService', () => {
  let service: TinkoffTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TinkoffTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
