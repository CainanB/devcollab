import axios from 'axios'
import {setAlert} from '../actions/alert'

import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES
} from './constants'

// Get posts

export const getPosts = () => async dispatch =>{
    try {
        const res = await axios.get("/api/posts")
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

// Add like
export const addLike = (postId) => async dispatch =>{
    try {
        const res = await axios.put(`/api/posts/like/${postId}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: {postId, likes: res.data}
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

// Add like
export const removeLike = (postId) => async dispatch =>{
    try {
        const res = await axios.put(`/api/posts/unlike/${postId}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: {postId, likes: res.data}
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}