import { Component, Input, OnInit } from "@angular/core";
import { RedirectBtnModel } from "../../../model/redirect-btn.model";

@Component({
  selector: "app-redirect-buttons",
  templateUrl: "./redirect-buttons.component.html",
  styleUrls: ["./redirect-buttons.component.css"],
})
export class RedirectButtonsComponent implements OnInit {
  @Input() show: boolean = true;
  @Input() dataBunch: RedirectBtnModel[] = [];
  @Input() elseData: RedirectBtnModel[] = [];

  constructor() {}

  ngOnInit(): void {}
}
