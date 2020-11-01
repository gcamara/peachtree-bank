import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css']
})
export class FormFieldComponent implements OnInit {

  /** The label above the input field */
  @Input()
  label: string;

  /** The control of the input */
  @Input()
  control: FormControl;

  /** The input type */
  @Input()
  type = 'text';

  /** The input placeholder */
  @Input()
  placeholder = '';

  /** The prefix of the input */
  @Input()
  prefix = '';

  constructor() { }

  ngOnInit(): void {
  }

}
