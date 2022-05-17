import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import { ScopeSymbolsTable } from "@crl-rocks/crl-compiler";

@Component({
  selector: "app-scope-symbols",
  templateUrl: "./scope-symbols.component.html",
  styleUrls: ["./scope-symbols.component.css"],
})
export class ScopeSymbolsComponent implements OnInit {
  @Input() id!: string;
  @Input() scopeSymbols!: ScopeSymbolsTable;
  @Output() downloadGraph = new EventEmitter<never>();

  constructor() {}

  ngOnInit(): void {}
}
