import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ConsoleService {
  private readonly messages: string[] = [];

  constructor() {}

  postConsoleOutput(messages: string[]): void {
    this.messages.length = 0;
    this.messages.push(...messages);
  }

  getConsole(): string {
    return this.messages.map(msg => `> ${msg}`).join("\n");
  }
}
