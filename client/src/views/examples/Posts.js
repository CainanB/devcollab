
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

    state = {


    };

    render() {

    return (
        <>
        <Navbar />

        <div className="wrapper">

            <div className="page-header">
            
            
            </div>

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