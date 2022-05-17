"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoGraphics = void 0;
class InfoGraphics {
    constructor() {
        this.graphs = [];
    }
    getGraphs() {
        return this.graphs.map((graph) => Object.assign({}, graph));
    }
    addGraph(data) {
        this.graphs.push(data);
    }
}
exports.InfoGraphics = InfoGraphics;
//# sourceMappingURL=images.js.map