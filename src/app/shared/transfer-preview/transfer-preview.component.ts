import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-transfer-preview',
  templateUrl: './transfer-preview.component.html',
  styleUrls: ['./transfer-preview.component.css']
})
export class TransferPreviewComponent implements OnInit {

  @HostBinding('class.show')
  @Input()
  show: boolean;

  @Output()
  cancelHandler = new EventEmitter<boolean>();

  @Output()
  submitHandler = new EventEmitter<any>();

  confirmed: boolean;

  @Input()
  toAccount: string;

  @Input()
  amount: string;


  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Emit that the user confirmed the transfer.
   */
  onConfirm(): void {
    this.confirmed = true;
    this.submitHandler.emit();

    setTimeout(() => {
      this.cancelHandler.emit();
      this.confirmed = false;
    }, 500);
  }

  /**
   * Emit that the user cancel the transfer.
   */
  onCancel(): void {
    this.confirmed = false;
    this.cancelHandler.emit();
  }

}
