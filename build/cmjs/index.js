"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
class Winter {
    constructor(options) {
        let { engine, router, dir } = options;
        if (!engine) {
            console.error('Please config an engine "Express" | "Koa"');
        }
        let WinterEngine = require(`./engines/${engine.toLowerCase()}Engine.ts`).default;
        return new WinterEngine(router, dir).controller();
    }
}
exports.default = Winter;
//# sourceMappingURL=index.js.map