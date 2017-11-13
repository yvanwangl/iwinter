import 'reflect-metadata';
import { Path } from './decorators/path';
import { GET, POST, PUT, DELETE } from './decorators/http-method';
import { PathParam, QueryParam, BodyParam, ReqParam, ResParam, CtxParam, NextParam, OriginParam } from './decorators/param';
export { Path, GET, POST, PUT, DELETE };
export { PathParam, QueryParam, BodyParam, ReqParam, ResParam, CtxParam, NextParam, OriginParam };
export default class IWinter {
    constructor(options) {
        let { engine, router, dir, prefix } = options;
        if (!engine) {
            console.error('Please config an engine "Express" | "Koa"');
        }
        this.router = router;
        this.dir = dir;
        this.prefix = prefix || '';
        this.WinterEngine = require(`./engines/${engine.toLowerCase()}Engine.ts`).default;
    }
    controller() {
        let WinterEngine = this.WinterEngine;
        return new WinterEngine(this.router, this.dir, this.prefix).controller();
    }
}
//# sourceMappingURL=index.js.map