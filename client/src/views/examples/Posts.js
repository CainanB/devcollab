
import React from "react";
// import classnames from "classnames";
// import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import PostItem from './PostItem'
import {getPosts} from '../../actions/post'


import {
    CardHeader,
    CardFooter,
    Card,
    CardBody,
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

     
    }
 componentDidMount = () => {
   this.props.getPosts()
 }
 

   

    render() {

    

    return (

        <>
        {this.props.post.loading ? "Loading" : (
            <>
        <Navbar />

        <div className="wrapper">

            <div className="page-header" style={{minHeight:'250px'}}>
                <Container style={{marginTop:'50vh'}}>
                    All Posts (more info will go here but placeholder for now)
                </Container>
            </div>

            <Container >
            {this.props.post.posts.map(post =>{
                return <PostItem key={post._id} post={post}/>
            })}
              

                {/* End of Single Post */}
                {/* Repeat for each post in DB */}
                {/* Will add pagination later and display ~10 posts per page */}

            </Container>





            <Footer />

        </div>
        </>
        )}
        </>
    );
}
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    post: state.post
})

export default connect(mapStateToProps, {getPosts})(Posts)