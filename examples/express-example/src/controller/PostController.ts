import {Path, GET, POST, PathParam, QueryParam, BodyParam, ReqParam, ResParam, NextParam, OriginParam} from '../../../../src/index';
import {authController} from '../auth';

@Path('/api/posts', authController)
class PostController {

    @GET
    @Path('/:id/:name', (ctx, next)=> ~~ctx.params.id > 20)
    getAllPosts(@PathParam('id') id: number, @QueryParam('user') user: any, @PathParam('name') name: string, @ReqParam('req') req: any,  @ResParam('res') res: any){
        //res.redirect('/users');
        return Promise.resolve([{
            id: id, name, content: 'test', author: 'wangyafei', comments: [], userName: user.name, userAge: user.age
        }]);
        //return Promise.reject('error!!!');
    }

    @GET
    @Path('/:id')
    getPostById(@PathParam('id') id: number, @PathParam('name') name: string, @NextParam('next') next: Function){
        next();
        return [{
            id: id, name, content: 'test', author: 'wangyafei', comments: []
        }];
    }

    @GET
    @Path('/name/id/:id')
    getPostByName(@PathParam('id') id: number, @OriginParam('origin') origin: any){
        origin.ctx.response.redirect('/users');
        return [{
            id: id, content: 'test', author: 'wangyafei', comments: []
        }];
    }

    @POST
    @Path('/add')
    addPost(@BodyParam('post') post: object){
        return post;
    }
}

export default PostController;