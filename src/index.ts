import 'reflect-metadata';
import Options from './types/winter-options';
import { Path } from './decorators/path';
import { GET, POST, PUT, DELETE } from './decorators/http-method';

export { Path, GET, POST, PUT, DELETE };

export default class Winter {

    private router: any;
    private dir: string;
    private WinterEngine: any;

    constructor(options: Options) {
        let { engine, router, dir } = options;
        if (!engine) {
            console.error('Please config an engine "Express" | "Koa"');
        }
        this.router = router;
        this.dir = dir;
        this.WinterEngine = require(`./engines/${engine.toLowerCase()}Engine.ts`).default;
    }

    controller() {
        let WinterEngine = this.WinterEngine;
        return new WinterEngine(this.router, this.dir).controller();
    }

}