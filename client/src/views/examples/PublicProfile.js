

import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Link } from "react-router-dom";
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
import {getProfileById, addProfileImage} from '../../actions/profile'
import {connect} from 'react-redux'
import PostItem from './PostItem'

let ps = null;

class PublicProfile extends React.Component {

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
    ("component did update")
    console.log(this.props.profilebyid)
  }
  componentWillMount(){
    // this.props.getProfileById(this.props.match.params.id)
  }
  componentDidMount()
  {
    console.log("MOunted")
    
    this.props.getProfileById(this.props.match.params.id)
    console.log(this.props.profile)
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




 
  
  

  // start render

  render() {

    return (

     <>   
    { this.props.profile.profilebyid === null || this.props.profile.loading ? "Loading" : <>
    
     

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
              <h1 className="profile-title text-left">{this.props.profile.profilebyid.status.split(" ")[0]}</h1>
              <h5 className="text-on-back">Dev</h5>
              <p className="profile-description">
                {this.props.profile.profilebyid.bio}
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
                      this.props.profile.profilebyid.profileimg ?
                      this.props.profile.profilebyid.profileimg :
                      "https://coursereport-s3-production.global.ssl.fastly.net/rich/rich_files/rich_files/5668/s300/social-media.png"
                    }
                    // src={require("../../assets/img/profile.jpeg")}
                    
                  />

                  <h4 className="title">{this.props.profile.profilebyid.user.name}</h4>

    <h5 className="text-center"><i className="tim-icons icon-square-pin"></i>{this.props.profile.profilebyid.location}</h5>


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

                      <i className="tim-icons icon-single-02"></i><b> Portfolio </b> <a rel="noopener noreferrer" href={this.props.profile.profilebyid.website} target="_blank"> {this.props.profile.profilebyid.website} </a> <br/>
                      <i className="fab fa-github"></i><b> Github </b> <a rel="noopener noreferrer" href={`https://github.com/${this.props.profile.profilebyid.githubusername}`} target="_blank"> github.com/{this.props.profile.profilebyid.githubusername} </a> <br/>
                      <i className="tim-icons icon-bank"></i><b> Company </b> {this.props.profile.profilebyid.company}

                    </TabPane>

                    {/* Skills Tab */}
                    <TabPane tabId="tab2" className="text-center" style={{fontSize:'1.5em'}}>

                      <b>{this.props.profile.profilebyid.skills}</b>
                      
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

              {this.props.profile.profilebyid.userPosts.map(post =>{
                return <PostItem key={post._id} post={post}/>
              })}

          </Row>

        </Container>
      </section>
      <Footer />
    </div>
    </>
              
            }</>
    )
  }
}


const mapStateToProps = state => {
  return{
    auth: state.auth,
    profile: state.profile
  }

}

export default connect(mapStateToProps,{getProfileById, addProfileImage})(PublicProfile);