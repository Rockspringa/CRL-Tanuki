import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CodemirrorModule } from "@ctrl/ngx-codemirror";
import { FormsModule } from "@angular/forms";

import { CodeEditorRoutingModule } from "./code-editor-routing.module";
import { CodeEditorComponent } from "./code-editor.component";
import { TabComponent } from "./tab/tab.component";
import { EditorComponent } from "./editor/editor.component";
import { TabsComponent } from "./tabs/tabs.component";
import { RedirectButtonsComponent } from "./redirect-buttons/redirect-buttons.component";
import { OpenedTabsService } from "../services/opened-tabs.service";
import { BuildService } from "../services/build.service";

@NgModule({
  declarations: [
    CodeEditorComponent,
    TabComponent,
    EditorComponent,
    TabsComponent,
    RedirectButtonsComponent,
  ],
  imports: [
    CommonModule,
    CodeEditorRoutingModule,
    CodemirrorModule,
    FormsModule,
  ],
  providers: [OpenedTabsService, BuildService],
  exports: [RedirectButtonsComponent],
})
export class CodeEditorModule {}
