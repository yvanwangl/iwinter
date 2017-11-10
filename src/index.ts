import 'reflect-metadata';
import Options from './types/winter-options';


export default class Winter {

    constructor(options: Options){
        let {engine, router, dir} = options;
        if(!engine){
            console.error('Please config an engine "Express" | "Koa"');
        }
        let WinterEngine = require(`./engines/${engine.toLowerCase()}Engine.ts`).default;
        return new WinterEngine(router, dir).controller();
    }

}