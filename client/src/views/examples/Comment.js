import React, {useState} from 'react'
import {connect} from 'react-redux'
import {addComment, deleteComment} from '../../actions/post'
import {
    Row,
    Col,
    Button
} from "reactstrap";

const Comment = ({commentId, postId, name, user, text, auth, deleteComment, profileimg}) => {

    return (
    <>
        <Row>
            <Col className="d-flex justify-content-space-between">

                <img height='25px' width='25px' src={profileimg} /><span className="pl-2"> {name}</span><p className="pl-4"> {text}</p> 
                {!auth.loading && user === auth.user._id ? (
                    <Button className="ml-auto" style={{marginTop:'-5px'}} size="sm" onClick={()=>deleteComment(commentId,postId)}>X</Button>
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