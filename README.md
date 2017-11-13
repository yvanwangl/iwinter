# Winter 一个路由转控制器的 Nodejs 库

>A restful router controller library for node.

Winter 为了让使用者以更优雅的姿势进行路由的编写。名称的由来：
>The winter is coming !

### 谁适合使用 Winter:
`*` Nodejs 用户<br>
`*` Typescript 用户<br>
`*` Express / Koa 用户<br>

### [中文文档]()

### Winter 安装：
```
npm install --save winter
```

### Winter 引入：
```
import Winter from 'winter';
OR
const Winter = require('winter');
```

### Koa 中如何使用：
```
app.use(new Winter({
    engine: 'koa',
    router: new Router(),
    dir: path.join(__dirname, 'controller')
}).controller());
```

### Express 中如何使用：
1`.` 路由挂载到app上<br>
```
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

1`.` 支持路径装饰器 `Path`<br>
1`.` 支持 `GET POST PUT DELETE` 方法<br>
2`.` 支持获取路径参数、查询参数、post请求体及原始请求对象 ` PathParam, QueryParam, BodyParam, ReqParam, ResParam, CtxParam, NextParam, OriginParam `<br>

示例：<br>
```
import {Path, GET, POST, PathParam, BodyParam, CtxParam, NextParam, OriginParam} from '../../../../src/index';
import {authController} from '../auth';

@Path('/api/posts', authController)
class PostController {

    @GET
    @Path('/:id/:name', (ctx, next)=> ~~ctx.params.id > 20)
    getAllPosts(@PathParam('id') id: number, @PathParam('name') name: string, @CtxParam('ctx') ctx: any){
        //ctx.response.redirect('/users');
        return [{
            id: id, name, content: 'test', author: 'wangyafei', comments: []
        }];
    }

    @POST
    @Path('/add')
    addPost(@BodyParam('post') post: object){
        return post;
    }
}

export default PostController;
```



