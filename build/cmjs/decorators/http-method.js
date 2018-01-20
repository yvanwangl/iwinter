"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpMethodSymbolKey = Symbol.for('winter:httpMethod');
const [GET, POST, PUT, DELETE] = ['get', 'post', 'put', 'delete'].map((method) => {
    return (target, propertyKey) => {
        Reflect.defineMetadata(exports.httpMethodSymbolKey, method, target, propertyKey);
    };
});
exports.GET = GET;
exports.POST = POST;
exports.PUT = PUT;
exports.DELETE = DELETE;
//# sourceMappingURL=http-method.js.map