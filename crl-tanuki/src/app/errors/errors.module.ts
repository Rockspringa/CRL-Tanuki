import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorsRoutingModule } from './errors-routing.module';
import { ErrorsComponent } from './errors.component';
import { SingleErrorComponent } from './single-error/single-error.component';
import {CodeEditorModule} from "../code-editor/code-editor.module";


@NgModule({
  declarations: [ErrorsComponent, SingleErrorComponent],
  imports: [CommonModule, ErrorsRoutingModule, CodeEditorModule],
})
export class ErrorsModule {}
