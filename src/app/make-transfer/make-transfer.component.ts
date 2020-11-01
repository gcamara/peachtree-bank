import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transfer } from '../shared/model';
import { UserService } from '../shared/user/user-service.service';

@Component({
  selector: 'app-make-transfer',
  templateUrl: './make-transfer.component.html',
  styleUrls: ['./make-transfer.component.css']
})
export class MakeTransferComponent implements OnInit {

  /** The transfer Form */
  transferForm: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService) { }

  ngOnInit(): void {
    const initialValue = this.userService.getAccount().value;
    const { amount, description } = initialValue;

    this.transferForm = this.fb.group({
      from: [{ value: `${description} - $${amount}`, disabled: true}],
      to: ['', Validators.required],
      amount: ['', Validators.required]
    });
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
