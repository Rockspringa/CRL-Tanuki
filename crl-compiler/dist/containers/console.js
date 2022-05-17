"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleOutput = void 0;
class ConsoleOutput {
    constructor() {
        this.messages = [];
    }
    getOutput() {
        return [...this.messages];
    }
    addMessage(data) {
        this.messages.push(data);
    }
}
exports.ConsoleOutput = ConsoleOutput;
//# sourceMappingURL=console.js.map