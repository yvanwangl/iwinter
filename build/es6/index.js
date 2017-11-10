import 'reflect-metadata';
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