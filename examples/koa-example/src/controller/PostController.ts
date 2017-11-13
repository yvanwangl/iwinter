import {Path, GET, POST, PathParam, QueryParam, BodyParam, CtxParam, NextParam, OriginParam} from '../../../../src/index';
import {authController} from '../auth';

@Path('/api/posts', authController)
class PostController {

    @GET
    @Path('/:name/:id', (ctx, next)=> ~~ctx.params.id > 20)
    getAllPosts(@PathParam('id') id: number, @PathParam('name') name: string, @QueryParam('user') user: any, @CtxParam('ctx') ctx: any){
        //ctx.response.redirect('/users');
        return [{
            id: id, name, content: 'test', author: 'wangyafei', comments: [], userName: user.name, userAge: user.age
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