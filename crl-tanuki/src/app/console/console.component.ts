import { Component, OnInit } from "@angular/core";
import { RedirectBtnModel } from "../../model/redirect-btn.model";
import {ConsoleService} from "../services/console.service";

@Component({
  selector: "app-console",
  templateUrl: "./console.component.html",
  styleUrls: ["./console.component.css"],
})
export class ConsoleComponent implements OnInit {
  readonly refs: RedirectBtnModel[] = [
    { icon: "  Codigo ", url: "/code-editor" },
    { icon: "  Graficas ", url: "/graphs" },
  ];

  console: string = "";

  constructor(private consoleService: ConsoleService) {}

  ngOnInit(): void {
    this.console = this.consoleService.getConsole();
  }
}
