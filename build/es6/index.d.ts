import 'reflect-metadata';
import Options from './types/winter-options';
import { Path } from './decorators/path';
import { GET, POST, PUT, DELETE } from './decorators/http-method';
export { Path, GET, POST, PUT, DELETE };
export default class Winter {
    constructor(options: Options);
}
