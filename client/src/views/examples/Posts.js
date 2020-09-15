
import React from "react";
import classnames from "classnames";
// import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import PostItem from './PostItem'
import {getPosts, addPost} from '../../actions/post'

import {Dropdown} from 'react-bootstrap';
import {
    CardHeader,
    CardFooter,
    Card,
    CardBody,
    Container,
    Row,
    Button,
    Form,
    FormControl,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Col
} from "reactstrap";

// core components
import Navbar from "../../components/Navbars/Navbar.js";
import Footer from "../../components/Footer/Footer.js";

class Posts extends React.Component {

    constructor()
    {
        super()

        this.state = {
            showForm: false,
            tech: "",
            techArray: [],
            title: "",
            text: ""
        }
    }

    componentDidMount = () => {
        this.props.getPosts()
    }

    setSelection = (e) => {

        let selection = e.target.innerHTML;
        let array = [...this.state.techArray, selection];
        let uniqueArray = [];

        array.forEach(item => {
            if(!uniqueArray.includes(item))
            {
                uniqueArray.push(item);
            }
        })
        
        this.setState({
            tech: selection,
            techArray: [...uniqueArray]
        })

    }

    displayTechArray = () => {

        let jsx = null;
        let array = this.state.techArray;

        if(array.length === 0)
        {
            jsx = null;
        }
        else
        {
            jsx = array.map(item => {

                return <Button onClick={(e)=>e.preventDefault()}> {item}</Button>
            })
        }

        return jsx;

    }

    checkSelected = () => {

        if(this.state.tech === "")
        {
            return <>Primary Language</>
        }
        else
        {
            return <>{this.state.tech}</>
        }
    }

    handleCreatePost = () => {

        let condition = this.state.showForm;

        if(condition === true)
        {
            this.setState({
                showForm: false
            })
        }
        else if(condition === false)
        {
            this.setState({
                showForm: true
            })
        }
    }

    showFormJSX = () => {

        let jsx = null;

        if(this.state.showForm === true)
        {
            jsx = <Form className="form" onSubmit={this.onFormSubmit} id="createPost">
                    {/* TECHNOLOGY INPUT */}

                        <InputGroup>

                            <Dropdown >
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    Add Technology Used
                                </Dropdown.Toggle>

                                <Dropdown.Menu> 
                                    <Dropdown.Item onClick={(e)=>this.setSelection(e)} id="JavaScript">JavaScript</Dropdown.Item>
                                    <Dropdown.Item onClick={(e)=>this.setSelection(e)} id="HTML">HTML</Dropdown.Item>
                                    <Dropdown.Item onClick={(e)=>this.setSelection(e)} id="CSS">CSS</Dropdown.Item>
                                    <Dropdown.Item onClick={(e)=>this.setSelection(e)} id="Python">Python</Dropdown.Item>
                                    <Dropdown.Item onClick={(e)=>this.setSelection(e)} id="Node">Node</Dropdown.Item>
                                    <Dropdown.Item onClick={(e)=>this.setSelection(e)} id="React">React</Dropdown.Item>
                                    <Dropdown.Item onClick={(e)=>this.setSelection(e)} id="Bootstrap">Bootstrap</Dropdown.Item>
                                    <Dropdown.Item onClick={(e)=>this.setSelection(e)} id="Redux">Redux</Dropdown.Item>
                                    <Dropdown.Item onClick={(e)=>this.setSelection(e)} id="postgreSQL">postgreSQL</Dropdown.Item>
                                    <Dropdown.Item onClick={(e)=>this.setSelection(e)} id="mongoDB">mongoDB</Dropdown.Item>
                                    <Dropdown.Item onClick={(e)=>this.setSelection(e)} id="Java">Java</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>


                        </InputGroup>

                        {this.displayTechArray()}

                    {/* POST TITLE INPUT */}

                    <InputGroup

                        className={classnames({
                        "input-group-focus": this.state.titleFocus
                        })}
                    >

                    <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                    <i className="tim-icons icon-bullet-list-67" />
                    </InputGroupText>
                    </InputGroupAddon>

                    <Input
                        name="title"
                        autoComplete="off"
                        placeholder="Post Title"
                        type="text"
                        onFocus={e => this.setState({ titleFocus: true })}
                        onBlur={e => this.setState({ titleFocus: false })}
                        value={this.state.title}
                        onChange={e=> this.setState({title: e.target.value})}
                    />
                    </InputGroup>



                    {/* TEXT INPUT */}

                    <InputGroup
                        className={classnames({
                            "input-group-focus": this.state.textFocus
                        })}
                    >
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <i className="tim-icons icon-paper" />
                        </InputGroupText>
                    </InputGroupAddon>

                    <textarea
                        name="textArea"
                        placeholder="Post text"
                        type="text"
                        autoComplete="off"
                        className="form-control"
                        onFocus={e =>
                            this.setState({ textFocus: true })
                        }
                        onBlur={e =>
                            this.setState({ textFocus: false })
                        }
                        value={this.state.text}
                        onChange={e=> this.setState({text: e.target.value})}
                    />
                    </InputGroup>
                    <Button
                        size='lg'
                        color="success"
                        onClick={e =>{this.props.addPost({
                            title: this.state.title,
                            technologies: this.state.techArray.toString(),
                            text: this.state.text
                        })
                        this.setState({
                            title: "",
                            techArray: [],
                            text: ""
                        })
                    }}
                    >
                        Submit
                    </Button>
                    </Form>
        }
        else
        {
            jsx = null;
        }


        return jsx;

    }


    render() {

    return (

        <>
        {this.props.post.loading ? "Loading" : (
            <>
        <Navbar />

        <div className="wrapper">

            <div className="page-header" style={{minHeight:'250px'}}>
                <Container style={{marginTop:'15vh'}}>

                    <Button
                        size='lg'
                        color="success"
                        onClick={this.handleCreatePost}
                    >
                        Create Post
                    </Button>

                    {this.showFormJSX()}

                    <br/>
                    All Posts (more info will go here but placeholder for now)
                </Container>
            </div>

            <Container >
            {this.props.post.posts.map(post =>{
                return <PostItem key={post._id} post={post}/>
            })}

                {/* End of Single Post */}
                {/* Repeat for each post in DB */}
                {/* Will add pagination later and display ~10 posts per page */}

            </Container>

            <Footer />

        </div>
        </>
        )}
        </>
    );
}
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    post: state.post
})

export default connect(mapStateToProps, {getPosts, addPost})(Posts)