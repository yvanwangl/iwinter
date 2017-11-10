import { Engine, engineSymbolKey } from '../engines/engine';

const engineType = Reflect.getMetadata(engineSymbolKey, Engine.prototype);

export const rootPathSymbolKey = Symbol.for('winter:rootPath');
export const pathSymbolKey = Symbol.for('winter:path');
export const methodsSymbolKey = Symbol.for('winter:methods');

export const path = (path: string): Function => {
    return (target: any, propertyKey: string, decorator: TypedPropertyDescriptor<Function>) => {
        if (arguments.length == 1) {
            Reflect.defineMetadata(rootPathSymbolKey, path, target);
        } else {
            let methods = Reflect.getMetadata(methodsSymbolKey, target) || [];
            methods.push(propertyKey);
            Reflect.defineMetadata(methodsSymbolKey, methods, target);
            Reflect.defineMetadata(pathSymbolKey, path, target, propertyKey);
            let oldMethod = decorator.value;
            switch (engineType) {
                case 'koaEngine':
                    decorator.value = async (ctx, next) => {
                        let params = Object.assign({}, ctx.request.body, ctx.params);
                        let result = await oldMethod.call(this, params);
                        ctx.response.body = result;
                    }
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
            };
        }
    };
};