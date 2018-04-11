import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Projects } from '../../api/projects.js';
import { withHistory, Link, 
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import SprintDetail from '../components/SprintDetail.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import AddProject from '../components/AddProject.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import "../css/pages/projectPage.css";

class ProjectPage extends Component {
    constructor(props) {
        super(props);
        this.state = {project: {name: " ",
        desc: " ",
        owner: " ",
        createdAt: " ",
        team: [],
        features: [],
        sprints: [] },
        formVisibilty: false
      };
    }

    renderDetails(project) {
      if(this.props.projects.length !== 0){
        let date=project.createdAt.getFullYear() + '-' + (project.createdAt.getMonth() + 1) + '-' + project.createdAt.getDate();
      return (<ul>
      <li><h3><font color="Black">Details</font></h3></li>      
      <li><h4>Project Name:</h4> {project.name}</li>
      <li><h4>Description:</h4> {project.desc}</li>
      <li><h4>Owner:</h4> {project.owner}</li>
      <li><h4>Created at:</h4> {date}</li>
    </ul>)
      }
      else{
        return <li>none</li>;
      }
  
  }

    renderFeatures(project) {
        if(project.features.length !== 0){
        return project.features.map(feature => (
          <tr key={feature.priority}>
                  <td> {feature.desc} </td>
          </tr>
        ));
        }
        else{
          return <tr><td>none</td></tr>;
        }
    
    }
    renderSprints(project) {
      if(this.props.projects.length !== 0){
              
      return project.sprints.map((sprint,i) => (
        <NavLink to={`${this.props.match.url}/Sprints/${i+1}`} key={sprint.duration}> Sprint {i+1}</NavLink>
      ));
      }
      else{
        return <li>none</li>;
      }
  
    }

    handlePop(e){
      this.setState({ formVisibilty: !this.state.formVisibilty  });
      //Meteor.call('projects.insert', "name", "desc", []);
    }

    render() { 
        let project= this.props.projects.filter(project=>project._id == this.props.match.params.projectId)[0];
        console.log(this.props.projectOwners);
        //this.setState({project: this.props.projects.filter(project=>project._id == this.props.match.params.projectId)[0]});
        return ( 
        <HashRouter>
          {project ? (
          <ReactCSSTransitionGroup
          className="span"
          transitionAppear={true}
          transitionAppearTimeout={600}
          transitionEnterTimeout={600}
          transitionLeaveTimeout={200}
          transitionName={this.props.match.path === `/:projectId` ? 'SlideIn' : 'SlideOut'} >
            <div className="features">
              <table>
                <thead>
                  <tr>
                    <th className="titreFeature"><img src="icons/features.png" alt=""/>Features</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderFeatures(project)}
                </tbody>
              </table>
            </div>
            <div className="sprints">
              <ul className="uld">
              {this.renderSprints(project)}
              </ul>            
            </div>
            <div className="stats titreStat boxHover">
            <h3>Statistiques</h3>
            </div>
            <div className="details">
            <Route
              exact
              path={`${this.props.match.url}/`}
              render={() => (
                <ul className="uld">
                  {this.renderDetails(project)}
                  <span id="edit" onClick={this.handlePop.bind(this)}><img src="icons/edit.png" alt='Edit'/></span>
                  {this.state.formVisibilty && <AddProject onClick={() => this.handlePop()} project={{name: "ahmed",desc: "manaa",team: [""]}} add={false}/>}
                </ul>
              )}
            />
            <Route
              path={`${this.props.match.url}/Sprints/:order`}
              component={SprintDetail}
            />
            </div>
            </ReactCSSTransitionGroup>
            ):(<div className="loading"><img src="/loading/load.gif"/></div>)}
        </HashRouter> );
    }
}
 
export default withTracker(() =>  {
    Meteor.subscribe('sprints');
    
    return {
      currentUser: Meteor.user(),
      projects: Projects.find({}, { sort: { fav: 1 } }).fetch(),
      projectOwners:Meteor.users.find({}).fetch(),
    };
  })(ProjectPage);