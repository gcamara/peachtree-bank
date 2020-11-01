import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  /** The control of the input. */
  @Input()
  control: FormControl;

  /** The input type. */
  @Input()
  type: string;

  /** The prefix of the input. */
  @Input()
  prefix: string;

  /** The input placeholder. */
  @Input()
  placeholder: string;

  constructor() { }

  ngOnInit(): void {
  }

  clearInputField(): void {
    this.control?.patchValue('');
  }

}
