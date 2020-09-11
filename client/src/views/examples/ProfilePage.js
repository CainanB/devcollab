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
// import classnames from "classnames";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledCarousel
} from "reactstrap";

// core components
import Navbar from "../../components/Navbars/Navbar.js";
import Footer from "../../components/Footer/Footer.js";

const carouselItems = [
  {
    src: require("../../assets/img/denys.jpg"),
    altText: "Slide 1",
    caption: "Big City Life, United States"
  },
  {
    src: require("../../assets/img/fabien-bazanegue.jpg"),
    altText: "Slide 2",
    caption: "Somewhere Beyond, United States"
  },
  {
    src: require("../../assets/img/mark-finn.jpg"),
    altText: "Slide 3",
    caption: "Stocks, United States"
  }
];

let ps = null;

class ProfilePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tabs: 1
    }

  }

  componentDidMount()
  {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");

      let tables = document.querySelectorAll(".table-responsive");

      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }

    }
    document.body.classList.toggle("profile-page");
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
    document.body.classList.toggle("profile-page");
  }

  toggleTabs = (e, stateName, index) => {

    e.preventDefault();

    this.setState({
      [stateName]: index
    })

  }

  // start render

  render() {
    return (
      <>
        <Navbar />

        <div className="wrapper">
          <div className="page-header">
            <img
              alt="..."
              className="dots"
              src={require("../../assets/img/dots.png")}
            />
            <img
              alt="..."
              className="path"
              src={require("../../assets/img/path4.png")}
            />

            <Container className="align-items-center mb-5">
              <Row>
                <Col lg="5" md="5">
                  <h1 className="profile-title text-left">Junior</h1>
                  <h5 className="text-on-back">Dev</h5>
                  <p className="profile-description">
                    I am a junior developer looking for some help with my React projects.
                    I recently graduated a coding bootcamp called Digitalcrafts where I learned full
                    stack development. I used to be a baker by trade, but now it is a hobby and I am moving onto bigger and better
                    things.
                  </p>

                </Col>
                <Col className="ml-auto mr-auto" lg="5" md="7">
                  <Card className="card-coin card-plain">
                    <CardHeader>
                      <img
                        alt="..."
                        className="img-center img-fluid rounded-circle"

                        // their uploaded profile image
                        src={require("../../assets/img/profile.jpeg")}
                      />
                      <h4 className="title">Micah Peterson</h4>
                    </CardHeader>
                    <CardBody>
                      <Nav
                        className="nav-tabs-primary justify-content-center"
                        tabs
                      >
                        <NavItem>
                          <NavLink
                            // className={classnames({
                            //   active: this.state.tabs === 1
                            // })}
                            onClick={e => this.toggleTabs(e, "tabs", 1)}
                            href="#"
                            className="bg-dark text-light"
                            style={{border:'gray 1px solid'}}
                          >
                            Websites
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            // className={classnames({
                            //   active: this.state.tabs === 2
                            // })}
                            onClick={e => this.toggleTabs(e, "tabs", 2)}
                            href="#"
                            className="bg-dark text-light"
                            style={{border:'gray 1px solid'}}
                          >
                            Education
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            // className={classnames({
                            //   active: this.state.tabs === 3
                            // })}
                            onClick={e => this.toggleTabs(e, "tabs", 3)}
                            href="#"
                            className="bg-dark text-light"
                            style={{border:'gray 1px solid'}}
                          >
                            Experience
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent
                        className="tab-subcategories"
                        activeTab={"tab" + this.state.tabs}
                      >
                        {/* Personal Website Tab */}
                        <TabPane tabId="tab1" className="text-left">

                          <b>Portfolio:</b> <a rel="noopener noreferrer" href="https://petersonprojects.github.io" target="_blank"> petersonprojects.github.io </a> <br/>
                          <b>Github:</b> <a rel="noopener noreferrer" href="https://github.com/petersonprojects" target="_blank"> github.com/petersonprojects </a> <br/>
                          <b>Company:</b> <a rel="noopener noreferrer" href="https://www.digitalcrafts.com/" target="_blank"> digitalcrafts.com </a>

                        </TabPane>

                        {/* Education Tab */}
                        <TabPane tabId="tab2" className="text-left">

                          <b>University:</b> University of Texas at Austin <br/>
                          <b>Technical/Vocational:</b> Digitalcrafts
                          
                        </TabPane>

                        {/* Experience Tab */}
                        <TabPane tabId="tab3" className="text-left">
                        
                          <b>Company: </b>Easy Tiger <br/>
                          <b>Role: </b>Asst. Manager <br/>
                          <b>Skills: </b>baking, leadership, food-service, communication
                        
                        </TabPane>
                      </TabContent>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="section">
            <Container>
              <Row className="justify-content-between">
                <Col md="5">
                  <Row className="justify-content-between align-items-center">
                    <UncontrolledCarousel items={carouselItems} />
                  </Row>
                </Col>
                <Col md="6">
                  <h1 className="profile-title text-left">Projects</h1>
                  <h5 className="text-on-back">3</h5>
                  <p className="profile-description text-left">
                    Short description about the focus of your projects.
                    Three project pictures can be featured here.
                  </p>
                  <div className="btn-wrapper pt-3">
                    <Button
                      className="btn-simple"
                      color="info"
                      href="#"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="tim-icons icon-link-72" /> Connect
                    </Button>
                    <Button
                      className="btn-simple"
                      color="info"
                      href="#"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="tim-icons icon-check-2" /> Follow
                    </Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <section className="section pt-1">
            <Container>
              <Row>
                <Col md="12">
                  <Card className="card-plain">
                    <CardHeader>
                      <h1 className="profile-title text-left">Posts</h1>
                      <h5 className="text-on-back">my</h5>
                    </CardHeader>

                  </Card>
                </Col>

                <Card>

                    <CardHeader>
                      <b style={{fontSize:'3em'}}>Post Title</b> <span className="text-muted">from Micah Peterson</span>
                    </CardHeader>
                    
                    <CardBody style={{color:'white'}}>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </CardBody>

                </Card>
              </Row>
            </Container>
          </section>
          <Footer />
        </div>
      </>
    );
  }
}

export default ProfilePage;
