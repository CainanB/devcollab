import React from "react";
import classnames from "classnames";
// import axios from 'axios';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {setAlert} from '../../actions/alert'
import {createProfile, getProfile} from '../../actions/profile'
import '../../assets/css/EditProfile.css'
// reactstrap components
import { Dropdown } from 'react-bootstrap';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
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
    isChanged: false,
    status: "",
    saved: false,
    formData: {
        company: '',
        website: '',
        location: '',
        skills: '',
        githubusername: '',
        bio: '',
    
    }

    };

    onFormChange=(e)=>{
        this.setState({
            formData :{
                ...this.state.formData,
                [e.target.name]: e.target.value
            },
            saved: false
        }, ()=>{console.log(this.state.formData, this.state.status)})
    }

    onFormSubmit = async (e) =>{
        e.preventDefault();
        this.props.createProfile({...this.state.formData, status: this.state.status})
        this.setState({
            isChanged: true
        })
        
    }

    componentDidMount() {
        document.body.classList.toggle("register-page");
        document.documentElement.addEventListener("mousemove", this.followCursor);
        this.props.getProfile();
        this.setState({
            formData: {
                ...this.state.formData,
                company: this.props.profile.loading || !this.props.profile.profile.company ? '' : this.props.profile.profile.company,
                website: this.props.profile.loading || !this.props.profile.profile.website ? '' : this.props.profile.profile.website,
                location: this.props.profile.loading || !this.props.profile.profile.location ? '' : this.props.profile.profile.location,
                skills: this.props.profile.loading || !this.props.profile.profile.skills ? '' : this.props.profile.profile.skills.toString(),
                githubusername: this.props.profile.loading || !this.props.profile.profile.githubusername ? '' : this.props.profile.profile.githubusername,
                bio: this.props.profile.loading || !this.props.profile.profile.bio ? '' : this.props.profile.profile.bio,
            },
            status: this.props.profile.loading || !this.props.profile.profile.status ? '' : this.props.profile.profile.status.toString(),
         
        })
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



    setSelection = (e) => {

        let selection = e.target.innerHTML;
        
        this.setState({
            status: selection
        })

        console.log(`selection: ${selection}`)
    }

    checkSelected = () => {

        if(this.state.status === "")
        {
            return <>Skill Level</>
        }
        else
        {
            return <>{this.state.status}</>
        }
    }

    saveChanges = () => {
        
        this.setState({
            saved: true
        })

        console.log(this.state.saved)

    }

    checkSaved = () => {

        let jsx = <>Save Changes</>;

        if(this.state.saved === true)
        {
            jsx = <>
                <i className="tim-icons icon-check-2" style={{color:'white'}}></i>
            </>
        }
        else
        {
            jsx = <>Save Changes</>
        }

        return jsx;

    }

    checkRequired = () => {

        let jsx = null;

        if(this.state.formData.skills === "" || this.state.status === '')
        {
            jsx = null;
        }
        else if(this.state.formData.skills !== "" && this.state.status !== '' && this.state.saved === false)
        {
            jsx = <><Button 
            form="createForm" 
            type="submit" 
            className="btn-round" 
            color="info" 
            size="lg"
            onClick={this.saveChanges}
            >
            {this.checkSaved()}
        
            </Button>

            </>
        }
        else
        {
            jsx = <><Button 
            form="editForm" 
            type="submit" 
            className="btn-round" 
            color="info" 
            size="lg"
            onClick={this.saveChanges}
            >
            {this.checkSaved()}
        
            </Button>

            <Link to='/profile-page'>
                <Button className="btn-round" color="info" size="lg">

                Go To Profile
                </Button>
            </Link>

            </>

        }

        return jsx;
    }

    // handleImgHover = (e) => {

    //     let image = document.getElementById('profImage')
    //     image.addClass('profImage');
    // }

    // begin render function 

    render() {
    // if(this.state.isChanged) {
    //     return <Redirect to="/profile-page"/>
    // } 
    return (
        <>
        <Navbar />
        
        <div className="wrapper">
            <div className="page-header">
            <div className="page-header-image" />
            <div className="content">

            <Container >
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
                    <Card className="card-register mb-5">

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
                                    // onHover={(e)=>this.handleImgHover(e)}
                                    // id="profImage"
                                    className="img-fluid rounded-circle shadow-lg"
                                    style={{height:'150px', marginTop:'15px', width:'150px', border:'2px black solid'}}
                                    src={require("../../assets/img/profile.jpeg")}
                                    />
                                </Col>
                            </Row>




                            <CardTitle tag="h4" className="ml-2">
                                {this.props.profile == null ? "Create" : "Edit"}
                                </CardTitle>





                        </CardHeader>

                        <CardBody>

                        {/* FORM START */}

                        <Form className="form" onSubmit={this.onFormSubmit} id="editForm">


                            {/* STATUS INPUT */}

                            <InputGroup
                            className={classnames({
                                "input-group-focus": this.state.statusFocus
                            })}
                            >

                            {/* NAME INPUT */}


                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    {this.checkSelected()}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={(e)=>this.setSelection(e)} id="Beginner">Beginner</Dropdown.Item>
                                    <Dropdown.Item onClick={(e)=>this.setSelection(e)} id="Junior">Junior</Dropdown.Item>
                                    <Dropdown.Item onClick={(e)=>this.setSelection(e)} id="Mid-Level">Mid-Level</Dropdown.Item>
                                    <Dropdown.Item onClick={(e)=>this.setSelection(e)} id="Senior">Senior</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>


                            </InputGroup>

                            {/* Skills INPUT */}

                            <InputGroup

                                className={classnames({
                                    "input-group-focus": this.state.skillsFocus
                                })}
                            >

                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                <i className="tim-icons icon-bullet-list-67" />
                                </InputGroupText>
                            </InputGroupAddon>

                            <Input
                                name="skills"
                                autoComplete="off"
                                placeholder="Skills"
                                type="text"
                                onFocus={e => this.setState({ skillsFocus: true })}
                                onBlur={e => this.setState({ skillsFocus: false })}
                                onChange={this.onFormChange}
                                value={this.state.formData.skills}
                            />
                            </InputGroup>


                       

                            {/* COMPANY INPUT */}

                            <InputGroup
                            className={classnames({
                                "input-group-focus": this.state.companyFocus
                            })}
                            >
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="tim-icons icon-world" />
                                </InputGroupText>
                            </InputGroupAddon>

                            <Input
                                name="company"
                                placeholder="Company"
                                type="text"
                                autoComplete="off"
                                onFocus={e =>
                                    this.setState({ companyFocus: true })
                                }
                                onBlur={e =>
                                    this.setState({ companyFocus: false })
                                }
                                onChange={this.onFormChange}
                                value={this.state.formData.company}
                            />
                            </InputGroup>

                            {/* WEBSITE INPUT */}

                            <InputGroup
                            className={classnames({
                                "input-group-focus": this.state.websiteFocus
                            })}
                            >
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="tim-icons icon-mobile" />
                                </InputGroupText>
                            </InputGroupAddon>

                            <Input
                                name="website"
                                placeholder="Personal Website"
                                type="text"
                                autoComplete="off"
                                onFocus={e =>
                                    this.setState({ websiteFocus: true })
                                }
                                onBlur={e =>
                                    this.setState({ websiteFocus: false })
                                }
                                onChange={this.onFormChange}
                                value={this.state.formData.website}
                            />
                            </InputGroup>

                            {/* GitHub INPUT */}

                            <InputGroup
                            className={classnames({
                                "input-group-focus": this.state.gitFocus
                            })}
                            >
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fab fa-github" />
                                </InputGroupText>
                            </InputGroupAddon>

                            <Input
                            
                                name="githubusername"
                                placeholder="GitHub Username"
                                type="text"
                                autoComplete="off"
                                onFocus={e =>
                                    this.setState({ gitFocus: true })
                                }
                                onBlur={e =>
                                    this.setState({ gitFocus: false })
                                }
                                onChange={this.onFormChange}
                                value={this.state.formData.githubusername}
                            />
                            </InputGroup>

                            {/* LOCATION INPUT */}

                            <InputGroup
                            className={classnames({
                                "input-group-focus": this.state.locationFocus
                            })}
                            >
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="tim-icons icon-compass-05" />
                                </InputGroupText>
                            </InputGroupAddon>

                            <Input
                                name="location"
                                placeholder="Location"
                                type="text"
                                autoComplete="off"
                                onFocus={e =>
                                    this.setState({ locationFocus: true })
                                }
                                onBlur={e =>
                                    this.setState({ locationFocus: false })
                                }
                                onChange={this.onFormChange}
                                value={this.state.formData.location}
                            />
                            </InputGroup>

                            {/* BIO INPUT */}

                            <InputGroup
                            className={classnames({
                                "input-group-focus": this.state.bioFocus
                            })}
                            >
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="tim-icons icon-paper" />
                                </InputGroupText>
                            </InputGroupAddon>

                            <textarea
                                value={this.state.formData.bio}
                                name="bio"
                                placeholder="Bio"
                                type="text"
                                autoComplete="off"
                                className="form-control"
                                onFocus={e =>
                                    this.setState({ bioFocus: true })
                                }
                                onBlur={e =>
                                    this.setState({ bioFocus: false })
                                }
                                onChange={this.onFormChange}
                            />
                            </InputGroup>

                        </Form>

                        </CardBody>

                        <CardFooter style={{marginTop:'-10px'}}>

                            {this.checkRequired()}

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
    profile: state.profile
})
export default connect(mapStateToProps, {setAlert,createProfile, getProfile})(RegisterPage)