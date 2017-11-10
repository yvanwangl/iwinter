import { Engine } from './engine';
export default class KoaEngine extends Engine {
    private router;
    private dir;
    constructor(router: any, dir: string);
    controller(): any;
    addRouterMap(Controller: any): void;
}
