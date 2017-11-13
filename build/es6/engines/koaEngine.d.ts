import { Engine } from './baseEngine';
export default class KoaEngine extends Engine {
    constructor(router: any, dir: string, prefix?: string);
    controller(): any;
}
