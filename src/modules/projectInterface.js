import { deleteAllChildren } from './myLibrary';
import PubSub from './pubSub';

const ProjectInterface = (function () {
    const load = function (projects) {
        const content = document.getElementById('content');
        let projectInterface;
        if (document.querySelector('project-interface')) {
            projectInterface =  document.querySelector('project-interface');
            deleteAllChildren(projectInterface);
        } else { 
            projectInterface = document.createElement('div');
            projectInterface.className = 'project-interface';
        };
        const projectHeader = document.createElement('div');
        projectHeader.className = 'project-header';
        projectHeader.textContent = 'Your Projects:';

        const projectContainer = document.createElement('div');
        projectContainer.className = 'project-container';

        const projectList = document.createElement('ul');
        projectList.className = 'project-list'


        const loadList = function (list) {
            list.forEach((project) => {
                const projectList = document.createElement('li');
                projectList.style.backgroundColor = project.color;
                const projectLink = document.createElement('a');
                projectLink.textContent = project.name;
                projectLink.id = project.type + project.id;
                projectLink.classList.add('project-link');
                const deleteButton = document.createElement('button');
                deleteButton.type = 'button';
                deleteButton.className = 'delete-project-button';
                projectList.append(projectLink, deleteButton);
                if (project.selected) {
                    projectLink.classList.add('selected');
                    projectLink.classList.add('selected');
                };
                projectList.appendChild(listItem);
                projectLink.addEventListener('click', selectProject);
                deleteButton.addEventListener('click', deleteProject);
            });
        };

        loadList(projects);


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