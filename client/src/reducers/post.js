import {
    GET_POSTS, 
    POST_ERROR,
    UPDATE_LIKES,
    ADD_POST,
    DELETE_POST
} from '../actions/constants'

const initialState ={
    posts: [],
    post: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action){
    const {type, payload} = action

    switch(type){
        case GET_POSTS:
            return{
                ...state,
                posts: payload,
                loading: false
            }
        case POST_ERROR:
            return{
                ...state,
                error: payload,
                loading: false
            }
        case UPDATE_LIKES:
            return{
                ...state,
                posts: state.posts.map(post => post._id === payload.postId ?{...post,
                likes: payload.likes} : post
                ),
                loading: false
               
            }
        case DELETE_POST:
                return{
                    ...state,
                    posts: state.posts.filter(post => post._id !== payload),
                    loading: false
                }
        case ADD_POST:
                return{
                    ...state,
                    posts: [payload,...state.posts],
                    loading: false
                }
        default:
            return state
    }
}