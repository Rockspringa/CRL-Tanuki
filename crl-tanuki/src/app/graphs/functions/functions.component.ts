import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FunctionTree} from "@crl-rocks/crl-compiler";

@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrls: ['./functions.component.css']
})
export class FunctionsComponent implements OnInit {
  @Input() id!: string;
  @Input() index!: number;
  @Input() functions!: FunctionTree;
  @Output() downloadGraph = new EventEmitter<never>();

  constructor() { }

  ngOnInit(): void {
  }

  getId(index: number): string {
    return `${this.functions.functionName}-${index}-${this.index}`;
  }
}
