import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Projects = new Mongo.Collection('projects'); 

Projects.allow({
  insert: function(userId,doc){
    return!!userId;
  }
})

Task = new SimpleSchema({
    desc: {
        type: String,
        label: "Description",
        optional: true
    },
    owner: {
        type: String,
        label: "Owner",
        defaultValue: function() {
            return this.userId
        }
    },
    duration: {
        type: Number,
        label: "Duration",
        defaultValue: 24
    },
    done: {
        type: Boolean,
        label: "Done",
        defaultValue: false
    }
  
});
  
Sprint = new SimpleSchema({
  duration: {
      type: Number,
      label: "Duration",
      defaultValue: 24
  },
  done: {
      type: Boolean,
      label: "Done",
      defaultValue: false
  },
  tasks: {
      type: [Task],
      defaultValue: []
  }

});

Feature = new SimpleSchema({
    desc: {
        type: String,
        label: "Description"
    },
    done: {
        type: Boolean,
        label: "Done",
        defaultValue: false
    },
    priority: {
        type: Number,
        label: "Priority",
        defaultValue: 3
    }
  
});

projectSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Name"
    },
    desc: {
        type: String,
        label: "Description",
        optional: true
    },
    owner: {
        type: String,
        label: "Owner",
        autoValue: function() {
            return this.userId
        }
    },
    createdAt: {
        type: Date,
        label: "Created At",
        autoValue: function() {
            return new Date()
        }
    },
    fav: {
        type: Boolean,
        label: "Favorite",
        defaultValue: false
    },
    team: {
        type: [String],
        label: "team",
        defaultValue: [],
        optional: true
    },
    features: {
        type: [Feature],
        label: "Features",
        defaultValue: [],
        optional: true
    },
    sprints: {
        type: [Sprint],
        label: "Sprints",
        defaultValue: [],
        optional: true
    }

});

Projects.attachSchema(projectSchema);

if (Meteor.isServer) {

  // This code only runs on the server

  Meteor.publish('projects', function projectsPublication() {

    return Projects.find({});

  });

  Meteor.publish('sprints', function sprintsPublication() {

    return Projects.find( { $or: [ { owner: this.userId }, { team: this.userId } ] } );

  });

//   Meteor.publish('userList', function (){ 
//     return Meteor.users.find({
//         fields: {
//             'profile.userName': 1,
//         }
//     });
//   });
}

Meteor.methods({
  'findUsers'() {
      return Meteor.users.find({
            fields: {
              'profile.username': 1
            }
       });
   },    
  'projects.insert'(data) {
    let name = data.name;
    let desc = data.desc;
    let team = [];
    team[0] = data.user;
    
    let features = [{
        desc:"feature1",
        done:true,
        priority: 1
    },{
        desc:"feature2",
        done:false,
        priority: 2
    }];
    
let sprints= [{
        duration: 10,
        done: false,
        tasks:[{
            desc: "task1",
            owner: this.userId,
            duration: 12,
            done: true
        },{
            desc: "task2",
            owner: this.userId,
            duration: 4,
            done: false
        }]
    }];
    check(name, String);
    check(desc, String);
    check(team, [String]);
    check(features, [Feature]);
    check(sprints, [Sprint]);
    // Make sure the user is logged in before inserting a project

    if (!this.userId) {

      throw new Meteor.Error('not-authorized');

    }

     Projects.insert({

      name,
      desc,
      owner: this.userId,
      createdAt: new Date(),
      team,
      features,
      sprints
      //username: Meteor.users.findOne(this.userId).username,

    });

  },
  'projects.remove'(projectId) {

    check(projectId, String);

    const project = Projects.findOne(projectId);

    if (project.owner !== this.userId) {

      // If the task is private, make sure only the owner can delete it

      throw new Meteor.Error('not-authorized');

    }

    Projects.remove(projectId);

  },
  'projects.setFav'(projectId, setFav) {

    check(projectId, String);

    check(setFav, Boolean);

    const project = Projects.findOne(projectId);

    if (project.owner !== this.userId) {

      // If the task is private, make sure only the owner can check it off

      throw new Meteor.Error('not-authorized');

    }

    Projects.update(projectId, { $set: { fav: setFav } });

  },
/*
  'tasks.setPrivate'(taskId, setToPrivate) {

    check(taskId, String);

    check(setToPrivate, Boolean);

 

    const task = Tasks.findOne(taskId);

 

    // Make sure only the task owner can make a task private

    if (task.owner !== this.userId) {

      throw new Meteor.Error('not-authorized');

    }

 

    Tasks.update(taskId, { $set: { private: setToPrivate } });

  },*/

});
