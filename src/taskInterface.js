import PubSub from './pubSub.js';
import { deleteAllChildren } from './myLibrary.js';
import { editTask } from './modal.js';

const TaskInterface = (function () {
    const load = function (tasks) {
        const content = document.getElementById('content');

        let taskInterface;
        if (document.querySelector('.task-interface')) {
            taskInterface =  document.querySelector('.task-interface');
            deleteAllChildren(taskInterface);
        } else { 
            taskInterface = document.createElement('div');
            taskInterface.className = 'task-interface';
            content.appendChild(taskInterface);
        };
        const taskHeader = document.createElement('div');
        taskHeader.className = 'task-header';
        taskHeader.textContent = 'Your tasks:';

        const taskContainer = document.createElement('div');
        taskContainer.className = 'task-container';
        const taskList = document.createElement('ul');
        taskList.className = 'task-list';
        taskContainer.appendChild(taskList);


        const selectTask = function (e) {
            let taskId = e.target.dataset.id
            taskId = parseInt(taskId);
            PubSub.publish('selectTask', taskId)
        };
    
        const deleteTask = function(e) {
            let taskId = e.target.dataset.id
            taskId= parseInt(taskId);
            PubSub.publish('deleteTask', taskId);
        };


        const loadList = function (list) {
            if (list.length < 1) {
                const emptyList = document.createElement('li');
                emptyList.textContent = 'This project does not have any lists. Click the "Add Task" button to get started.';
                taskList.appendChild(emptyList);
            } else {
                list.forEach((task) => {
                const taskItem = document.createElement('li');
                taskItem.classList.add ('task');
                
                const taskSummary = document.createElement('div');
                taskSummary.classList.add('task-Summary');

                const taskDetails = document.createElement('div');
                taskDetails.classList.add('task-details');

                const taskLink = document.createElement('a');
                taskLink.classList.add('task-link');
                taskLink.dataset.id = task.id;
                taskLink.textContent = task.name;
                taskLink.addEventListener('click', selectTask);
                taskLink.addEventListener('click', () => taskDetails.classList.toggle('open'));

                if (task.selected) {
                    taskLink.classList.add('selected');
                    taskItem.classList.add('selected');
                };

                taskItem.append(taskSummary, taskDetails);

                const deleteButton = document.createElement('button');
                deleteButton.type= 'button';
                deleteButton.className ='delete-task-button';
                deleteButton.dataset.id = task.id;
                deleteButton.textContent = 'Delete Task';
                deleteButton.addEventListener('click', deleteTask);

                taskSummary.append(taskLink, deleteButton);           
               
                const taskInfo = document.createElement('div');
                taskInfo.className = 'task-info';

                const taskDesc = document.createElement('div');
                taskDesc.classList.add('task-description');
                taskDesc.textContent = task.description;
                const taskDue = document.createElement('div');
                taskDue.classList.add('task-due');
                taskDue.textContent = task.due;
                const taskPriority = document.createElement('div');
                taskPriority.classList.add('task-priority');
                taskPriority.textContent = task.priority;

                taskInfo.append(taskDesc, taskDue, taskPriority);

                const editButton = document.createElement('button');
                editButton.type= 'button';
                editButton.className ='edit-task-button';
                editButton.dataset.id = task.id;
                editButton.textContent = 'edit Task';
                editButton.addEventListener('click', editTask);

                taskDetails.append(taskInfo,editButton);


                taskList.append(taskItem);
                });
            };
   
        };

        loadList(tasks);

        taskInterface.append(taskHeader, taskContainer);
    };

    const showUnselectedMessage = function (message) {
        const content = document.getElementById('content');

        let taskInterface;
        if (document.querySelector('.task-interface')) {
            taskInterface =  document.querySelector('.task-interface');
            deleteAllChildren(taskInterface);
        } else { 
            taskInterface = document.createElement('div');
            taskInterface.className = 'task-interface';
            content.appendChild(taskInterface);
        };
        const unselectedMessage = document.createElement('div');
        unselectedMessage.className = 'unselected-message';
        unselectedMessage.textContent = message;
        taskInterface.appendChild(unselectedMessage);
    };


    return { load, showUnselectedMessage };
}
)();


const subTaskInterfaceToList = () => {
    PubSub.subscribe('projectModified', TaskInterface.load);
    PubSub.subscribe('taskSelected', TaskInterface.load);
    PubSub.subscribe('projectSelected', TaskInterface.load);
    PubSub.subscribe('currentProjectDeleted', TaskInterface.showUnselectedMessage);
    PubSub.subscribe('taskEdited', TaskInterface.load);
}

export default subTaskInterfaceToList;