import PubSub from './pubSub.js';
import { deleteAllChildren } from "./myLibrary.js";
import { addProject } from './modal.js';

const Interface = (function () {
    const load = function (user) {
        const content = document.getElementById('content');
        deleteAllChildren(content);

        const footer = document.createElement('footer');
        const footerLink = document.createElement('a');
        footerLink.className = 'footer-link';
        footerLink.href = "https://konradstar.dev/";
        footer.appendChild(footerLink);

        const userInterfaceWrapper = document.createElement('div');
        userInterfaceWrapper.className = 'user-interface-wrapper';
        const userInterface = document.createElement('div');
        userInterface.className = 'user-interface';

        const headerText = document.createElement('div');
        headerText.classList.add('header-text');
        headerText.textContent = `${user.name}'s To Do List`;
        
        const menuWrapper = document.createElement('div');
        menuWrapper.className='menu-wrapper';
        const menuButton = document.createElement('button');
        menuButton.className='menu-button';
        menuButton.type = 'button';
        menuWrapper.append(menuButton);

        const nav = document.createElement('nav');
        nav.classList.add('nav');
        const menuList = document.createElement('ul');
        const switchUserList = document.createElement('li');
        const switchUserLink = document.createElement('a');
        switchUserLink.textContent = 'Switch User';
        switchUserList.className = 'switch-user-li';
        switchUserList.append(switchUserLink);
        const aboutList = document.createElement('li');
        const aboutLink = document.createElement('a');
        aboutLink.href = "https://konradstar.dev/";
        aboutLink.textContent = 'About';
        aboutList.append(aboutLink);
        menuList.append(switchUserList, aboutList);
        nav.append(menuList);

        menuButton.addEventListener('click', () => {
            nav.classList.toggle('open');
            menuButton.classList.toggle('open');
        });

        
        
        const projectHeaderWrapper = document.createElement('div');
        projectHeaderWrapper.className = 'project-header-wrapper';
        const projectHeader =  document.createElement('div');
        projectHeader.textContent = "PROJECTS";
        projectHeader.className = 'project-header';
        const addProjectButtonWrapper = document.createElement('div');
        addProjectButtonWrapper.classList.add('add-project-button-wrapper')
        const addProjectButton =  document.createElement('button');
        addProjectButton.type = 'button';
        addProjectButton.className = 'add-project-button button';
        const addProjectIcon = document.createElement('div');
        addProjectIcon.className = 'add-icon';
        const addProjectText = document.createElement('span');
        addProjectText.textContent = "Add Project";
        addProjectButton.append(addProjectIcon, addProjectText);
        addProjectButton.addEventListener('click', addProject);
        addProjectButtonWrapper.appendChild(addProjectButton);

        projectHeaderWrapper.append( projectHeader, addProjectButtonWrapper)


        userInterface.append(headerText, menuWrapper, nav, projectHeaderWrapper);
        userInterfaceWrapper.appendChild(userInterface);
        content.appendChild(userInterfaceWrapper, footer);
        PubSub.publish('projectListModified', user.list);


    };
    return { load};
})();


export const subInterfaceToList = () => PubSub.subscribe('userSelected', Interface.load);


export default subInterfaceToList;