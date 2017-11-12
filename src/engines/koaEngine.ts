import { Engine, engineSymbolKey } from './baseEngine';
import * as Router from 'koa-router';

export default class KoaEngine extends Engine {

    constructor(router: any, dir: string, prefix: string = '') {
        super();
        //如果没有传递路由，则使用koa-router
        if (!router) {
            router = new Router();
        }
        this.router = router;
        this.dir = dir;
        this.prefix = prefix;
        Reflect.defineMetadata(engineSymbolKey, 'koaEngine', Engine.prototype);
    }

    controller() {
        super.controller();
        return this.router.routes();
    }
}