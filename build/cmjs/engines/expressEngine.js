"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const engine_1 = require("./engine");
const fileUtil_1 = require("../fileUtil");
const http_method_1 = require("../decorators/http-method");
const path_1 = require("../decorators/path");
Reflect.defineMetadata(engine_1.engineSymbolKey, 'expressEngine', engine_1.Engine.prototype);
class ExpressEngine extends engine_1.Engine {
    constructor(router, dir) {
        super();
        //如果没有传递路由，则报错
        if (!router) {
            console.error('Please config router');
            return Object.create({});
        }
        this.router = router;
        this.dir = dir;
    }
    controller() {
        let self = this;
        let files = fileUtil_1.scanDir(self.dir);
        files.map(file => {
            self.addRouterMap(require(file).default);
        });
        return self.router;
    }
    addRouterMap(Controller) {
        //读取根路径
        let self = this;
        let instance = new Controller();
        let prototype = Controller.prototype;
        let rootPath = Reflect.getMetadata(path_1.rootPathSymbolKey, prototype);
        let methods = Reflect.getMetadata(path_1.methodsSymbolKey, prototype);
        methods.map(methodName => {
            let method = instance[methodName];
            let httpMethod = Reflect.getMetadata(http_method_1.httpMethodSymbolKey, prototype, methodName);
            let path = Reflect.getMetadata(path_1.pathSymbolKey, prototype, methodName);
            self.router[httpMethod](`${rootPath}${path}`, method);
        });
    }
}
exports.default = ExpressEngine;
//# sourceMappingURL=expressEngine.js.map