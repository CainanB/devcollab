import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import CommentForm from './CommentForm'
import Comment from './Comment'
import {getPost} from '../../actions/post'


const CommentContainer = ({getPost, postId, post}) => {
    useEffect(()=>{
        getPost(postId)
    },[getPost]) 
        
    
  return (
    <>
      {post.loading || post.post === null ? "Loading" :( 
          <>
      {post.post.comments.map(comment =>{
          return <Comment key={comment._id} commentId={comment._id} postId={postId} name={comment.name} user={comment.user} text={comment.text}/>
      })}  
      <CommentForm postId={postId}/>
      </>
      )} 
    </>
  )
}

const mapStateToProps = state =>{
    return {
        post: state.post
    }
}

export default connect(mapStateToProps,{getPost})(CommentContainer)
