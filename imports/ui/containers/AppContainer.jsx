import React, { Component } from 'react';
import { withHistory } from 'react-router-dom';
import MainPage from '../pages/MainPage';

export default class AppContainer extends Component {
  constructor(props){
    super(props);
    this.state = this.getMeteorData();
    this.logout = this.logout.bind(this);
  }

  getMeteorData(){
    return { isAuthenticated: Meteor.userId() !== null };
  }

  componentWillMount(){
    if (!this.state.isAuthenticated) {
      this.props.history.push('/login');
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (!this.state.isAuthenticated) {
      this.props.history.push('/login');
    }
  }

  logout(e){
    e.preventDefault();
    Meteor.logout( (err) => {
        if (err) {
            console.log( err.reason );
        } else {
            this.props.history.push('/login');
        }
    });
  }

  render(){
    return (
      <div>
        <nav className="navbar navbar-default navbar-static-top colorNav">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand logoDiv" href="#"><img src="/images/logo.png" width="100px" height="50px"/></a>
            </div>
            <div className="navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="#" onClick={this.logout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <MainPage  path={this.props.match.path}/>
      </div>
    );
  }
}
