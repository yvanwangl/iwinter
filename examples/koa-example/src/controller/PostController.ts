import { 
    Controller, 
    Path, 
    GET, 
    POST, 
    PathParam, 
    QueryParam, 
    BodyParam, 
    CtxParam, 
    NextParam, 
    OriginParam,
    Before,
    After
} from '../../../../src/index';
import { authController } from '../auth';

@Path('/api/posts', authController)
class PostController extends Controller {

    @GET
    @Path('/:name/:id', (ctx, next) => ~~ctx.params.id > 20)
    @Before((ctx, next) => ctx.beforeHook = 'before')
    @After((ctx, next) => console.log('done'))
    getAllPosts( @PathParam('id') id: number, @PathParam('name') name: string, @QueryParam('user') user: any, @CtxParam('ctx') ctx: any) {
        //ctx.response.redirect('/users');
        return [{
            id: id, name, content: 'test', author: 'wangyafei', comments: [], userName: user.name, userAge: user.age, before: ctx.beforeHook
        }];
    }


    @GET
    @Path('/name/id/:id')
    getPostByName( @PathParam('id') id: number, @OriginParam('origin') origin: any) {
        origin.ctx.response.redirect('/users');
        return [{
            id: id, content: 'test', author: 'wangyafei', comments: []
        }];
    }

    @POST
    @Path('/add')
    addPost( @BodyParam('post') post: object) {
        return post;
    }
}

export default PostController;