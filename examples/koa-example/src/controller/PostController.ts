import {Path, GET} from '../../../../src/index';

@Path('/api/posts')
class PostController {

    @GET
    @Path('/')
    getAllPosts(){
        return [{
            id: 0, content: 'test', author: 'wangyafei', comments: []
        }];
    }

    // @GET
    // @Path('/add')
    // async addPost(post){
    //     let result = 2;
    //     return result;
    // }
}

export default PostController;