import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ConsoleRoutingModule } from "./console-routing.module";
import { ConsoleComponent } from "./console.component";
import { CodeEditorModule } from "../code-editor/code-editor.module";

@NgModule({
  declarations: [ConsoleComponent],
  imports: [CommonModule, ConsoleRoutingModule, CodeEditorModule],
})
export class ConsoleModule {}
