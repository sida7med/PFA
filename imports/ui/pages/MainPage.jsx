import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withHistory, Link, 
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import ProjectUI from '../components/ProjectUI.jsx';
import { Projects } from '../../api/projects.js';
import ProjectPage from './ProjectPage';
import AddProject from '../components/AddProject.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import "../css/pages/MainPage.css";

class MainPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      formVisibilty: false
    };
  }

  renderProjects(bool) {
    if(this.props.projects.length !== 0){
      if (bool){
        const result = this.props.projects.filter(project => project.owner ==  this.props.currentUser._id);  
        return result.sort().map((project,i) => (

        <ReactCSSTransitionGroup
            key={project._id}
            transitionName='SlideIn'
            transitionEnterTimeout={600}
            transitionLeaveTimeout={600}
            transitionAppear={true}
            transitionAppearTimeout={200}>

          <ProjectUI project={project}/>

        </ReactCSSTransitionGroup>
        ));
      }else{
        const result = this.props.projects.filter(project => project.owner !==  this.props.currentUser._id);  
        return result.sort().map((project,i) => (

        <ReactCSSTransitionGroup
            key={project._id}
            transitionName='SlideIn'
            transitionEnterTimeout={600}
            transitionLeaveTimeout={600}
            transitionAppear={true}
            transitionAppearTimeout={200}>

          <ProjectUI project={project}/>

        </ReactCSSTransitionGroup>
        ));
      }
    }
    else{
      return <div className="loading"><img src="/loading/load.gif"/></div>;
    }
  }

  handleHover(e){
    
  }

  handlePop(e){
    this.setState({ formVisibilty: !this.state.formVisibilty  });
    //Meteor.call('projects.insert', "name", "desc", []);
  }
  
  render(){
    console.log(this.props);
    
    let currentUser = this.props.currentUser;
    let userDataAvailable = (currentUser !== undefined);
    let loggedIn = (currentUser && userDataAvailable);
    return (
    <HashRouter>
      <div className="container">
      <div className="layout">  
        <div className="boxTitle">
          <h3 className="text-center welcome">
            { loggedIn ? 'Welcome '+currentUser.username : '' }
          </h3>
          <ul className="header">
              <li><NavLink to="/">Projects</NavLink></li>
          </ul>
        </div>
        <div className="content box">
        <Route
          exact
          path="/"
          render={() => (
            <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={200}
        transitionName={this.props.path === '/' ? 'SlideIn' : 'SlideOut'} >
        <div className="separator"><h4>My projects:</h4><hr/></div> 
          <ul className="boxContent">
              {this.renderProjects(true)}      
            <div className="addUi">
            <button id="add" className="text-center" onClick={this.handlePop.bind(this)}>...Add Project</button>
            </div>
            </ul>
            {this.state.formVisibilty && <AddProject onClick={() => this.handlePop()} project={{name: "",desc: "",team: [""]}} add={true}/>}
            <div className="separator"><h4>Other projects:</h4><hr/></div>
            <ul className="boxContent">
            {this.renderProjects(false)}
            </ul>
            </ReactCSSTransitionGroup>
          )}
        />
        <Route
          path="/:projectId"
          component={ProjectPage}
        />
        </div>
      </div>  
      </div>
    </HashRouter>
    );
  }
}

MainPage.propTypes = {
  username: PropTypes.string
  //project: PropTypes.object
}

export default withTracker(() =>  {
  Meteor.subscribe('sprints');
  return {
    currentUser: Meteor.user(),
    projects: Projects.find({}, { sort: { fav: -1 } }).fetch(),
  };
})(MainPage);