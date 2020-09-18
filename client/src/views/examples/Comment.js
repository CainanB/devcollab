import React, {useState} from 'react'
import {connect} from 'react-redux'
import {addComment, deleteComment} from '../../actions/post'
import {
    Row,
    Col
} from "reactstrap";

const Comment = ({photo, name, text, deleteComment}) => {

    return (
    <>
        <Row>
            <Col className="d-flex justify-content-space-between">
                <img height='25px' width='25px' src={photo}/><p>{text}</p> <button onClick={deleteComment()}>X</button>
            </Col>
        </Row>
    </>
    )
}

export default connect(null,{deleteComment})(Comment)