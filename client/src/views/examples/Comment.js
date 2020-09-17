import React, {useState} from 'react'
import {connect} from 'react-redux'
import {addComment, deleteComment} from '../../actions/post'
import {
    Row,
    Col
} from "reactstrap";

const Comment = ({avatar, name, comments}) => {


    return (
    <>
        <Row>
            <Col>
                {/* <p>{text}</p> <button onClick={deleteComment()}>X</button> */}
            </Col>
        </Row>
    </>
    )
}

export default connect(null,{deleteComment})(Comment)