var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Engine, engineSymbolKey } from '../engines/engine';
const engineType = Reflect.getMetadata(engineSymbolKey, Engine.prototype);
export const rootPathSymbolKey = Symbol.for('winter:rootPath');
export const pathSymbolKey = Symbol.for('winter:path');
export const methodsSymbolKey = Symbol.for('winter:methods');
export const Path = (path) => {
    return (target, propertyKey, decorator) => {
        if (arguments.length == 1) {
            Reflect.defineMetadata(rootPathSymbolKey, path, target);
        }
        else {
            let methods = Reflect.getMetadata(methodsSymbolKey, target) || [];
            methods.push(propertyKey);
            Reflect.defineMetadata(methodsSymbolKey, methods, target);
            Reflect.defineMetadata(pathSymbolKey, path, target, propertyKey);
            let oldMethod = decorator.value;
            switch (engineType) {
                case 'koaEngine':
                    decorator.value = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
                        let params = Object.assign({}, ctx.request.body, ctx.params);
                        let result = yield oldMethod.call(this, params);
                        ctx.response.body = result;
                    });
                    break;
                case 'expressEngine':
                    decorator.value = (req, res, next) => {
                        let params = Object.assign({}, req.body, req.params);
                        let result = oldMethod.call(this.params);
                        result.then((fulfill) => {
                            res.send(fulfill);
                        }, (reject) => {
                            console.error(reject);
                            res.status(500).send(reject);
                        });
                    };
                    break;
            }
            ;
        }
    };
};
//# sourceMappingURL=path.js.map