# Winter 一个路由转控制器的 Nodejs 库

> A restful router -> controller library for node.<br>
> <font color=#A52A2A>由于已经存在一个npm包叫winter, 所以安装的时候要这么安装 `npm install --save iwinter`</font>

<font color=#A52A2A>由于已经存在一个npm包叫winter, 所以安装的时候要这么安装 `npm install --save iwinter`</font>

Winter 为了让使用者以更优雅的姿势进行路由的编写。名称的由来：
>The winter is coming !

以前需要这样编写路由 :(
```
//app.js
...
let users = require('./routes/users');
let orders = require('./routes/orders');

app.use('/api/users', users);
app.use('/api/orders', orders);
...

//routers/orders.js
...
router.route('/')
    .get(function (req, res, next) {
        let {page, timeRange, customerId, orderNumber} = req.query;
        let limit = constants.PAGE_SIZE;
        let skip = (page - 1) * limit;
        let currentUser = global[Symbol.for('currentUser')];
		let queryCondition = {
			userId: currentUser['_id']
		};
        ...
```
使用winter之后可以更优雅的编写路由 :)
```
import {Path, GET, POST, PathParam, BodyParam} from 'winter';

@Path('/api/orders')
class OrdersController {

    @GET
    @Path('/:name/:id', (ctx, next)=> ~~ctx.params.id > 20)
    getAllOrders(@PathParam('id') id: number, @PathParam('name') name: string){
        return [{
            id: id, name, content: 'test', author: 'test', comments: []
        }];
    }

    @POST
    @Path('/add')
    addPost(@BodyParam('order') order: object){
        return order;
    }
}

export default OrdersController;

```

### 谁适合使用 Winter:
`*` Nodejs 用户<br>
`*` Typescript 用户<br>
`*` Express / Koa 用户<br>

========================================== ============================================== ==========================================

### Winter 安装：
```
npm install --save iwinter
```

### Winter 引入：
```
import Winter from 'iwinter';
OR
const Winter = require('iwinter');
```

### Koa 中如何使用：
```
import * as Router from 'koa-router';
...
app.use(new Winter({
    engine: 'koa',
    router: new Router(),
    dir: path.join(__dirname, 'controller')
}).controller());
...
```

### Express 中如何使用：
1`.` 路由挂载到app上<br>
```
import * as express from 'express';
let app = express();
let router = express.Router();
...
new Winter({
    engine: 'express',
    router: app,
    dir: path.join(__dirname, 'controller'),
    prefix: ''
}).controller();
```
2`.` 以中间件的形式使用<br>
```
app.use(new Winter({
    engine: 'express',
    router: router,
    dir: path.join(__dirname, 'controller'),
    prefix: ''
}).controller());
```

### 构造函数参数配置说明(options: {})
```
new Winter({
    engine: 'express',
    router: router,
    dir: path.join(__dirname, 'controller'),
    prefix: ''
})
```
1`.` engine 使用的环境类型，可选项 'express | koa', 必需<br>
2`.` router 路由对象，配置参照 (Koa 中如何使用 | Express 中如何使用)，必需<br>
3`.` dir 控制器文件路径，必需<br>
4`.` 网关统一前缀，例如 '/api'，非必需<br>

### API

1`.` 支持路径装饰器 `Path`。<br>
`Path` 是一个装饰器工厂函数，接收两个参数: `@Path(path: string, permission?: Function)`, <br>
`permission` 为权限拦截函数，其参数为原始请求参数 (req, req, next) | (ctx, next)，用于权限验证，返回值： `true`->验证成功；`false`->验证失败。<br>
可以进行控制器级别及路径级别的权限验证。<br>
2`.` 支持 `GET POST PUT DELETE` 方法，可使用装饰器 `@GET @POST @PUT @DELETE`<br>
3`.` 支持获取路径参数、查询参数、post请求体及原始请求对象 ` PathParam, QueryParam, BodyParam, ReqParam, ResParam, CtxParam, NextParam, OriginParam `。<br>

Express | Koa 中使用 `@PathParam` 获取路径参数, `@QueryParam` 获取查询参数, `@BodyParam` 获取请求体数据 ;<br>

Express 环境中使用 `@ReqParam, @ResParam, @NextParam` 可以用于分别获取原始参数，也可通过 `@OriginParam` 获取原始参数对象 `{req, res, next}`;<br>

Koa 环境中使用 `@CtxParam, @NextParam` 可以分别用于获取原始参数，也可通过 `@OriginParam` 获取原始参数对象 `{ctx, next}`.
之所以暴露原始请求对象是为了方便进行一些自由度更大的操作，例如重定向等。

示例：<br>
```
import {Path, GET, POST, PathParam, BodyParam, CtxParam, NextParam, OriginParam} from 'winter';
import {PostModel} from '../models/PostModel';
import {authController} from '../auth';

@Path('/api/posts', authController)
class PostController {

    @GET
    @Path('/:name/:id', (ctx, next)=> ~~ctx.params.id > 20)	//Path(path:string, permission: Function)
    getAllPosts(@PathParam('id') id: number, @PathParam('name') name: string, @CtxParam('ctx') ctx: any){
        //ctx.response.redirect('/users');
        return [{
            id: id, name, content: 'test', author: 'test', comments: []
        }];
    }

    @POST
    @Path('/add')
    async addPost(@BodyParam('post') post: object){
    	let newPost = new Post(post);
        let result = await newPost.save();
        return result;
    }
}

export default PostController;
```
在 Express 中 `getAllPosts` 方法需要返回一个立即值 或 Promise 对象；<br>
在 Koa 中 `getAllPosts` 方法可以使用 `async/await`。<br>

项目会不断完善，如果有问题欢迎提 Issues

>欢迎Star :)



