import React, { Component } from 'react'
import { withHistory, Link } from 'react-router-dom'
import { createContainer } from 'meteor/react-meteor-data'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
// import {Motion, spring} from 'react-motion';

import "../css/pages/LoginPage.css";

export default class LoginPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;
    Meteor.loginWithPassword(email, password, (err) => {
      if(err){
        this.setState({
          error: err.reason
        });
      } else {
        this.props.history.push('/');
      }
    });
  }

  render(){
    const error = this.state.error;
    // const config = { stiffness: 140, damping: 14 };
    // const toCSS = (scale) => ({ transform: `scale3d(${scale}, ${scale}, ${scale})` })
    return (
      <div className="modal show back">    
        <div className="modal-dialog">
        {/* <Motion 
          defaultStyle={{ scale: 0 }} 
          style={{ scale: spring(1, config) }}
        >
          {value =>  */}

        <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={200}
        transitionName={this.props.match.path === '/login' ? 'SlideIn' : 'SlideOut'}
        >  
          <div className="modal-content"> 
          {/* style={toCSS(value.scale)} #style attribute */}
            <div className="modal-header">
              <h1 className="text-center"><img src="/images/logo.png" width="300px" height="120px"/></h1>
            </div>
            <div className="modal-body">
              { error.length > 0 ?
                <div className="alert alert-danger fade in">{error}</div>
                :''}
              <form  id="login-form"
                    className="form col-md-12 center-block"
                    onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input type="email"
                        id="login-email"
                        className="form-control input-lg"
                        placeholder="email"/>
                </div>
                <div className="form-group">
                  <input type="password"
                        id="login-password"
                        className="form-control input-lg"
                        placeholder="password"/>
                </div>
                <div className="form-group text-center">
                  <input type="submit"
                        id="login-button"
                        className="btn btn-primary btn-lg btn-block"
                        value="Login" />
                </div>
                <div className="form-group text-center">
                  <p className="text-center">
                    Don't have an account? Register <Link to="/signup">here</Link>
                  </p>
                </div>
              </form>
            </div>
            <div className="modal-footer" style={{borderTop: 0}}></div>
          </div>
        </ReactCSSTransitionGroup>

        {/* } </Motion> */}
        </div>
      </div>
    );
  }
}