import 'reflect-metadata';
import { Path } from './decorators/path';
import { GET, POST, PUT, DELETE } from './decorators/http-method';
export { Path, GET, POST, PUT, DELETE };
export default class Winter {
    constructor(options) {
        let { engine, router, dir } = options;
        if (!engine) {
            console.error('Please config an engine "Express" | "Koa"');
        }
        let WinterEngine = require(`./engines/${engine.toLowerCase()}Engine.ts`).default;
        return new WinterEngine(router, dir).controller();
    }
}
//# sourceMappingURL=index.js.map