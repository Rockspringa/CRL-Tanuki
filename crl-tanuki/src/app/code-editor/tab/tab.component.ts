import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
})
export class TabComponent implements OnInit {
  @Input() tab!: string;
  @Input() active!: boolean;
  @Output() close = new EventEmitter<never>();

  constructor() {}

  ngOnInit(): void {}
}
