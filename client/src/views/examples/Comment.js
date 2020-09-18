import React, {useState} from 'react'
import {connect} from 'react-redux'
import {addComment, deleteComment} from '../../actions/post'
import {
    Row,
    Col,
    Button
} from "reactstrap";

const Comment = ({photo, name, text, deleteComment}) => {

    return (
    <>
        <Row>
            <Col className="d-flex justify-content-space-between">
                <img height='25px' width='25px' src={photo}/><p>{text}</p> <Button size='sm' onClick={deleteComment()}>X</Button>
            </Col>
        </Row>
    </>
    )
}

export default connect(null,{deleteComment})(Comment)