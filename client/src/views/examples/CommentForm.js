import React, {useState} from 'react'
import {connect} from 'react-redux'
import {addComment, deleteComment} from '../../actions/post'
import {
    Button,
    // CardHeader,
    // CardFooter,
    Form,
    // FormGroup,
    // Label,
    // InputGroup,
    Input,
    // InputGroupAddon,
    // InputGroupText,
    // Card,
    // CardBody,
    // CardTitle,
    // Container,
    Row,
    Col
} from "reactstrap";

const CommentForm = ({postId, comments, addComment}) => {

    let [commentText, setCommentText] = useState('');

    const onCommentChange = (e) => {
        console.log(e.target.value)
        console.log(e.target.value)
        setCommentText(e.target.value)
        console.log(commentText)
    }

    const onFormSubmit = (e) => {

        e.preventDefault();
       
        // action to create comment here
        addComment({commentText},postId)
        setCommentText('')

    }

  return (
    <>
                <Row className="mt-3">
                    <Col>
                        <Form className="form" onSubmit={onFormSubmit} id="createComment">
                            <Input
                                name="comment"
                                type="text"
                                placeholder="leave a comment"
                                autoComplete="off"
                                value={commentText}
                                onChange={(e)=>onCommentChange(e)}
                                
                            >
                            </Input>

                            <Row style={{marginLeft:'1px'}} className="justify-content-start">
                                <Button
                                    type="submit"
                                >
                                    Post Comment
                                </Button>
                            </Row>
                        </Form>
                    </Col>
                </Row>
    </>
    )
}

export default connect(null,{addComment})(CommentForm)
