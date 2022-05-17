export class ConsoleOutput {
  private messages: string[] = [];

  getOutput(): string[] {
    return [...this.messages];
  }

  addMessage(data: string) {
    this.messages.push(data);
  }
}
