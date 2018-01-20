"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.engineSymbolKey = Symbol.for('winter:engine');
const fileUtil_1 = require("../fileUtil");
const http_method_1 = require("../decorators/http-method");
const path_1 = require("../decorators/path");
const Controller_1 = require("../controllers/Controller");
class Engine {
    controller() {
        let self = this;
        let files = fileUtil_1.scanDir(self.dir);
        files.map(file => self.addRouterMap(require(file).default));
    }
    addRouterMap(IwinterController) {
        //读取根路径
        let self = this;
        let instance = new IwinterController();
        //判断该实例对象的构造函数是否继承 Controller 类
        if (instance instanceof Controller_1.default) {
            let prototype = IwinterController.prototype;
            let rootPath = Reflect.getMetadata(path_1.rootPathSymbolKey, prototype) || '';
            let methods = Reflect.getMetadata(path_1.methodsSymbolKey, prototype);
            methods.map(methodName => {
                let method = instance[methodName];
                let httpMethod = Reflect.getMetadata(http_method_1.httpMethodSymbolKey, prototype, methodName);
                let path = Reflect.getMetadata(path_1.pathSymbolKey, prototype, methodName);
                self.router[httpMethod](`${self.prefix}${rootPath}${path}`, method(instance));
            });
        }
        else {
            console.error(`iwinterError: class ${IwinterController.name} does not inherit the base class Controller`);
        }
    }
}
exports.Engine = Engine;
//# sourceMappingURL=baseEngine.js.map