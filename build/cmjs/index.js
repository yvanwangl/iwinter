"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const path_1 = require("./decorators/path");
exports.Path = path_1.Path;
const http_method_1 = require("./decorators/http-method");
exports.GET = http_method_1.GET;
exports.POST = http_method_1.POST;
exports.PUT = http_method_1.PUT;
exports.DELETE = http_method_1.DELETE;
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