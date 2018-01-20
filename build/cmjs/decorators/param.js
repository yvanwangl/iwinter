"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathParamSymbolKey = Symbol.for('winter:pathParam');
exports.queryParamSymbolKey = Symbol.for('winter:queryParam');
exports.bodyParamSymbolKey = Symbol.for('winter:bodyParam');
exports.reqParamSymbolKey = Symbol.for('winter:reqParam');
exports.resParamSymbolKey = Symbol.for('winter:resParam');
exports.ctxParamSymbolKey = Symbol.for('winter:ctxParam');
exports.nextParamSymbolKey = Symbol.for('winter:nextParam');
exports.originParamSymbolKey = Symbol.for('winter:originParam');
const genParam = (symbolKey) => {
    return (paramName) => {
        return (target, propertyKey, paramIndex) => {
            const params = Reflect.getMetadata(symbolKey, target, propertyKey) || {};
            params[paramName] = paramIndex;
            Reflect.defineMetadata(symbolKey, params, target, propertyKey);
        };
    };
};
exports.PathParam = genParam(exports.pathParamSymbolKey);
exports.QueryParam = genParam(exports.queryParamSymbolKey);
exports.BodyParam = genParam(exports.bodyParamSymbolKey);
exports.CtxParam = genParam(exports.ctxParamSymbolKey);
exports.NextParam = genParam(exports.nextParamSymbolKey);
exports.ReqParam = genParam(exports.reqParamSymbolKey);
exports.ResParam = genParam(exports.resParamSymbolKey);
exports.OriginParam = genParam(exports.originParamSymbolKey);
//# sourceMappingURL=param.js.map