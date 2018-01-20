import 'reflect-metadata';
import Options from './types/winter-options';
import Controller from './controllers/Controller';
import { Path } from './decorators/path';
import { GET, POST, PUT, DELETE } from './decorators/http-method';
import { PathParam, QueryParam, BodyParam, ReqParam, ResParam, CtxParam, NextParam, OriginParam } from './decorators/param';
export { Controller };
export { Path, GET, POST, PUT, DELETE };
export { PathParam, QueryParam, BodyParam, ReqParam, ResParam, CtxParam, NextParam, OriginParam };
export default class IWinter {
    private router;
    private dir;
    private prefix;
    private WinterEngine;
    constructor(options: Options);
    controller(): any;
}
