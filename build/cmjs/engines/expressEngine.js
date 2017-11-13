"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseEngine_1 = require("./baseEngine");
class ExpressEngine extends baseEngine_1.Engine {
    constructor(router, dir, prefix = '') {
        super();
        //如果没有传递路由，则报错
        if (!router) {
            console.error('Please config router');
            return Object.create({});
        }
        this.router = router;
        this.dir = dir;
        this.prefix = prefix;
        Reflect.defineMetadata(baseEngine_1.engineSymbolKey, 'expressEngine', baseEngine_1.Engine.prototype);
    }
    controller() {
        super.controller();
        return this.router;
    }
}
exports.default = ExpressEngine;
//# sourceMappingURL=expressEngine.js.map