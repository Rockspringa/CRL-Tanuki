import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GraphsRoutingModule } from "./graphs-routing.module";
import { GraphsComponent } from "./graphs.component";
import { FunctionAstComponent } from "./function-ast/function-ast.component";
import { FunctionsComponent } from "./functions/functions.component";
import { ExpressionsComponent } from "./expressions/expressions.component";
import { ScopeSymbolsComponent } from "./scope-symbols/scope-symbols.component";
import { CodeEditorModule } from "../code-editor/code-editor.module";
import { SymbolComponent } from "./symbol/symbol.component";

@NgModule({
  declarations: [
    GraphsComponent,
    FunctionAstComponent,
    FunctionsComponent,
    ExpressionsComponent,
    ScopeSymbolsComponent,
    SymbolComponent,
  ],
  imports: [CommonModule, GraphsRoutingModule, CodeEditorModule],
})
export class GraphsModule {}
