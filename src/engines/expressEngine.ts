import {Engine, engineSymbolKey} from './engine';
import {scanDir} from '../fileUtil';
import {httpMethodSymbolKey} from '../decorators/http-method';
import {rootPathSymbolKey, pathSymbolKey, methodsSymbolKey} from '../decorators/path';

Reflect.defineMetadata(engineSymbolKey, 'expressEngine', Engine.prototype);

export default class ExpressEngine extends Engine {
    private router: any;
    private dir:string;

    constructor(router: any, dir: string){
        super();
        //如果没有传递路由，则报错
        if(!router){
            console.error('Please config router');
            return Object.create({});
        }
        this.router = router;
        this.dir = dir;
    }

    controller(){
        let self = this;
        let files = scanDir(self.dir);
        files.map(file=> {
            self.addRouterMap(require(file).default);
        });
        return self.router.routes();
    }

    addRouterMap(Controller: any){
        //读取根路径
        let self = this;
        let instance = new Controller();
        let prototype = Controller.prototype;
        let rootPath = Reflect.getMetadata(rootPathSymbolKey, prototype);
        let methods = Reflect.getMetadata(methodsSymbolKey, prototype);
        methods.map(methodName => {
            let method = instance[methodName];
            let httpMethod = Reflect.getMetadata(httpMethodSymbolKey, prototype, methodName);
            let path = Reflect.getMetadata(pathSymbolKey, prototype, methodName);
            self.router[httpMethod](`${rootPath}${path}`, method);

        });
    }
}