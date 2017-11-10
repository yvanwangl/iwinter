import 'reflect-metadata';
import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import * as Router from 'koa-router';
import Winter from '../../../src/index';
import * as path from 'path';

const app = new Koa();

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url} ${ctx.request.path}`);
    let startTime = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - startTime;
    ctx.response.set('X-Response-Time', execTime);
});
app.use(koaBody());

//controller
app.use(new Winter({
    engine: 'koa',
    router: new Router(),
    dir: path.join(__dirname, 'controller')
}).controller());

app.listen(8000);
console.log('app started at port 8000...');