import { Engine } from './baseEngine';
export default class ExpressEngine extends Engine {
    constructor(router: any, dir: string, prefix?: string);
    controller(): any;
}
