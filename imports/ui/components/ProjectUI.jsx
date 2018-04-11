import React, { Component } from 'react';
import { withHistory, Link, 
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import "../css/components/projectUI.css";

class ProjectUI extends Component {
    constructor(props){
        super(props);
        this.state = {
            favState:this.props.project.fav
        };
    }

    handleDelete(){
        Meteor.call('projects.remove', this.props.project._id);
    }
    
    toggleFav(){
        this.setState({ favState:!this.state.favState });
        Meteor.call('projects.setFav', this.props.project._id, !this.state.favState);
    }  

    render() { 
        console.log(this.props.project._id._str);
        this.state.favState ? style="fav": style="notfav";
        console.log(`projectUi ${style}`);
        return ( 
        <div className={`projectUi ${style}`} >
        <div onClick={this.toggleFav.bind(this)}>
        {this.state.favState?<img src="/images/star.png"/>:<img src="/images/unstar.png"/>}
        </div>
        <img src="/images/del.png" onClick={this.handleDelete.bind(this)} className="del" width="30px" height="30px"/>
        <div className="field text-center">
            <li><NavLink to={`/${this.props.project._id}`}><h1>{this.props.project.name}</h1></NavLink></li>
            <p>{this.props.project.desc}</p>
        </div>
        </div>
        );
    }
}
 
ProjectUI.propTypes = {
    username: PropTypes.string,
    project: PropTypes.object
  }
  
  export default withTracker(() =>  {
    //Meteor.subscribe('sprints');
    return {
      currentUser: Meteor.user(),
      //projects: Projects.find({}).fetch(),
    };
  })(ProjectUI);