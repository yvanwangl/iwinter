var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Engine, engineSymbolKey } from '../engines/baseEngine';
import { pathParamSymbolKey, queryParamSymbolKey, bodyParamSymbolKey, reqParamSymbolKey, resParamSymbolKey, ctxParamSymbolKey, nextParamSymbolKey, originParamSymbolKey } from './param';
export const rootPathSymbolKey = Symbol.for('winter:rootPath');
export const rootAuthSymbolKey = Symbol.for('winter:rootAuth');
export const pathSymbolKey = Symbol.for('winter:path');
export const methodsSymbolKey = Symbol.for('winter:methods');
export const Path = (path, authFunc) => {
    const engineType = Reflect.getMetadata(engineSymbolKey, Engine.prototype);
    return (target, propertyKey, decorator) => {
        if (propertyKey == undefined && decorator == undefined) {
            Reflect.defineMetadata(rootPathSymbolKey, path, target.prototype);
            Reflect.defineMetadata(rootAuthSymbolKey, authFunc, target.prototype);
        }
        else {
            let methods = Reflect.getMetadata(methodsSymbolKey, target) || [];
            methods.push(propertyKey);
            Reflect.defineMetadata(methodsSymbolKey, methods, target);
            Reflect.defineMetadata(pathSymbolKey, path, target, propertyKey);
            let oldMethod = decorator.value;
            if (engineType == 'koaEngine') {
                decorator.value = (instance) => (ctx, next) => __awaiter(this, void 0, void 0, function* () {
                    /**
                     * 权限拦截，
                     * 判断是否有控制器权限
                     * 判断是否有路由权限
                     */
                    let controllerAuth = Reflect.getMetadata(rootAuthSymbolKey, target);
                    if (controllerAuth && typeof controllerAuth == 'function') {
                        let hasAuth = controllerAuth(ctx, next);
                        if (!hasAuth) {
                            ctx.response.status = 403;
                            ctx.response.body = 'Permission Denied!';
                            return null;
                        }
                    }
                    if (authFunc && typeof authFunc == 'function') {
                        let hasAuth = authFunc(ctx, next);
                        if (!hasAuth) {
                            ctx.response.status = 403;
                            ctx.response.body = 'Permission Denied!';
                            return null;
                        }
                    }
                    let params = [];
                    //路径参数
                    let pathParams = Reflect.getMetadata(pathParamSymbolKey, target, propertyKey);
                    if (pathParams) {
                        Object.keys(pathParams).map(key => params[pathParams[key]] = ctx.params[key]);
                    }
                    //查询参数
                    let queryParams = Reflect.getMetadata(queryParamSymbolKey, target, propertyKey);
                    if (queryParams) {
                        Object.keys(queryParams).map(key => params[queryParams[key]] = ctx.query);
                    }
                    //请求体body
                    let bodyParams = Reflect.getMetadata(bodyParamSymbolKey, target, propertyKey);
                    if (bodyParams) {
                        Object.keys(bodyParams).map(key => params[bodyParams[key]] = ctx.request.body);
                    }
                    //请求上下文对象
                    let ctxObject = Reflect.getMetadata(ctxParamSymbolKey, target, propertyKey);
                    if (ctxObject) {
                        Object.keys(ctxObject).map(key => params[ctxObject[key]] = ctx);
                    }
                    //next 方法
                    let nextObject = Reflect.getMetadata(nextParamSymbolKey, target, propertyKey);
                    if (nextObject) {
                        Object.keys(nextObject).map(key => params[nextObject[key]] = next);
                    }
                    //原始参数对象
                    let originObject = Reflect.getMetadata(originParamSymbolKey, target, propertyKey);
                    if (originObject) {
                        Object.keys(originObject).map(key => params[originObject[key]] = { ctx, next });
                    }
                    let result = yield oldMethod.apply(instance, params);
                    ctx.response.body = result;
                });
            }
            else if (engineType == 'expressEngine') {
                decorator.value = (instance) => (req, res, next) => {
                    /**
                     * 权限拦截，
                     * 判断是否有控制器权限
                     * 判断是否有路由权限
                     */
                    let controllerAuth = Reflect.getMetadata(rootAuthSymbolKey, target);
                    if (controllerAuth && typeof controllerAuth == 'function') {
                        let hasAuth = controllerAuth(req, res);
                        if (!hasAuth) {
                            res.status(403).send('Permission Denied!');
                            return null;
                        }
                    }
                    if (authFunc && typeof authFunc == 'function') {
                        let hasAuth = authFunc(req, res);
                        if (!hasAuth) {
                            res.status(403).send('Permission Denied!');
                            return null;
                        }
                    }
                    let params = [];
                    let pathParams = Reflect.getMetadata(pathParamSymbolKey, target, propertyKey);
                    //路径参数
                    if (pathParams) {
                        Object.keys(pathParams).map(key => params[pathParams[key]] = req.params[key]);
                    }
                    //查询参数
                    let queryParams = Reflect.getMetadata(queryParamSymbolKey, target, propertyKey);
                    if (queryParams) {
                        Object.keys(queryParams).map(key => params[queryParams[key]] = req.query);
                    }
                    //请求体body
                    let bodyParams = Reflect.getMetadata(bodyParamSymbolKey, target, propertyKey);
                    if (bodyParams) {
                        Object.keys(bodyParams).map(key => params[bodyParams[key]] = req.body);
                    }
                    //请求对象
                    let reqObject = Reflect.getMetadata(reqParamSymbolKey, target, propertyKey);
                    if (reqObject) {
                        Object.keys(reqObject).map(key => params[reqObject[key]] = req);
                    }
                    //响应对象
                    let resObject = Reflect.getMetadata(resParamSymbolKey, target, propertyKey);
                    if (resObject) {
                        Object.keys(resObject).map(key => params[resObject[key]] = res);
                    }
                    //next 方法
                    let nextObject = Reflect.getMetadata(nextParamSymbolKey, target, propertyKey);
                    if (nextObject) {
                        Object.keys(nextObject).map(key => params[nextObject[key]] = next);
                    }
                    //原始参数对象
                    let originObject = Reflect.getMetadata(originParamSymbolKey, target, propertyKey);
                    if (originObject) {
                        Object.keys(originObject).map(key => params[originObject[key]] = { req, res, next });
                    }
                    let result = oldMethod.apply(instance, params);
                    Promise.resolve(result).then((fulfilled) => {
                        res.send(fulfilled);
                    }, (rejected) => {
                        console.error(rejected);
                        res.status(500).send(rejected);
                    });
                };
            }
        }
    };
};
//# sourceMappingURL=path.js.map