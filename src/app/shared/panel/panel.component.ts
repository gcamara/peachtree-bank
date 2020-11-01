import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  /** The icon to appear on the beggining of the panel. */
  @Input()
  icon: string;

  constructor() { }

  ngOnInit(): void {
  }

}
