import { Component, Input, OnInit } from '@angular/core';
import { Symbol, Type, CrlType, CrlBool } from "@crl-rocks/crl-compiler";

@Component({
  selector: '[app-symbol]',
  templateUrl: './symbol.component.html',
  styleUrls: ['./symbol.component.css']
})
export class SymbolComponent implements OnInit {
  @Input() symbol!: Symbol;

  constructor() { }

  ngOnInit(): void {
  }

  getType(data: CrlType): string {
    return Type[data.type];
  }

  getData(data: CrlType): string {
    return data instanceof CrlBool ? `${!!data.value}` : data.toString();
  }
}
