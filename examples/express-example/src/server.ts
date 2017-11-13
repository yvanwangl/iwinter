//import 'reflect-metadata';
import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import IWinter from '../../../src/index';

let app = express();
let router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//路由挂载到app上
// new IWinter({
//     engine: 'express',
//     router: app,
//     dir: path.join(__dirname, 'controller'),
//     prefix: ''
// }).controller();

//以中间件的形式使用
app.use(new IWinter({
    engine: 'express',
    router: router,
    dir: path.join(__dirname, 'controller'),
    prefix: ''
}).controller());

app.listen(9000);
console.log('app started at port 9000...');

