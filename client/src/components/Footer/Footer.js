
import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer mt-5" style={{borderColor:'#435DB5'}}>
        <Container>
          <Row >
            <Col md="3" className="d-flex justify-content-center">
              <h1 className="title">DEV•Collab</h1>
            </Col>
            <Col md="3">
              <Nav>
                <NavItem>
                  <NavLink to="/landing-page" tag={Link}>
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/register-page" tag={Link}>
                    Register
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/profile-page" tag={Link}>
                    Profile
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
            <Col md="3">
              <Nav>
                <NavItem>
                  <NavLink target="_blank" href="https://www.linkedin.com/search/results/all/?keywords=micah%20peterson%20OR%20cainan%20barboza&origin=GLOBAL_SEARCH_HEADER">
                    Contact Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink target="_blank" href="https://github.com/CainanB/devcollab">
                    About Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink target="_blank" href="https://opensource.org/licenses/MIT">
                    License
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
            <Col md="3">
              <h3 className="mt-4">View Source Code</h3>
              <div className="btn-wrapper profile">
                
                <Button
                  className="btn-icon btn-neutral btn-round btn-simple"
                  color="default"
                  href="https://github.com/CainanB/devcollab"
                  id="tooltip622135962"
                  target="_blank"
                >
                  <i className="fab fa-github" />
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip622135962">
                  Source Code
                </UncontrolledTooltip>
                {/* <Button
                  className="btn-icon btn-neutral btn-round btn-simple"
                  color="default"
                  href="https://www.facebook.com/creativetim"
                  id="tooltip230450801"
                  target="_blank"
                >
                  <i className="fab fa-facebook-square" />
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip230450801">
                  Like us
                </UncontrolledTooltip> */}
                {/* <Button
                  className="btn-icon btn-neutral btn-round btn-simple"
                  color="default"
                  href="https://dribbble.com/creativetim"
                  id="tooltip318450378"
                  target="_blank"
                >
                  <i className="fab fa-dribbble" />
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip318450378">
                  Follow us
                </UncontrolledTooltip> */}
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

export default Footer;
