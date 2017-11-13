# Winter 一个路由转控制器的 Nodejs 库

>A restful router controller library for node.

### Winter为了让使用者以更优雅的姿势进行路由的编写。名称的由来：
>The winter is coming !

### 谁适合使用 Winter:
`*` Nodejs 用户
`*` Typescript 用户
`*` Express / Koa 用户

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
1`.`路由挂载到app上
```
new Winter({
    engine: 'express',
    router: app,
    dir: path.join(__dirname, 'controller'),
    prefix: ''
}).controller();
```
2`.`以中间件的形式使用
```
app.use(new Winter({
    engine: 'express',
    router: router,
    dir: path.join(__dirname, 'controller'),
    prefix: ''
}).controller());
```


