import React,{useState} from 'react'
import {
    Button,
    CardHeader,
    CardImg,
    CardFooter,
    Form,
    FormGroup,
    Label,
    InputGroup,
    Input,
    InputGroupAddon,
    InputGroupText,
    Card,
    CardBody,
    CardTitle,
    Container,
    Row,
    Col
} from "reactstrap";
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import {connect} from 'react-redux'
import {addLike, removeLike, deletePost} from '../../actions/post'

const PostItem = ({post:{_id, text, name, avatar, user, likes, comments, date, technologies, title}, auth,
    addLike,
    removeLike,
    deletePost
    }) => {
    let [likeColor, setLikeColor] = useState("#6c757d")
    let [commentColor, setCommentColor] = useState('#6c757d')
    let [textAreaJSX, setTextAreaJSX] = useState(null)

    const handlePostLike = (postID) => {
        addLike(_id)

        // increase post likes by one using unique post ID
        // clicking second time will decrement postLikes by one



        // this code is used to toggle the colors (active inactive)

        // like
        if(likeColor === '#6c757d')
        {
            // increment by one here
            setLikeColor('white')
        }
        // un-like
        else if(likeColor === 'white')
        {
            // decrement by one here
            setLikeColor('#6c757d')
        }

    }

    const showComments = (postID) => {

        
        // show comments by searching DB for post ID

        // temp is the JSX that displays information from the database
        let temp = <>
            <span>Cainan Barboza - </span>
            <span style={{color:'white'}}>u srs with this crap? why are u even a tryin 2 be a developer bro u dont kno shit...</span>
        </>

   

    }

    let color = likeColor;
    let color2 = commentColor;
  return (
    <>
        <Card className="mt-5" id="! postID here !">

<CardHeader>
    <img
        alt="..."
        className="img-center img-fluid rounded-circle"
        width="50px"
        height="50px"
        style={{display:'inline-block', marginBottom:'35px', marginRight:'10px'}}
        // their uploaded profile image
        src={require("../../assets/img/profile.jpeg")}
    />
    <b style={{fontSize:'3em'}}>{title}</b> <span className="text-muted">{name}</span>
</CardHeader>

<CardBody style={{color:'white', paddingTop:'0px'}}>
    Technologies used: {technologies} <br/>
   {text}
</CardBody>

<CardFooter>


    {/* Likes */}
    <i 
        className="fa fa-thumbs-up fa-2x ml-2 iconHov"
        aria-hidden="true"
        onClick={handlePostLike}
        style={{color:color}}
    >
    </i>
  {" "}{likes.length > 0 && (
                <span>{likes.length}</span>
              )} {/* post num likes from DB */}

    {/* DisLikes */}
    <span><i 
        className="fa fa-thumbs-down fa-2x ml-2 iconHov"
        aria-hidden="true"
        onClick={()=>removeLike(_id)}
        
    >
    </i></span>



    {/* Comments */}
    <i 
        className="fas fa-comments fa-2x ml-5 iconHov"
        aria-hidden="true"
        onClick={showComments}
        style={{color:color2}}
    >
    </i>
  {" "}{comments.length > 0 && (
                  <span class='comment-count'>{comments.length}</span>
              )} {/* num comments from DB */}

    <Row className="mt-3">
        <Col>
        Posted on <Moment format='MM/DD/YYYY'>{date}</Moment>
        </Col>
        {!auth.loading && user === auth.user._id ? (
                  <button onClick={(e)=> deletePost(_id)}>delete
                </button>
            ): null}
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
export default connect(mapStateToProps, {addLike, removeLike, deletePost})(PostItem)
