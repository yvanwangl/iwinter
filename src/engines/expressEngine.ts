import {Engine, engineSymbolKey} from './baseEngine';
import {scanDir} from '../fileUtil';
import {httpMethodSymbolKey} from '../decorators/http-method';
import {rootPathSymbolKey, pathSymbolKey, methodsSymbolKey} from '../decorators/path';

export default class ExpressEngine extends Engine {

    constructor(router: any, dir: string, prefix: string = ''){
        super();
        //如果没有传递路由，则报错
        if(!router){
            console.error('Please config router');
            return Object.create({});
        }
        this.router = router;
        this.dir = dir;
        this.prefix = prefix;
        Reflect.defineMetadata(engineSymbolKey, 'expressEngine', Engine.prototype);
    }

    controller(){
        super.controller();
        return this.router;
    }
}