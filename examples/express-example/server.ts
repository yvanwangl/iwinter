import * as express from 'express';
import * as bodyParser from 'body-parser';
import Winter from '../../build/es6/index.js';

let app = express();
let router = express.Router();
new Winter({
    engine: 'express',
    router,
    dir: 'controller'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


