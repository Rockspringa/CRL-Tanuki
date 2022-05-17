import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { BuildService } from "../../services/build.service";
import { RedirectBtnModel } from "../../../model/redirect-btn.model";
import { CodemirrorComponent } from "@ctrl/ngx-codemirror";
import {TabModel} from "../../../model/tab.model";

@Component({
  selector: "app-editor",
  templateUrl: "./editor.component.html",
  styleUrls: ["./editor.component.css"],
})
export class EditorComponent implements OnInit {
  @Input() tab!: TabModel;
  @Output() downloadFile = new EventEmitter<never>();
  @Output() buildCode = new EventEmitter<never>();

  line: number = 1;
  column: number = 1;
  options = {
    showCursorWhenSelecting: true,
    indentWithTabs: true,
    lineNumbers: true,
    dragDrop: false,
    tabSize: 4,
    theme: "ambiance",
    mode: "crl",
  };

  playClasses: string[] = [];
  successfulBuild?: boolean = undefined;
  readonly refsOnSucceed: RedirectBtnModel[] = [
    { icon: "  Consola ", url: "/console" },
    { icon: "  Graficas ", url: "/graphs" },
  ];
  readonly refsOnFail: RedirectBtnModel[] = [{ icon: "  Errores ", url: "/errors" }];

  @ViewChild(CodemirrorComponent, { static: false })
  codeMirror!: CodemirrorComponent;

  constructor(private buildService: BuildService) {}

  ngOnInit(): void {
    this.successfulBuild = undefined;
  }

  setCursorPosition(e: any) {
    this.line = e.getCursor().line + 1;
    this.column = e.getCursor().ch + 1;
  }

  delegateBuildCode() {
    this.buildCode.emit();
    this.successfulBuild = this.buildService.successfulBuild;
    if (this.successfulBuild !== undefined) {
      this.playClasses = ["with-state"];
      this.playClasses.push(this.successfulBuild ? "accepted" : "rejected");
    } else {
      this.playClasses = [];
    }
  }

  cleanClasses() {
    this.playClasses = [];
    this.successfulBuild = undefined;
  }

  ngAfterViewInit(): void {
    this.codeMirror.codeMirrorGlobal.defineSimpleMode("crl", {
      start: [
        { regex: /"[^"\n]+"/, token: "string" },
        { regex: /'([^'\n]|\\[^\n])'/, token: "atom" },
        { regex: /-?\d+(\.\d+)?/, token: "number" },
        {
          regex:
            /(Incerteza|Void|String|Int|Double|Char|Boolean|Si|Sino|Para|Mientras|Detener|Continuar|Retorno|true|false)\b/,
          token: "keyword",
        },
        {
          regex: /([a-zA-Z_$ñ][\wñ$]*)(\s*)(\()/,
          token: ["variable-2", null, "operator"],
        },
        {
          regex: /(Importar)(\b\s+)([a-zA-Z_$ñ][\wñ$]*\.[a-zA-Z_$ñ][\wñ$]*)/,
          token: ["keyword", null, "variable-2"],
        },
        { regex: /[a-zA-Z_$ñ][\wñ$]*/, token: "variable" },
        { regex: /'''/, token: "comment", next: "comment" },
        { regex: /!!.*/, token: "comment" },
        { regex: /[-+\/*=<>!~|&()]+/, token: "operator" },
      ],
      comment: [
        { regex: /'''/, token: "comment", next: "start" },
        { regex: /.|\s/, token: "comment" },
      ],
      meta: { lineComment: "!!" },
    } as any);
  }
}
