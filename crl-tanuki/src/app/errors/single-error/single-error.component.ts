import { Component, Input, OnInit } from "@angular/core";
import { AnalyzeError, ErrorType } from "@crl-rocks/crl-compiler";

@Component({
  selector: "[app-single-error]",
  templateUrl: "./single-error.component.html",
  styleUrls: ["./single-error.component.css"],
})
export class SingleErrorComponent implements OnInit {
  @Input() error!: AnalyzeError;
  Error = ErrorType;

  constructor() {}

  ngOnInit(): void {}
}
