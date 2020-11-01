import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FormFieldComponent } from '../shared/form-field/form-field.component';
import { InputComponent } from '../shared/input/input.component';
import { Transfer, UserAccount } from '../shared/model';
import { PanelComponent } from '../shared/panel/panel.component';
import { TransferPreviewComponent } from '../shared/transfer-preview/transfer-preview.component';
import { UserService } from '../shared/user/user-service.service';
import { MakeTransferComponent } from './make-transfer.component';

const dummyData: Transfer = {
  to: 'Dummy Account',
  amount: 123
};

const dummyAccount$ = new BehaviorSubject<UserAccount>({
  balance: 5700,
  description: 'Dummy User Account'
});

const mockUserService = {
  getAccount: (): BehaviorSubject<UserAccount> => dummyAccount$,
  transfer: (transfer: Transfer): Observable<boolean> => of(true)
};

describe('MakeTransferComponent', () => {
  let component: MakeTransferComponent;
  let fixture: ComponentFixture<MakeTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MakeTransferComponent, FormFieldComponent, InputComponent, PanelComponent, TransferPreviewComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [{
        provide: UserService, useValue: mockUserService
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should onSubmit()', () => {
    spyOn(component.transferForm, 'markAllAsTouched');
    component.transferForm.patchValue({
      to: 'Dummy Account',
      amount: '123'
    });

    component.onSubmit();
    expect(component.transferForm.markAllAsTouched).toHaveBeenCalled();

    expect(component.submitted).toBe(true, 'on form submit');
  });

  it('should not onSubmit()', () => {
    spyOn(component.transferForm, 'markAllAsTouched');
    component.onSubmit();
    expect(component.transferForm.markAllAsTouched).toHaveBeenCalled();

    expect(component.submitted).toBe(false, 'on form submit');
  });

  it('should check if hasAmount()', () => {
    component.transferForm.patchValue(dummyData);
    expect(component.hasAmount()).toBeTrue();
  });

  it('should check if not hasAmount()', () => {
    component.transferForm.patchValue({ amount: 0 });
    expect(component.hasAmount()).toBeFalse();
  });

  it('should perform onSubmitted()', () => {
    component.transferForm.patchValue(dummyData);
    spyOn(component.userService, 'transfer').and.returnValue(of(true));
    component.onSubmitted();
    expect(component.userService.transfer).toHaveBeenCalledWith(dummyData);
  });

  it('should check if canTransfer()', () => {
    component.transferForm.patchValue(dummyData);
    expect(component.canTransfer()).toBe(true, 'on user can transfer');
    expect(component.controls.amount.errors).toEqual(null, 'on user input has no errors');
  });

  it('should check if not canTransfer()', () => {
    component.transferForm.patchValue({ amount: 8000 });
    expect(component.canTransfer()).toBe(false, `on user can't transfer`);
    expect(component.controls.amount.errors).toEqual({ cantTransfer: true }, 'on user input has errors');
  });

  it('should check get amount()', () => {
    component.transferForm.patchValue({ amount: 8000.3231 });
    expect(component.amount).toEqual('8,000.32');
  });

  it('should get data()', () => {
    component.transferForm.patchValue(dummyData);
    expect(component.data).toEqual(dummyData);
  });
});
