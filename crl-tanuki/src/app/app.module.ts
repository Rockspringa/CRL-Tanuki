import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ConsoleService } from "./services/console.service";
import { ErrorsService } from "./services/errors.service";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ConsoleService, ErrorsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
