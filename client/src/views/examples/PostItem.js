import React,{useState, useEffect} from 'react'
import {
    Button,
    CardHeader,
    CardFooter,
    Form,
    // FormGroup,
    // Label,
    // InputGroup,
    Input,
    // InputGroupAddon,
    // InputGroupText,
    Card,
    CardBody,
    // CardTitle,
    // Container,
    Row,
    Col
} from "reactstrap";
import Moment from 'react-moment'
import {connect} from 'react-redux'
import {addLike, removeLike, deletePost, addComment, deleteComment} from '../../actions/post'
import { Link } from "react-router-dom";
import CommentForm from './CommentForm'
import Comment from './Comment'

const PostItem = ({post:{_id, text, name, avatar, user, likes, comments, date, technologies, title, profileimg}, auth,
    addLike,
    removeLike,
    deletePost,
    addComment,
    deleteComment
    }) => {
    let [likeColor, setLikeColor] = useState("#6c757d")
    let [commentColor, setCommentColor] = useState('#6c757d')
    let [textAreaJSX, setTextAreaJSX] = useState(null)

    
    let [commentToggle, setCommentToggle] = useState(false)
    let [commentJSX, setCommentJSX] = useState(null);

    const getComments = () => {

        let getAllComments = null;

        let comments = ['this is dummmy comment', 'another dummy comment']

        getAllComments = comments.map(comment => {

            return <Comment photo={avatar} name={name} text={comment} deleteComment={deleteComment}/>
        })

        if(getAllComments.length === 0 || getAllComments === undefined)
        {
            return null;
        }
        else
        {
            return getAllComments;
        }

    }

    
    const handlePostLike = (postID) => {


        // increase post likes by one using unique post ID
        // clicking second time will decrement postLikes by one

        // like
        if(likeColor === '#6c757d')
        {
            addLike(_id)
            // increment by one here
            setLikeColor('white')
        }
        // un-like
        else if(likeColor === 'white')
        {
            removeLike(_id);
            // decrement by one here
            setLikeColor('#6c757d')
        }

    }

    const showComments = () => {

        // show comments by searching DB for post ID

        // temp is the JSX that displays information from the database
        let temp = null;

        if(commentToggle === false)
        {
            setCommentToggle(true);
            temp = <>

                {getComments()}
                <CommentForm postId={_id} comments={comments}/>

            </>

            setCommentJSX(temp);
            setCommentColor('white')

        }
        else
        {
            setCommentJSX(null)
            setCommentToggle(false)
            setCommentColor('#6c757d')
        }


    }

    let color = likeColor;
    let color2 = commentColor;
  return (
    <>
        <Card className="mt-5" id="! postID here !">

<CardHeader>

    <Row>
        <Col xs={10} sm={10} md={10} lg={10} xl={10} className="pr-0" style={{paddingLeft:'2.3rem'}}>
            <Link to={`/publicprofile/${user}`}>
            <img
                alt="..."
                className="img-center img-fluid rounded-circle"
                width="50px"
                height="50px"
                style={{display:'inline-block', marginBottom:'5px', marginRight:'10px', marginLeft:'25px'}}
                // their uploaded profile image
                src={ profileimg ?
                    profileimg :
                    "https://coursereport-s3-production.global.ssl.fastly.net/rich/rich_files/rich_files/5668/s300/social-media.png"}
            />
            <p className="text-muted mb-3">{name}</p>
            </Link>

        </Col>

        <Col xs={2} sm={2} md={2} lg={2} xl={2} className="d-flex justify-content-end pl-0">

            {!auth.loading && user === auth.user._id ? (
                        <Button 
                            size="sm" 
                            onClick={(e) => deletePost(_id)}
                            style={{height:'50px'}}
                        >
                            X
                        </Button>
                    ): null}

        </Col>

    </Row>


    <Row className="justify-content-start ml-4">

        <b style={{fontSize:'2em', textDecoration:'underline'}}>{title}</b>

    </Row>

</CardHeader>

<CardBody style={{color:'white', paddingTop:'0px'}}>
    
    <Row className="mx-1 pl-2 pr-2 pt-0 justify-content-center">
        <Col xs="12" className="mx-1 d-flex justify-content-center align-items-center pb-3">
            <i className="tim-icons icon-settings mr-2" style={{display:'inline-block'}}></i><em style={{display:'wrap', width:'100%'}}> {technologies}</em>
        </Col>
        <Col xs="12">
            {text}
        </Col>

    </Row>

</CardBody>

<CardFooter>


    {/* Likes */}
    <i 
        className="fa fa-thumbs-up fa-2x ml-4 iconHov"
        aria-hidden="true"
        onClick={handlePostLike}
        style={{color:color}}
    >
    </i>
  {" "}{likes.length > 0 && (
                <span>{likes.length}</span>
              )} {/* post num likes from DB */}

    {/* Comments */}
    <i 
        className="fas fa-comments fa-2x ml-5 iconHov"
        aria-hidden="true"
        onClick={showComments}
        style={{color:color2}}
    >
    </i>
  {" "}{comments.length > 0 && (
                <span className='comment-count'>{comments.length}</span>
              )} {/* num comments from DB */}

    <Row className="mt-3">
        <Col>
            {commentJSX}
        </Col>
    </Row>


    <Row className="mt-3">

        <Col>
            Posted on <Moment format='MM/DD/YYYY'>{date}</Moment>
        </Col>

    </Row>


</CardFooter>

</Card> 
    </>
  )
}

const mapStateToProps = state =>{
    return{
        auth: state.auth
    }
    
}
export default connect(mapStateToProps, {addLike, removeLike, deletePost, addComment, deleteComment})(PostItem)
