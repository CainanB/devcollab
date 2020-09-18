import React, {useState} from 'react'
import {connect} from 'react-redux'
import {addComment, deleteComment} from '../../actions/post'
import {
    Row,
    Col,
    Button
} from "reactstrap";

const Comment = ({commentId, postId, name, user, text, auth, deleteComment}) => {

    return (
    <>
        <Row>
            <Col className="d-flex justify-content-space-between">

                <img height='25px' width='25px' src="" /><span>{name}</span><p>{text}</p> 
                {!auth.loading && user === auth.user._id ? (
                <button onClick={()=>deleteComment(commentId,postId)}>X</button>
                ):null}

     
            </Col>
        </Row>
    </>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
    
}

export default connect(mapStateToProps,{deleteComment})(Comment)