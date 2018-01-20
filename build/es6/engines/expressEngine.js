import { Engine, engineSymbolKey } from './baseEngine';
export default class ExpressEngine extends Engine {
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
        Reflect.defineMetadata(engineSymbolKey, 'expressEngine', Engine.prototype);
    }
    controller() {
        super.controller();
        return this.router;
    }
}
//# sourceMappingURL=expressEngine.js.map