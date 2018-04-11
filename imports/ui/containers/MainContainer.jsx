// import { withTracker } from 'meteor/react-meteor-data';
// import MainPage from '../pages/MainPage.js';
// import { Projects } from '../../api/projects.js';

// // export default MainContainer = createContainer(({params}) => {
// //   return {
// //   };
// // }, MainPage);

// export default withTracker(props =>  {
//   const currentUser = Meteor.user();
//   const handle1 = Meteor.subscribe('projects');
//   return {
//     currentUser,
//     projects: handle1 ? Projects.find({}, { sort: { createdAt: -1 } }).fetch():[],
//   };
// },MainPage);

