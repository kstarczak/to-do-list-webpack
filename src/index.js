import { Users } from './components/users';


// add some function to get the user on page laod if stored in localStorage
//load the interface after that
// if not loacal sstrorage then: 
//let userName = prompt('Welcome to my "To Do" List. Enter your name to get started.');

const userName = 'Konrad';
Users.addUser(userName);