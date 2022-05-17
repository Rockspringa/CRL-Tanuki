import { Injectable } from "@angular/core";
import { TabModel } from "../../model/tab.model";
import { parse } from "@crl-rocks/crl-compiler";
import { ConsoleService } from "./console.service";
import { ErrorsService } from "./errors.service";
import { GraphsService } from "./graphs.service";

@Injectable({
  providedIn: "root",
})
export class BuildService {
  readonly ext = /\.crl$/;

  constructor(
    private errorsService: ErrorsService,
    private consoleService: ConsoleService,
    private graphsService: GraphsService
  ) {}

  private _successfulBuild?: boolean;

  get successfulBuild(): boolean | undefined {
    return this._successfulBuild;
  }

  buildCode(code: TabModel, files: TabModel[]) {
    if (!code.code) {
      alert(`El archivo principal ${code.name} esta vacio.`);
    } else if (
      !this.ext.test(code.name) ||
      !files.filter((file) => !this.ext.test(file.name))
    ) {
      alert(`No todos los archivos tienen extension '.crl'.`);
    } else {
      try {
        const output = parse(code.name, code.code, files);
        if (output.data) {
          this.consoleService.postConsoleOutput(output.data.console);
          this.graphsService.postGraphs(output.data.graphs);

          this._successfulBuild = true;
        } else if (output.errors) {
          this.errorsService.postErrors(output.errors);
          this._successfulBuild = false;
        }
        return;
      } catch (e: any) {
        alert(
          "Ocurrio un error irrecuperable al compilar el archivo principal, quedas por tu cuenta desde ahora.\n" +
            e.message
        );
      }
    }
    this._successfulBuild = undefined;
  }
}
