import React from "react";
import classnames from "classnames";
// import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {setAlert} from '../../actions/alert'
import {register} from '../../actions/auth'
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import Navbar from "../../components/Navbars/Navbar.js";
import Footer from "../../components/Footer/Footer.js";

class RegisterPage extends React.Component {

    state = {
    squares1to6: "",
    squares7and8: "",
    email: "",
    name: "",
    password: ""

    };

    onFormChange=(e)=>{
    this.setState({[e.target.name]: e.target.value})
    }

    onFormSubmit = async (e) =>{
        e.preventDefault();

    }

    componentWillMount(){

        if(this.props.isAuthenticated)
        {
            return <Redirect to="/profile-page"/>
        }
    }
    componentDidMount() {
        document.body.classList.toggle("register-page");
        document.documentElement.addEventListener("mousemove", this.followCursor);
    }

    componentWillUnmount() {
        document.body.classList.toggle("register-page");
        document.documentElement.removeEventListener(
        "mousemove",
        this.followCursor
        );
    }
    followCursor = event => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;

        this.setState({
            squares1to6:
            "perspective(500px) rotateY(" +
            posX * 0.05 +
            "deg) rotateX(" +
            posY * -0.05 +
            "deg)",
            squares7and8:
            "perspective(500px) rotateY(" +
            posX * 0.02 +
            "deg) rotateX(" +
            posY * -0.02 +
            "deg)"
        });
    };

    // begin render function 

    render() {

    return (
        <>
        <Navbar />
        
        <div className="wrapper">
            <div className="page-header">
            <div className="page-header-image" />
            <div className="content">

            <Container>
                <Row>
                    <Col lg="12" md="12">
                    <div
                        className="square square-7"
                        id="square7"
                        style={{ transform: this.state.squares7and8 }}
                    />
                    <div
                        className="square square-8"
                        id="square8"
                        style={{ transform: this.state.squares7and8 }}
                    />
                    <Card className="card-register">

                        <CardHeader>

                            <Row>

                                <Col xl={9} lg={9} md={9} sm={9} xs={9}>
                                    <CardImg
                                    alt="..."
                                    src={require("../../assets/img/square2.png")}
                                    />
                                </Col>
                                <Col xl={3} lg={3} md={3} sm={3} xs={3}>
                                    <img
                                    alt="..."
                                    className="img-fluid rounded-circle shadow-lg"
                                    style={{height:'150px', marginTop:'10px', width:'150px', border:'2px black solid'}}
                                    src={require("../../assets/img/profile.jpeg")}
                                    />
                                </Col>
                            </Row>

                            <CardTitle tag="h4" className="ml-2">Editor</CardTitle>


                        </CardHeader>

                        <CardBody>

                        {/* FORM START */}

                        <Form className="form" onSubmit={this.onFormSubmit} id="editForm">


                            {/* NAME INPUT */}

                            <InputGroup

                                className={classnames({
                                    "input-group-focus": this.state.fullNameFocus
                                })}
                            
                            >

                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="tim-icons icon-single-02" />
                                </InputGroupText>
                            </InputGroupAddon>

                            <Input
                                // value={this.state.name}
                                name="name"
                                placeholder="Name or Nickname"
                                type="text"
                                autoComplete="new-password"
                                onChange={this.onFormChange}
                                onFocus={e =>
                                    this.setState({ fullNameFocus: true })
                                }
                                onBlur={e =>
                                    this.setState({ fullNameFocus: false })
                                }
                            />
                            </InputGroup>


                            {/* Skills INPUT */}

                            <InputGroup

                                // className={classnames({
                                //     "input-group-focus": this.state.emailFocus
                                // })}
                            >

                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                <i className="tim-icons icon-bullet-list-67" />
                                </InputGroupText>
                            </InputGroupAddon>

                            <Input
                            // value={this.state.skills}
                                name="skills"
                                onChange={this.onFormChange}
                                autoComplete="off"
                                placeholder="Skills"
                                type="text"
                                // onFocus={e => this.setState({ emailFocus: true })}
                                // onBlur={e => this.setState({ emailFocus: false })}
                            />
                            </InputGroup>


                            {/* STATUS INPUT */}

                            <InputGroup
                            // className={classnames({
                            //     "input-group-focus": this.state.passwordFocus
                            // })}
                            >
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="tim-icons icon-laptop" />
                                </InputGroupText>
                            </InputGroupAddon>

                            <Input
                            //  value={this.state.status}
                                name="status"
                                placeholder="Status (how experienced are you in your listed skills)"
                                type="text"
                                autoComplete="off"
                                onChange={this.onFormChange}
                                // onFocus={e =>
                                // this.setState({ passwordFocus: true })
                                // }
                                // onBlur={e =>
                                // this.setState({ passwordFocus: false })
                                // }
                            />
                            </InputGroup>


                            {/* COMPANY INPUT */}

                            <InputGroup
                            // className={classnames({
                            //     "input-group-focus": this.state.passwordFocus
                            // })}
                            >
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="tim-icons icon-world" />
                                </InputGroupText>
                            </InputGroupAddon>

                            <Input
                            //  value={this.state.company}
                                name="company"
                                placeholder="Company"
                                type="text"
                                autoComplete="off"
                                onChange={this.onFormChange}
                                // onFocus={e =>
                                // this.setState({ companyFocus: true })
                                // }
                                // onBlur={e =>
                                // this.setState({ companyFocus: false })
                                // }
                            />
                            </InputGroup>

                            {/* WEBSITE INPUT */}

                            <InputGroup
                            // className={classnames({
                            //     "input-group-focus": this.state.passwordFocus
                            // })}
                            >
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="tim-icons icon-mobile" />
                                </InputGroupText>
                            </InputGroupAddon>

                            <Input
                            //  value={this.state.website}
                                name="website"
                                placeholder="Personal Website"
                                type="text"
                                autoComplete="off"
                                onChange={this.onFormChange}
                                // onFocus={e =>
                                // this.setState({ websiteFocus: true })
                                // }
                                // onBlur={e =>
                                // this.setState({ websiteFocus: false })
                                // }
                            />
                            </InputGroup>

                            {/* GitHub INPUT */}

                            <InputGroup
                            // className={classnames({
                            //     "input-group-focus": this.state.passwordFocus
                            // })}
                            >
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fab fa-github" />
                                </InputGroupText>
                            </InputGroupAddon>

                            <Input
                            //  value={this.state.website}
                                name="github"
                                placeholder="GitHub Username"
                                type="text"
                                autoComplete="off"
                                onChange={this.onFormChange}
                                // onFocus={e =>
                                // this.setState({ gitFocus: true })
                                // }
                                // onBlur={e =>
                                // this.setState({ gitFocus: false })
                                // }
                            />
                            </InputGroup>

                            {/* LOCATION INPUT */}

                            <InputGroup
                            // className={classnames({
                            //     "input-group-focus": this.state.passwordFocus
                            // })}
                            >
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="tim-icons icon-compass-05" />
                                </InputGroupText>
                            </InputGroupAddon>

                            <Input
                            //  value={this.state.location}
                                name="location"
                                placeholder="Location"
                                type="text"
                                autoComplete="off"
                                onChange={this.onFormChange}
                                // onFocus={e =>
                                // this.setState({ locationFocus: true })
                                // }
                                // onBlur={e =>
                                // this.setState({ locationFocus: false })
                                // }
                            />
                            </InputGroup>

                            {/* BIO INPUT */}

                            <InputGroup
                            // className={classnames({
                            //     "input-group-focus": this.state.passwordFocus
                            // })}
                            >
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="tim-icons icon-paper" />
                                </InputGroupText>
                            </InputGroupAddon>

                            <textarea
                            //  value={this.state.location}
                                name="bio"
                                placeholder="Bio"
                                type="text"
                                autoComplete="off"
                                className="form-control"
                                style={{borderTop:'1px info solid'}}
                                onChange={this.onFormChange}
                                // onFocus={e =>
                                // this.setState({ bioFocus: true })
                                // }
                                // onBlur={e =>
                                // this.setState({ bioFocus: false })
                                // }
                            />
                            </InputGroup>

                        </Form>

                        </CardBody>

                        <CardFooter>
                            <Button form="registerForm" type="submit" className="btn-round" color="info" size="lg">
                                Save Changes
                            </Button>
                        </CardFooter>

                    </Card>
                    </Col>
                </Row>

                <div className="register-bg" />
                    <div
                        className="square square-1"
                        id="square1"
                        style={{ transform: this.state.squares1to6 }}
                    />
                    <div
                        className="square square-2"
                        id="square2"
                        style={{ transform: this.state.squares1to6 }}
                    />
                    <div
                        className="square square-3"
                        id="square3"
                        style={{ transform: this.state.squares1to6 }}
                    />
                    <div
                        className="square square-4"
                        id="square4"
                        style={{ transform: this.state.squares1to6 }}
                    />
                    <div
                        className="square square-5"
                        id="square5"
                        style={{ transform: this.state.squares1to6 }}
                    />
                    <div
                        className="square square-6"
                        id="square6"
                        style={{ transform: this.state.squares1to6 }}
                    />
                    </Container>
                </div>
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
export default connect(mapStateToProps, {setAlert, register})(RegisterPage)