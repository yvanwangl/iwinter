export const engineSymbolKey = Symbol.for('winter:engine');
import {scanDir} from '../fileUtil';
import {httpMethodSymbolKey} from '../decorators/http-method';
import {rootPathSymbolKey, pathSymbolKey, methodsSymbolKey} from '../decorators/path';

export class Engine {
    protected router: any;
    protected dir: string;
    protected prefix: string;

    controller(){
        let self = this;
        let files = scanDir(self.dir);
        files.map(file=> {
            self.addRouterMap(require(file).default);
        });
    }

    addRouterMap(Controller: any){
        //读取根路径
        let self = this;
        let instance = new Controller();
        let prototype = Controller.prototype;
        let rootPath = Reflect.getMetadata(rootPathSymbolKey, prototype) || '';
        let methods = Reflect.getMetadata(methodsSymbolKey, prototype);
        methods.map(methodName => {
            let method = instance[methodName];
            let httpMethod = Reflect.getMetadata(httpMethodSymbolKey, prototype, methodName);
            let path = Reflect.getMetadata(pathSymbolKey, prototype, methodName);
            self.router[httpMethod](`${self.prefix}${rootPath}${path}`, method);
        });
    }
}