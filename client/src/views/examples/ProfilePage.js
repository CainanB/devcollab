

import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Redirect, Link } from "react-router-dom";
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
  Col
} from "reactstrap";

// core components
import Navbar from "../../components/Navbars/Navbar.js";
import Footer from "../../components/Footer/Footer.js";
import {getProfile, addProfileImage} from '../../actions/profile'
import {connect} from 'react-redux'
import PostItem from './PostItem'

let ps = null;

class ProfilePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tabs: 1,
      commentColor: '#6c757d',
      textAreaJSX: null,
      profileimg: ""
    }

  }

  componentDidUpdate(prevProps, prevState) {
    this.props.getProfile()
  }
  componentDidMount()
  {
    
    this.props.getProfile()
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
  uploadImage= async e => {
    console.log(e.target.files)
    const files = e.target.files

    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'devcollab')
    this.props.addProfileImage(data)


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

  check = () => {

    let jsx = null;


    // let color = this.state.commentColor;

    console.log(this.props.profile.profile)


    if(this.props.profile.profile !== null && this.props.profile.profile !== undefined && this.props.profile.profile.status !== undefined)
    {
      jsx =  <>

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
                <h1 className="profile-title text-left">{this.props.profile.profile.status.split(" ")[0]}</h1>
                <h5 className="text-on-back">Dev</h5>
                <p className="profile-description">
                  {this.props.profile.profile.bio}
                </p>

              </Col>
              <Col className="ml-auto mr-auto mt-3" lg="5" md="7">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid rounded-circle"

                      // their uploaded profile image
                      
                      src={
                        this.props.profile.profile.profileimg ?
                        this.props.profile.profile.profileimg :
                        "https://coursereport-s3-production.global.ssl.fastly.net/rich/rich_files/rich_files/5668/s300/social-media.png"
                      }
                      // src={require("../../assets/img/profile.jpeg")}
                      
                    />
                      <input type="file" 
                            name="file"
                            placeholder="Upload an image"
                            onChange={this.uploadImage}
                            
                            />
                    <h4 className="title">{this.props.profile.profile.user.name}</h4>

      <h5 className="text-center"><i className="tim-icons icon-square-pin"></i>{this.props.profile.profile.location}</h5>
                    <Link to="/edit-profile" ><Button ><b style={{color:'white'}}>Edit Profile</b></Button></Link>


                    {/* LOCATION */}

                  </CardHeader>
                  <CardBody>
                    <Nav
                      className="nav-tabs-primary justify-content-center"
                      tabs
                    >
                      <NavItem>
                        <NavLink
                          
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
                          
                          
                          onClick={e => this.toggleTabs(e, "tabs", 2)}
                          href="#"
                          className="bg-dark text-light"
                          style={{border:'gray 1px solid'}}
                        >
                          Skills
                        </NavLink>
                      </NavItem>
                      
                    </Nav>
                    <TabContent
                      className="tab-subcategories"
                      activeTab={"tab" + this.state.tabs}
                    >
                      {/* Personal Website Tab */}
                      <TabPane tabId="tab1" className="text-left" style={{fontSize:'1.2em'}}>

                        <i className="tim-icons icon-single-02"></i><b> Portfolio </b> <a rel="noopener noreferrer" href={this.props.profile.profile.website} target="_blank"> {this.props.profile.profile.website} </a> <br/>
                        <i className="fab fa-github"></i><b> Github </b> <a rel="noopener noreferrer" href={`https://github.com/${this.props.profile.profile.githubusername}`} target="_blank"> github.com/{this.props.profile.profile.githubusername} </a> <br/>
                        <i className="tim-icons icon-bank"></i><b> Company </b> {this.props.profile.profile.company}

                      </TabPane>

                      {/* Skills Tab */}
                      <TabPane tabId="tab2" className="text-center" style={{fontSize:'1.5em'}}>

                        <b>{this.props.profile.profile.skills}</b>
                        
                      </TabPane>

                    </TabContent>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>

        <section className="section pt-1">
          <Container>

            <Row>

              <Col md="12" className="ml-0 pl-0">
                
                    <h5 className="text-on-back">posts</h5>
                  
              </Col>

                {this.props.profile.profile.userPosts.map(post =>{
                  return <PostItem key={post._id} post={post}/>
                })}

            </Row>

          </Container>
        </section>
        <Footer />
      </div>
      </>
    }
    else
    {
      jsx = <>loading</>
    }

    return jsx;

  }

  // start render

  render() {

    if(this.props.isAuthenticated === false || this.props.isAuthenticated === null)
    {
      return <Redirect to="/landing-page"/>
    }

    return (

      // function with conditional profile rendering used to avoid annoying ternery syntax

      this.check()

    )
  }
}


const mapStateToProps = state => {
  return{
    auth: state.auth,
    profile: state.profile,
    isAuthenticated: state.auth.isAuthenticated
  }

}

export default connect(mapStateToProps,{getProfile, addProfileImage})(ProfilePage);