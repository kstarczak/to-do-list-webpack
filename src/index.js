import { addTemplate, Users } from './components/users.js';
import { Interface, ProjectInterface } from './components/interface.js';


// add some function to get the user on page laod if stored in localStorage
//load the interface after that
// if not loacal sstrorage then: 
//let userName = prompt('Welcome to my "To Do" List. Enter your name to get started.');

const userName = 'Konrad';
Users.addUser(userName);


// change placement for this
const collapseProjectsButton = document.querySelector('.collapse-projects-button');
collapseProjectsButton.addEventListener('click', collapseProjects);

function collapseProjects() {
    const projectLinks = document.querySelectorAll('.project-list li');
    console.log(projectLinks);
    projectLinks.forEach(projectLink => projectLink.classList.toggle('collapsed'));
}
