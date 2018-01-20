export const engineSymbolKey = Symbol.for('winter:engine');
import { scanDir } from '../fileUtil';
import { httpMethodSymbolKey } from '../decorators/http-method';
import { rootPathSymbolKey, pathSymbolKey, methodsSymbolKey } from '../decorators/path';
import Controller from '../controllers/Controller';

export class Engine {
    protected router: any;
    protected dir: string;
    protected prefix: string;

    controller() {
        let self = this;
        let files = scanDir(self.dir);
        files.map(file => self.addRouterMap(require(file).default));
    }

    addRouterMap(IwinterController: any) {
        //读取根路径
        let self = this;
        let instance = new IwinterController();
        //判断该实例对象的构造函数是否继承 Controller 类
        if(instance instanceof Controller){
            let prototype = IwinterController.prototype;
            let rootPath = Reflect.getMetadata(rootPathSymbolKey, prototype) || '';
            let methods = Reflect.getMetadata(methodsSymbolKey, prototype);
            methods.map(methodName => {
                let method = instance[methodName];
                let httpMethod = Reflect.getMetadata(httpMethodSymbolKey, prototype, methodName);
                let path = Reflect.getMetadata(pathSymbolKey, prototype, methodName);
                self.router[httpMethod](`${self.prefix}${rootPath}${path}`, method(instance));
            });
        }else {
            console.error(`iwinterError: ${IwinterController.name} class does not inherit the Controller class`);
        }
    }
}