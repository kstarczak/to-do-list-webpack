import { PubSub } from './pubSub.js';
import { deleteAllChildren } from "./myLibrary.js";

const Interface = (function () {
    const load = function (user) {
        const content = document.querySelector('.content');
        deleteAllChildren(content);

        const mainHeader = document.createElement('nav');
        mainHeader.classList.add('main-header');
        mainHeader.textContent = `${user.name}'s To Do List`;

        const projectContent = document.createElement('div');
        projectContent.classList.add('project-content');

        const taskContent = document.createElement('div');
        taskContent.classList.add('task-content');

        content.append(mainHeader, projectContent, taskContent);
        ProjectInterface.load();
        TaskInterface.load();
    };
    return { load};
})();

PubSub.subscribe('userSelected', Interface.load);


const ProjectInterface = (function () {

    const load = function () {
        const projectContent = document.querySelector('.project-content');
        deleteAllChildren(projectContent);
        const projectContainer = document.createElement('div');
        projectContainer.classList.add('project-container');

        const projectHeader = document.createElement('div');
        projectHeader.classList.add('project-header');
        projectHeader.textContent = 'Your Projects:';

        const collapseProjectsButton = document.createElement('button');
        collapseProjectsButton.classList.add('collapse-projects-button');

        const projectList = document.createElement('ul')
        projectList.classList.add('project-list');

        const addProjectButton = document.createElement('button');
        addProjectButton.type = 'button';
        addProjectButton.classList.add('add-project-button');
        addProjectButton.textContent = 'Add Project'
        addProjectButton.addEventListener('click', addProject);;

        projectContainer.append(projectHeader, collapseProjectsButton, projectList, addProjectButton);
        projectContent.append(projectContainer);

    };
    const selectProject = function (e) {
        let projectId = e.target.id;
        projectId = parseInt(projectId.replace('project', ''));
        PubSub.publish('selectProject', projectId)
    };

    const deleteProject = function(e) {
        let projectId = e.target.previousSibling.id;
        projectId= parseInt(projectId.replace('project', ''));
        PubSub.publish('deleteProject', projectId);
    };

    const loadList = function (list) {
        const projectList = document.querySelector('.project-list');
        deleteAllChildren(projectList);
        list.forEach(function (project) {
            const projectLink = document.createElement('span');
            projectLink.textContent = project.name;
            projectLink.id = project.type + project.id;
            projectLink.classList.add('project-link');
            const deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.classList.add('delete-project-button');
            deleteButton.textContent = 'X';
            const listItem = document.createElement('li');
            listItem.style.backgroundColor = project.color;
            listItem.append(projectLink, deleteButton);
            if (project.selected) {
                projectLink.classList.add('selected');
                projectLink.parentElement.classList.add('selected');
            };
            projectList.appendChild(listItem);
            projectLink.addEventListener('click', selectProject);
            deleteButton.addEventListener('click', deleteProject);
            
        });
    };


    //move code to forms.JS
    const addProject = function () {
        const contentCover = document.querySelector('.content-cover');
        const forms = document.querySelector('.forms');
        function createForm() {
            contentCover.style.display = 'block';
            const form = document.createElement('div');
            form.classList.add('form');
            form.setAttribute('autocomplete', 'off');

            const header = document.createElement('div');
            header.textContent = 'Create New Project';

            const nameInput = document.createElement('input');
            nameInput.id = 'name';
            nameInput.setAttribute('type', 'text');
            nameInput.setAttribute('autocomplete', 'off')
            nameInput.placeholder = 'Enter project name';

            const color = document.createElement('div');
            color.classList.add('color-selector');
            const colorInputLabel = document.createElement('label');
            colorInputLabel.setAttribute('for', 'color');
            colorInputLabel.textContent = 'Choose a color (optional)';
            const colorInput = document.createElement('input');
            colorInput.type = 'color';
            colorInput.id = 'color';
            colorInput.value = "#f6b73c"
            colorInput.addEventListener('change', function () { colorInputLabel.style.backgroundColor = this.value; });
            color.append(colorInputLabel, colorInput);

            const buttons = document.createElement('div');
            buttons.classList.add('buttons');

            const cancelButton = document.createElement('button');
            cancelButton.classList.add('button');
            cancelButton.id = 'cancel-button';
            cancelButton.textContent = 'Cancel';
            cancelButton.addEventListener('click', closeForm);

            const submitButton = document.createElement('button')
            submitButton.classList.add('button');
            submitButton.id = 'submit-button'
            submitButton.textContent = 'Create';
            submitButton.addEventListener('click', submitForm);

            buttons.append(cancelButton, submitButton);

            form.append(header, nameInput, color, buttons);
            forms.append(form);
        };
        function closeForm() {
            deleteAllChildren(forms);
            contentCover.style.display = 'none';
        }
        function submitForm() {
            const name = document.querySelector('#name').value;
            const color = document.querySelector('#color').value;
            const newProject = { name, color };
            closeForm();
            PubSub.publish('addProject', newProject);
            
        }
        
        createForm();
    };
    return { load, loadList };
}
)();

 //listen for project list modified and loadlist
