/*!

=========================================================
* BLK Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import classnames from "classnames";
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from '../../actions/auth'
// react plugin used to create charts
// import { Line } from "react-chartjs-2";
// reactstrap components
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

class LandingPage extends React.Component {

    state = {

      email: "",
      password: ""
  
    };

    onFormChange=(e)=>{
      this.setState({[e.target.name]: e.target.value})
    }
  
    onFormSubmit = async (e) =>{
      
      
      e.preventDefault();
  
      this.props.login({email: this.state.email, password: this.state.password})
  }

  componentDidMount() {
    document.body.classList.toggle("landing-page");
  }

  componentWillUnmount() {
    document.body.classList.toggle("landing-page");
  }

  render() {
    if(this.props.isAuthenticated && this.props.auth.user !== null){
      return <Redirect to="/profile-page" />
  }
    return (
      <>
        <Navbar />

        <div className="wrapper">

          <div className="page-header">
            <img
              alt="..."
              className="path"
              src={require("../../assets/img/blob.png")}
            />
            <img
              alt="..."
              className="path2"
              src={require("../../assets/img/path2.png")}
            />
            <img
              alt="..."
              className="shapes triangle"
              src={require("../../assets/img/triunghiuri.png")}
            />
            <img
              alt="..."
              className="shapes wave"
              src={require("../../assets/img/waves.png")}
            />
            <img
              alt="..."
              className="shapes squares"
              src={require("../../assets/img/patrat.png")}
            />
            <img
              alt="..."
              className="shapes circle"
              src={require("../../assets/img/cercuri.png")}
            />
            <div className="content-center">
              <Row className="row-grid justify-content-between align-items-center text-left mb-5">
                <Col lg="5" md="5">
                  <h1 className="text-white">
                    Welcome to <br />
                    <span className="text-white">Dev Collab</span>
                  </h1>
                  <p className="text-white mb-3">
                    Dev collab is a tool for developers to connect, talk about their projects and collaborate all in one convenient place.
                    Keep scrolling if you aren't sold yet. Otherwise register an account by clicking "Get Started".
                  </p>
                  <div className="btn-wrapper mb-3">
                    <p className="category text-success d-inline">
                      Get Started
                    </p>
                    <Link to="/register-page">
                    <Button
                      className="btn-link"
                      color="success"
                      size="sm"
                    >
                      <i className="tim-icons icon-minimal-right" />
                    </Button>
                    </Link>
                  </div>
                  <div className="btn-wrapper">
                    <div className="button-container">
                        {/* optional buttons can go here */}
                    </div>
                  </div>
                </Col>
                <Col lg="5" md="6">
                <Card className="card-register">
                      <CardHeader>
                      <CardImg
                          alt="..."
                          src={require("../../assets/img/square2.png")}
                        />
                        <CardTitle tag="h4" style={{fontSize:'4em'}} className="ml-2 text-light">Sign in</CardTitle>
                      </CardHeader>
                      <CardBody>
                        {/* FORM START */}
                        <Form className="form" onSubmit={this.onFormSubmit} id="signinForm">
                          <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.fullNameFocus
                            })}
                          >
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
                              autoComplete="new-password"
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
                        <Button form="signinForm" type="submit" className="btn-round" color="secondary" size="lg">
                          Sign in
                        </Button>
                      </CardFooter>
                    </Card>
                </Col>
              </Row>
            </div>
          </div>
          <section className="section section-lg p-0">
            <section className="section p-0">
              <img
                alt="..."
                className="path"
                src={require("../../assets/img/path4.png")}
              />
              <Container>
                <Row className="row-grid justify-content-between">
                  <Col className="mt-lg-5" md="5">
                    <Row>
                      <Col className="px-2 py-2" lg="6" sm="12">
                        <Card className="card-stats">
                          <CardBody>
                            <Row>
                              <Col md="4" xs="5" className="pr-0">
                                <div className="icon-big text-center icon-warning">
                                  <i className="tim-icons icon-atom text-warning" />
                                </div>
                              </Col>
                              <Col md="8" xs="7" className="pl-0">
                                <div className="numbers">
                                  <CardTitle style={{fontSize:"20px"}} tag="p">Front-end</CardTitle>
                                  <p />
                                  <p className="card-category">React</p>
                                </div>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col className="px-2 py-2" lg="6" sm="12">
                      {/* upper bg-default*/}
                        <Card className="card-stats">
                          <CardBody>
                            <Row>
                              <Col md="4" xs="5" className="pr-0">
                                <div className="icon-big text-center icon-warning">
                                  <i className="tim-icons icon-coins text-white" />
                                </div>
                              </Col>
                              <Col md="8" xs="7" className="pl-0">
                                <div className="numbers">
                                  <CardTitle style={{fontSize:"18px"}} tag="p">Database</CardTitle>
                                  <p />
                                  <p className="card-category">MongoDB</p>
                                </div>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="px-2 py-2" lg="6" sm="12">
                        <Card className="card-stats">
                          <CardBody>
                            <Row>
                              <Col md="4" xs="5" className="pr-0">
                                <div className="icon-big text-center icon-warning">
                                  <i className="tim-icons icon-components text-info" />
                                </div>
                              </Col>
                              <Col md="8" xs="7" className="pl-0">
                                <div className="numbers">
                                  <CardTitle style={{fontSize:"20px"}} tag="p">Back-end</CardTitle>
                                  <p />
                                  <p className="card-category">Node</p>
                                </div>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col className="px-2 py-2" lg="6" sm="12">
                        <Card className="card-stats">
                          <CardBody>
                            <Row>
                              <Col md="4" xs="5" className="pr-0">
                                <div className="icon-big text-center icon-warning">
                                  <i className="tim-icons icon-credit-card text-success" />
                                </div>
                              </Col>
                              <Col md="8" xs="7" className="pl-0">
                                <div className="numbers">
                                  <CardTitle style={{fontSize:"20px"}} tag="p">VCS</CardTitle>
                                  <p />
                                  <p className="card-category">GitHub</p>
                                </div>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                  <Col md="6">
                    <div className="mt-4 pl-md-5">
                      <h1>
                        Our Shared <br />
                        Philosophy
                      </h1>
                      <p>
                        As recent coding bootcamp graduates, our team strives to create an environment where learning and mentorship is at the forefront. 
                        Big projects take a ton of time and effort. And you don't always know where to begin, or where to go next.
                      </p>
                      <br />
                      <p>
                        Whether you are new to coding, or have been coding since you could type... there is a place for you here. 
                        With DEV Collab, we want to create a casual space where developers can socialize and discuss projects and 
                        common coding practices.
                      </p>
                      <br />

                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
          </section>
          <section className="section section-lg">
            <img
              alt="..."
              height="300px"
              className="path"
              src={require("../../assets/img/path4.png")}
            />
            <img
              alt="..."
              height="300px"
              className="path2"
              src={require("../../assets/img/path5.png")}
            />
            <img
              alt="..."
              className="path3"
              src={require("../../assets/img/path2.png")}
            />
            <Container style={{paddingTop:"1em"}}>
              <Row className="justify-content-center">
                <Col lg="12">
                  <h1 className="text-center">Connect through code</h1>
                  <Row className="row-grid justify-content-center">
                    <Col lg="3">
                      <div className="info" style={{paddingTop:"1.0rem"}}>
                        <div className="icon icon-primary">
                          <i className="tim-icons icon-money-coins" />
                        </div>
                        <h4 className="info-title">Discover Talent</h4>
                        <hr className="line-primary" />
                        <p>
                          Connect with developers who have are skilled with the technologies you are trying to learn or need for your project.
                        </p>
                      </div>
                    </Col>
                    <Col lg="3">
                      <div className="info" style={{paddingTop:"1.0rem"}}>
                        <div className="icon icon-warning">
                          <i className="tim-icons icon-chart-pie-36" />
                        </div>
                        <h4 className="info-title">Write Code</h4>
                        <hr className="line-warning" />
                        <p>
                          Find projects that match your skill set and chip in. Successful contributions will give you more/stronger connections
                          and good karma.
                        </p>
                      </div>
                    </Col>
                    <Col lg="3">
                      <div className="info" style={{paddingTop:"1.0rem"}}>
                        <div className="icon icon-success">
                          <i className="tim-icons icon-single-02" />
                        </div>
                        <h4 className="info-title">Meet Developers</h4>
                        <hr className="line-success" />
                        <p>
                          If all else fails in your search for answers, there's always other developers.
                          Ask about their current projects, share your knowledge and open doors that lead to more doors.
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section section-lg section-safe p-0">
            <img
              alt="..."
              height="300px"
              className="path"
              src={require("../../assets/img/path5.png")}
            />
          </section>
          <section className="section section-lg">
            <img
              alt="..."
              className="path"
              height="300px"
              src={require("../../assets/img/path4.png")}
            />
            <img
              alt="..."
              className="path2"
              src={require("../../assets/img/path2.png")}
            />

          </section>
          <section className="section section-lg section-coins m-0 p-0">
            <img
              alt="..."
              className="path"
              height="240px"
              src={require("../../assets/img/path3.png")}
            />
          </section>
          <Footer />
        </div>
      </>
    );
  }
}


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth
})

export default connect(mapStateToProps, {login})(LandingPage)

