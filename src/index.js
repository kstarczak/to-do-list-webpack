import { subToInterface, subToUserModal, addTemplate } from './users.js';
import subInterfaceToList from './interface.js';
import subProjectInterfaceToList from './projectInterface.js';
import subTaskInterfaceToList from './taskInterface.js';
import { addUser } from './modal.js';


// add some function to get the user on page laod if stored in localStorage
//load the interface after that
// if not local sstrorage then: 
//let userName = prompt('Welcome to my "To Do" List. Enter your name to get started.');

function subscribeAllInterfaces() {
    subInterfaceToList();
    subProjectInterfaceToList();
    subTaskInterfaceToList();
};


subscribeAllInterfaces();
subToUserModal();
addUser();
subToInterface();