PubSub.subscribe('projectListModified', ProjectInterface.loadList);




const TaskInterface = (function () {

    const load = function () {
        const taskContent = document.querySelector('.task-content');
        deleteAllChildren(taskContent);
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task-container');

        const taskHeader = document.createElement('div');
        taskHeader.classList.add('task-header');
        taskHeader.textContent = '';

        const taskList = document.createElement('ul')
        taskList.classList.add('task-list');

        const addTaskButton = document.createElement('button');
        addTaskButton.type = 'button';
        addTaskButton.classList.add('add-task-button');
        addTaskButton.textContent = 'Add Task'
        addTaskButton.addEventListener('click', addTask);
        addTaskButton.style.display = 'none';

        taskContainer.append(taskHeader, taskList, addTaskButton);
        taskContent.append(taskContainer);
    };

    const loadList = function (list) {
        const addTaskButton = document.querySelector('.add-task-button');
        if (addTaskButton.style.display === 'none') {
            addTaskButton.style.display = 'block';
        };
        const taskList = document.querySelector('.task-list');
        deleteAllChildren(taskList);
        list.forEach(function (task) {
            const listItem = document.createElement('li');
            listItem.id = task.type + task.id;
            listItem.classList.add('task-link');
            const taskTitle = document.createElement('div');
            taskTitle.classList.add('task-name');
            taskTitle.textContent = task.name;
            const taskDescription = document.createElement('div');
            taskDescription.classList.add('task-description');
            taskDescription.textContent = task.description;
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-task-button');
            deleteButton.type = 'button';
            deleteButton.textContent = 'x';
            listItem.append(taskTitle, taskDescription, deleteButton);
            taskList.append(listItem);
            deleteButton.addEventListener('click', deleteTask);
            
        });
    };
    function deleteTask(e) {
        let taskId = e.target.parentElement.id;
        taskId = parseInt(taskId.replace('task',''));
        PubSub.publish('deleteTask', taskId);
    }


    //move code to forms.JS
    const addTask = function () {
        const contentCover = document.querySelector('.content-cover');
        const forms = document.querySelector('.forms');
        function createForm() {
            contentCover.style.display = 'block';
            const form = document.createElement('div');
            form.classList.add('form');

            const header = document.createElement('div');
            header.textContent = 'Create New Task';

            const nameInput = document.createElement('input');
            nameInput.id = 'name';
            nameInput.setAttribute('type', 'text');
            nameInput.placeholder = 'Enter Task name'
            nameInput.setAttribute('autocomplete', 'off');

            const descInput = document.createElement('textarea')
            descInput.id = 'description';
            descInput.placeholder = 'Enter a description(optional)';
            descInput.setAttribute('autocomplete', 'off');
            descInput.setAttribute('rows', '4');

            const buttons = document.createElement('div');
            buttons.classList.add('buttons');

            const cancelButton = document.createElement('button');
            cancelButton.classList.add('button');
            cancelButton.id = 'cancel-button';
            cancelButton.textContent = 'Cancel';
            cancelButton.addEventListener('click', closeForm);

            const submitButton = document.createElement('button')
            submitButton.classList.add('button');
            submitButton.id = 'submit-button'
            submitButton.textContent = 'Create';
            submitButton.addEventListener('click', submitForm);

            buttons.append(cancelButton, submitButton);

            form.append(header, nameInput, descInput, buttons);
            forms.append(form);
        };
        function closeForm() {
            deleteAllChildren(forms);
            contentCover.style.display = 'none';
        }
        function submitForm() {
            const name = document.querySelector('#name').value;
            const description = document.querySelector('#description').value;
            const newTask = { name, description };
            closeForm();
            PubSub.publish('addTask', newTask);
            
        }
        
        createForm();
    };
    const clear = function (message) {
        const taskList = document.querySelector('.task-list');
        deleteAllChildren(taskList);
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        taskList.appendChild(messageDiv);
        

    };

    return { load, loadList, clear };
}
)();

 //listen for task list modified and loadlist
PubSub.subscribe('projectModified', TaskInterface.loadList);
PubSub.subscribe('projectListSelected', TaskInterface.loadList);
PubSub.subscribe('currentProjectDeleted', TaskInterface.clear);
























export { Interface, ProjectInterface };