import { Component, OnInit } from "@angular/core";
import { AnalyzeError } from "@crl-rocks/crl-compiler";
import { ErrorsService } from "../services/errors.service";
import { RedirectBtnModel } from "../../model/redirect-btn.model";

@Component({
  selector: "app-errors",
  templateUrl: "./errors.component.html",
  styleUrls: ["./errors.component.css"],
})
export class ErrorsComponent implements OnInit {
  readonly refs: RedirectBtnModel[] = [
    { icon: "  Codigo ", url: "/code-editor" }
  ];

  errors: AnalyzeError[] = [];

  constructor(private errorsService: ErrorsService) {}

  ngOnInit(): void {
    this.errors = this.errorsService.getErrors();
  }
}
