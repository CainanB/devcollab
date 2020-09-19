import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, SET_PROFILE_IMAGE, DELETE_POST, GET_PROFILE_BY_ID } from "../actions/constants"

const initialState = {
    profile: null,
    profilebyid:null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}


export default function(state = initialState, action){
    const {type, payload} = action
    console.log(payload)

    switch(type){
        case GET_PROFILE:
            return{
                ...state,
                profile: {...payload.profile, userPosts: payload.userPosts},
                loading: false
            }
        case GET_PROFILE_BY_ID:
            return{
                ...state,
                profilebyid: {...payload.profile, userPosts: payload.userPosts},
                loading: false
            }
        case SET_PROFILE_IMAGE:
            return{
                ...state,
                profile: {...state.profile, profileimg: payload}
            }
        case PROFILE_ERROR:
            return{
                ...state,
                error: {...payload}
            }
        case CLEAR_PROFILE:
            return{
                ...state,
                profile: null,
                repos: [],
                
            }
        case DELETE_POST:
                return{
                    ...state,
                    profile: {
                        ...state.profile,
                        userPosts: state.profile.userPosts.filter(post => post._id !== payload)
                    },
                    loading: false
                    
                }
        default:
            return state
    }
}