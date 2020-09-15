
import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import {logout} from '../../actions/auth'
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

class PagesNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      color: "navbar-transparent"
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.changeColor);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.changeColor);
  }

  updateNav = () => {

      let navJSX;

      if(this.props.isAuthenticated)
      {
  
        navJSX = <>
         <NavItem>
                <Link to="/posts">
                  <Button
                    className="nav-link d-lg-block"
                    color="secondary"
                  >
                    Posts
                  </Button>
                </Link>
              </NavItem>
        <NavItem>
        <Link to="/profile-page"
        >
        <Button
          className="nav-link d-lg-block"
          color="secondary"
        >
          Profile
        </Button>
        </Link>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} to="/" onClick={this.props.logout}>
          Sign out
        </NavLink>
      </NavItem> </>

      }
  
      else if(!this.props.isAuthenticated || this.props.isAuthenticated === null)
      {
        navJSX = <><NavItem>
          <Link to="/register-page"
          >
          <Button
            className="nav-link d-lg-block"
            color="secondary"
          >
            Register
          </Button>
          </Link>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/">
            Sign in
          </NavLink>
        </NavItem> </>

      }

      return navJSX;
  
  }
  changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      this.setState({
        color: "bg-info"
      });
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      this.setState({
        color: "navbar-transparent"
      });
    }
  };
  toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  onCollapseExiting = () => {
    this.setState({
      collapseOut: "collapsing-out"
    });
  };
  onCollapseExited = () => {
    this.setState({
      collapseOut: ""
    });
  };

  render() {
    return (
      <Navbar
        className={"fixed-top " + this.state.color}
        color-on-scroll="100"
        expand="lg"
      >
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              to="/"
              id="navbar-brand"
              tag={Link}
            >
              <span>DEV•</span>
              Collab
            </NavbarBrand>
            <UncontrolledTooltip placement="bottom" target="navbar-brand">
              By Cainan Barboza and Micah Peterson
            </UncontrolledTooltip>


            <button
              aria-expanded={this.state.collapseOpen}
              className="navbar-toggler navbar-toggler"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <Collapse
            className={"justify-content-end " + this.state.collapseOut}
            navbar
            isOpen={this.state.collapseOpen}
            onExiting={this.onCollapseExiting}
            onExited={this.onCollapseExited}
          >
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <a href="/" onClick={e => e.preventDefault()}>
                    DEV•Collab
                  </a>
                </Col>
                <Col className="collapse-close text-right" xs="6">
                  <button
                    aria-expanded={this.state.collapseOpen}
                    className="navbar-toggler"
                    onClick={this.toggleCollapse}
                  >
                    <i className="tim-icons icon-simple-remove" />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav navbar>
            
              <NavItem className="p-0">
                <NavLink
                  data-placement="bottom"
                  href="https://github.com/CainanB/devcollab"
                  rel="noopener noreferrer"
                  target="_blank"
                  title="Find us on GitHub"
                >
                  <i className="fab fa-github" />
                  <p className="d-lg-none d-xl-none">Github</p>
                </NavLink>
              </NavItem>

             
              
              {/* update navbar with profile and sign out button */}

              {this.updateNav()}

              <NavItem>
                <NavLink href="https://github.com/CainanB/devcollab/issues" target="_blank">
                  Have an issue?
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {

    isAuthenticated: state.auth.isAuthenticated

  }
}

export default connect(mapStateToProps, {logout})(PagesNavbar);
