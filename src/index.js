import { Users, subToInterface, addTemplate } from './users.js';
import subInterfaceToList from './interface.js';
import subProjectInterfaceToList from './projectInterface.js';
import subTaskInterfaceToList from './taskInterface.js';


// add some function to get the user on page laod if stored in localStorage
//load the interface after that
// if not loacal sstrorage then: 
//let userName = prompt('Welcome to my "To Do" List. Enter your name to get started.');


subInterfaceToList();
subProjectInterfaceToList();
subTaskInterfaceToList();


// const userName = prompt('Welcome to my To-Do List! Enter your name to get started.')
Users.addUser('Konrad');
subToInterface();

addTemplate();
