import React, { Component } from 'react';
import AutoForm from 'react-auto-form';
import "../css/components/addProject.css";
import { withTracker } from 'meteor/react-meteor-data';


class AddProject extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
        this.setState({ data: this.props.data });
    }

    _onChange = (event, name, data, change) => {
    }
    
    _onSubmit = (event, data) => {
        event.preventDefault();
        this.props.add ? Meteor.call('projects.insert', data):console.log(JSON.stringify(data));
        this.props.onClick();
    }

    renderUsers() {
        if(this.props.userlist.length !== 0){
        return this.props.userlist.map((user) => (
            <option key={user._id} value={user.name}/>
        ));
        }
        else{
          return <option disabled/>;
        }
    
    }
    
      render() {
        return (
            <div className="addProject">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="text-center">Add Project</h1>
                    </div>
                    <div className="modal-body">
                        {/* { error.length > 0 ?
                        <div className="alert alert-danger fade in">{error}</div>
                        :''} */}
                        <AutoForm id="add-form" className="form col-md-12 center-block" onChange={this._onChange} onSubmit={this._onSubmit} trimOnSubmit>
                            <div className="form-group">
                                <input type="text" name="name" id="project-name" className="form-control input-lg" placeholder="name"/>
                            </div>
                            <div className="form-group">
                                <textarea id="project-desc" name="desc" className="form-control input-lg" placeholder="description"></textarea>
                            </div>
                            <div className="form-group">
                                <input list="users" name="user" id="project-team-member" className="form-control input-lg" placeholder="members"/>
                                <datalist id="browsers">
                                    {this.renderUsers()}
                                </datalist>
                            </div>
                            <div className="form-group">
                                <input type="submit" id="add-button" className="btn btn-lg btn-primary btn-block" value="Add Project" />
                            </div>
                        </AutoForm>
                    </div>
                    <div className="modal-footer" style={{borderTop: 0}}></div>
                </div>
                <img src="/images/del.png" onClick={()=> this.props.onClick()} className="edit" width="30px" height="30px"/>
            </div> 
        );
    }
}
 
export default withTracker(() =>  {
    return {
      currentUser: Meteor.user(),
      userlist: Meteor.users.find({}).fetch(),
    };
  })(AddProject);