"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseEngine_1 = require("./baseEngine");
const Router = require("koa-router");
class KoaEngine extends baseEngine_1.Engine {
    constructor(router, dir, prefix = '') {
        super();
        //如果没有传递路由，则使用koa-router
        if (!router) {
            router = new Router();
        }
        this.router = router;
        this.dir = dir;
        this.prefix = prefix;
        Reflect.defineMetadata(baseEngine_1.engineSymbolKey, 'koaEngine', baseEngine_1.Engine.prototype);
    }
    controller() {
        super.controller();
        return this.router.routes();
    }
}
exports.default = KoaEngine;
//# sourceMappingURL=koaEngine.js.map