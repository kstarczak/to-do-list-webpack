import PubSub from './pubSub.js';
import { deleteAllChildren } from "./myLibrary.js";
import { addProject } from './modal.js';

const Interface = (function () {
    const load = function (user) {
        const content = document.getElementById('content');
        deleteAllChildren(content);

        const userInterface = document.createElement('div');
        userInterface.className = 'user-interface';

        const headerText = document.createElement('div');
        headerText.classList.add('header-text');
        headerText.textContent = `${user.name}'s To Do List`;

        const menuButton = document.createElement('button');
        menuButton.className='menu-button';
        menuButton.type = 'button';
        const menuIcon = document.createElement('div');
        menuIcon.className = 'menu-icon';
        const menuText = document.createElement('span');
        menuText.textContent = 'Menu';
        menuButton.append(menuIcon, menuText);

        const nav = document.createElement('nav');
        nav.className = 'nav';
        const menuList = document.createElement('ul');
        const switchUserList = document.createElement('li');
        const switchUserLink = document.createElement('a');
        switchUserLink.textContent = 'Switch User';
        switchUserList.append(switchUserLink);
        const aboutList = document.createElement('li');
        const aboutLink = document.createElement('a');
        aboutLink.textContent = 'About';
        aboutList.append(aboutLink);
        menuList.append(switchUserList, aboutList);
        nav.append(menuList);

        const addProjectButton =  document.createElement('button');
        addProjectButton.type = 'button';
        addProjectButton.className = 'add-project-button button';
        const addProjectIcon = document.createElement('div');
        addProjectIcon.classname = 'add-project-icon';
        const addProjectText = document.createElement('span');
        addProjectText.textContent = "Add New Project";
        addProjectButton.append(addProjectIcon, addProjectText);
        addProjectButton.addEventListener('click', addProject);


        userInterface.append(headerText, menuButton, nav, addProjectButton);
        content.append(userInterface);
        PubSub.publish('projectListModified', user.list);


    };
    return { load};
})();


export const subInterfaceToList = () => PubSub.subscribe('userSelected', Interface.load);


export default subInterfaceToList;