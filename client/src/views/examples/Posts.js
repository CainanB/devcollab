
import React from "react";
import classnames from "classnames";
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from '../../actions/auth'

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

// core components
import Navbar from "../../components/Navbars/Navbar.js";
import Footer from "../../components/Footer/Footer.js";

class Posts extends React.Component {

    constructor()
    {
        super()

        this.state = {

            likeColor: '#6c757d',
            commentColor: '#6c757d',
            textAreaJSX: null

        };
    }


    handlePostLike = (postID) => {

        // increase post likes by one using unique post ID
        // clicking second time will decrement postLikes by one



        // this code is used to toggle the colors (active inactive)

        // like
        if(this.state.likeColor === '#6c757d')
        {
            // increment by one here
            this.setState({
                likeColor:'white'
            })
        }
        // un-like
        else if(this.state.likeColor === 'white')
        {
            // decrement by one here
            this.setState({
                likeColor:'#6c757d'
            })
        }

    }

    showComments = (postID) => {

        // show comments by searching DB for post ID

        // temp is the JSX that displays information from the database
        let temp = <>
            <span>Cainan Barboza - </span>
            <span style={{color:'white'}}>u srs with this crap? why are u even a tryin 2 be a developer bro u dont kno shit...</span>
        </>

        // this code is used to toggle the colors (active inactive)
        if(this.state.commentColor === '#6c757d')
        {
            this.setState({
                commentColor:'white',
                textAreaJSX: temp
            })
        }
        else if(this.state.commentColor === 'white')
        {
            this.setState({
                commentColor:'#6c757d',
                textAreaJSX: null
            })
        }

    }

    render() {

    let color = this.state.likeColor;
    let color2 = this.state.commentColor;

    return (

        <>

        <Navbar />

        <div className="wrapper">

            <div className="page-header" style={{minHeight:'250px'}}>
                <Container style={{marginTop:'50vh'}}>
                    All Posts (more info will go here but placeholder for now)
                </Container>
            </div>

            <Container >

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
                        <b style={{fontSize:'3em'}}>Post Title</b> <span className="text-muted">from Micah Peterson</span>
                    </CardHeader>

                    <CardBody style={{color:'white', paddingTop:'0px'}}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </CardBody>

                    <CardFooter>


                        {/* Likes */}
                        <i 
                            className="fa fa-thumbs-up fa-2x ml-2 iconHov"
                            aria-hidden="true"
                            onClick={this.handlePostLike}
                            style={{color:color}}
                        >
                        </i>
                        <span> 15 {/* post num likes from DB */}</span>


                        {/* Comments */}
                        <i 
                            className="fas fa-comments fa-2x ml-5 iconHov"
                            aria-hidden="true"
                            onClick={this.showComments}
                            style={{color:color2}}
                        >
                        </i>
                        <span> 3 {/* num comments from DB */}</span>

                        <Row className="mt-3">
                            <Col>
                                {this.state.textAreaJSX}
                            </Col>
                        </Row>


                    </CardFooter>

                </Card> 

                {/* End of Single Post */}
                {/* Repeat for each post in DB */}
                {/* Will add pagination later and display ~10 posts per page */}

            </Container>





            <Footer />

        </div>
        </>
    );
}
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, null)(Posts)