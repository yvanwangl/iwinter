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
const param_1 = require("./decorators/param");
exports.PathParam = param_1.PathParam;
exports.QueryParam = param_1.QueryParam;
exports.BodyParam = param_1.BodyParam;
exports.ReqParam = param_1.ReqParam;
exports.ResParam = param_1.ResParam;
exports.CtxParam = param_1.CtxParam;
exports.NextParam = param_1.NextParam;
exports.OriginParam = param_1.OriginParam;
class IWinter {
    constructor(options) {
        let { engine, router, dir, prefix } = options;
        if (!engine) {
            console.error('Please config an engine "Express" | "Koa"');
        }
        this.router = router;
        this.dir = dir;
        this.prefix = prefix || '';
        this.WinterEngine = require(`./engines/${engine.toLowerCase()}Engine.ts`).default;
    }
    controller() {
        let WinterEngine = this.WinterEngine;
        return new WinterEngine(this.router, this.dir, this.prefix).controller();
    }
}
exports.default = IWinter;
//# sourceMappingURL=index.js.map