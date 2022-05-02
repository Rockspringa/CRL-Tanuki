export class ConsoleOutput {
  messages: string[] = [];

  getOutput(): string[] {
    return this.messages.map((message: string) => Object.assign({}, message));
  }

  addMessage(data: string) {
    this.messages.push(data);
  }
}
