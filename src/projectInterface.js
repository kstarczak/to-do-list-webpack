import { deleteAllChildren } from './myLibrary.js';
import PubSub from './pubSub.js';
import { addTask } from './modal.js';

const ProjectInterface = (function () {
    const load = function (projects) {
        const content = document.getElementById('content');
        let projectInterface;
        if (document.querySelector('.project-interface')) {
            projectInterface =  document.querySelector('.project-interface');
            deleteAllChildren(projectInterface);
        } else { 
            projectInterface = document.createElement('div');
            projectInterface.className = 'project-interface';
            content.append(projectInterface);
        };
        const projectHeader = document.createElement('div');
        projectHeader.className = 'project-header';
        projectHeader.textContent = 'Your Projects:';

        const projectContainer = document.createElement('div');
        projectContainer.className = 'project-container';
        const projectList = document.createElement('ul');
        projectList.className = 'project-list';
        projectContainer.appendChild(projectList);


        const selectProject = function (e) {
            let projectId = e.target.parentElement.id;
            projectId = parseInt(projectId.replace('project', ''));
            PubSub.publish('selectProject', projectId)
        };
    
        const deleteProject = function(e) {
            let projectId = e.target.parentElement.id;
            projectId= parseInt(projectId.replace('project', ''));
            PubSub.publish('deleteProject', projectId);
        };
    
        const loadList = function (list) {
            if (list.length < 1) {
                const emptyList = document.createElement('li');
                emptyList.className ='empty-list';
                emptyList.textContent = 'You do not have any Projects. Click the "Add Project" button to get started.';
                projectList.appendChild(emptyList);
            } else {
                list.forEach((project) => {
                const projectListItem = document.createElement('li');
                projectListItem.id = project.type + project.id;
                projectListItem.style.backgroundColor = project.color;
                const projectLink = document.createElement('a');
                projectLink.textContent = project.name;
                projectLink.classList.add('project-link');
                if (project.selected) {
                    projectListItem.classList.add('selected');
                    projectLink.classList.add('selected');
                };
                projectLink.addEventListener('click', selectProject);

                const addTaskButton = document.createElement('button');
                addTaskButton.type = 'button';
                addTaskButton.className = 'add-task-button button';
                addTaskButton.textContent = 'Add Task';
                addTaskButton.addEventListener('click', addTask);


                const deleteButton = document.createElement('button');
                deleteButton.type = 'button';
                deleteButton.className = 'delete-project-button button';
                deleteButton.ariaLabel = 'delete project';
                deleteButton.addEventListener('click', deleteProject);

                projectListItem.append(projectLink, addTaskButton, deleteButton);
                projectList.appendChild(projectListItem);
                });
            };
        };
        loadList(projects);


        projectInterface.append(projectHeader, projectContainer);
        

    }; 
    
    return { load };
}
)();

const subProjectInterfaceToList = () => {
    PubSub.subscribe('projectListModified', ProjectInterface.load);
}
export default subProjectInterfaceToList;