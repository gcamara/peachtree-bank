import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transfer, UserAccount } from '../shared/model';
import { UserService } from '../shared/user/user-service.service';
import { Utils } from '../shared/utils';

@Component({
  selector: 'app-make-transfer',
  templateUrl: './make-transfer.component.html',
  styleUrls: ['./make-transfer.component.css']
})
export class MakeTransferComponent implements OnInit {

  /** The transfer Form */
  transferForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
              public userService: UserService) { }

  ngOnInit(): void {
    this.transferForm = this.fb.group({
      from: [{ value: '', disabled: true }],
      to: ['', Validators.required],
      amount: ['', Validators.required]
    });

    this.transferForm.controls.from.disable();

    this.userService.getAccount()
      .subscribe((data: UserAccount) => {
        this.transferForm.patchValue({
          from: `${data.description} - $${Utils.formatAmount(data.balance)}`
        });
      });

  }

  /** Validates the form and display the preview */
  onSubmit(): void {
    this.transferForm.markAllAsTouched();
    if (this.transferForm.valid) {
      this.submitted = true;
    }
  }

  /** Perform a transfer and resets the form */
  onSubmitted(): void {
    this.userService
      .transfer(this.data)
      .subscribe(() => {
        this.controls.amount.setValue('');
        this.controls.to.setValue('');
        this.transferForm.markAsUntouched();
      });
  }

  /** Check whether the amount field is fulfilled */
  hasAmount(): boolean {
    const amount = parseFloat(this.controls.amount.value);
    if (isNaN(amount)) {
      return false;
    }
    return amount > 0;
  }

  /** Hide the transfer preview */
  onCancelTransfer(): void {
    this.submitted = false;
  }

  /** Front-end validation to check if the user has enough money */
  canTransfer(): boolean {
    this.controls.amount.setErrors(null);
    const remaining = this.userService.getAccount().getValue().balance - parseFloat(this.controls.amount.value);
    if (remaining < -500) {
      this.controls.amount.setErrors({ cantTransfer: true });
    }
    return remaining > -500;
  }

  /** Returns the amount formatted */
  get amount(): string {
    return Utils.formatAmount(this.controls.amount.value);
  }

  /**
   * Gets the data from the form.
   */
  get data(): Transfer {
    return this.transferForm?.value;
  }

  /**
   * Gets the controls to evaluate on the template.
   */
  get controls(): { [key: string]: AbstractControl } {
    return this.transferForm?.controls;
  }

}
