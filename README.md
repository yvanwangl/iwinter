# winter
A restful router controller library for node.

Winter 是一个路由转控制器的 Nodejs 库，让使用者以更优雅的姿势进行路由的编写。
谁适合使用 Winter:
1、Nodejs 用户
2、Typescript 用户
3、Express / Koa 用户

Winter 安装：
```
npm install --save winter
```

Winter 使用：
```
import Winter from 'winter';
or
const Winter = require('winter');
```

```
app.use(new Winter({
  engine: 'express',
  router: express.Router(),
  dir: 'controller'
}))
```


