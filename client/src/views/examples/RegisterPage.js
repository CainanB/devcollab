
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

          const newUser= {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            }

            this.props.register({
              ...newUser
          })
          
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
  render() {
    if(this.props.isAuthenticated && this.props.isNewUser){
      return <Redirect to="/create-profile"/>
    }
    return (
      <>
        <Navbar />
        
        <div className="wrapper">
          <div className="page-header">
            <div className="page-header-image" />
            <div className="content">
              <Container>
                <Row>
                  <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
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
                        <CardImg
                          alt="..."
                          src={require("../../assets/img/square2.png")}
                        />
                        <CardTitle tag="h4" className="ml-2">Register</CardTitle>
                      </CardHeader>
                      <CardBody>
                        {/* FORM START */}
                        <Form className="form" onSubmit={this.onFormSubmit} id="registerForm">
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
                            {/* NAME INPUT */}
                            <Input
                            value={this.state.name}
                              name="name"
                              placeholder="Full Name"
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
                          <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.emailFocus
                            })}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-email-85" />
                              </InputGroupText>
                            </InputGroupAddon>
                            {/* EMAIL INPUT */}
                            <Input
                            value={this.state.email}
                              name="email"
                              onChange={this.onFormChange}
                              autoComplete="off"
                              placeholder="Email"
                              type="text"
                              onFocus={e => this.setState({ emailFocus: true })}
                              onBlur={e => this.setState({ emailFocus: false })}
                            />
                          </InputGroup>
                          <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.passwordFocus
                            })}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-lock-circle" />
                              </InputGroupText>
                            </InputGroupAddon>
                            {/* PASSWORD INPUT */}
                            <Input
                            value={this.state.password}
                              name="password"
                              placeholder="Password"
                              type="password"
                              autoComplete="off"
                              onChange={this.onFormChange}
                              onFocus={e =>
                                this.setState({ passwordFocus: true })
                              }
                              onBlur={e =>
                                this.setState({ passwordFocus: false })
                              }
                            />
                          </InputGroup>
                          <FormGroup check className="text-left">
                            <Label check>
                              <Input type="checkbox" />
                              <span className="form-check-sign" />I agree to the{" "}
                              <a
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                              >
                                terms and conditions
                              </a>
                              .
                            </Label>
                          </FormGroup>
                        </Form>
                      </CardBody>
                      <CardFooter>
                      {/* <Link to="/create-profile"> */}
                        <Button form="registerForm" type="submit" className="btn-round" color="info" size="lg"
                        >
                          Get Started
                        </Button>
                      {/* </Link> */}
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
  isAuthenticated: state.auth.isAuthenticated,

  isNewUser: state.auth.isNewUser
})
export default connect(mapStateToProps, {setAlert, register})(RegisterPage)
