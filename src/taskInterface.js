import PubSub from './pubSub.js';
import { deleteAllChildren } from './myLibrary.js';
import { editTask } from './modal.js';

const TaskInterface = (function () {
    const load = function (tasks) {
        const selectedProject = document.querySelector('.project-list-item.selected');

        let taskInterface;
        if (document.querySelector('.task-interface')) {
            taskInterface =  document.querySelector('.task-interface');
            deleteAllChildren(taskInterface);
        } else { 
            taskInterface = document.createElement('div');
            taskInterface.className = 'task-interface';
            selectedProject.appendChild(taskInterface);
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
            let taskId = e.target.dataset.taskId
            taskId = parseInt(taskId);
            PubSub.publish('selectTask', taskId)
        };
    
        const deleteTask = function(e) {
            let taskId = e.target.dataset.taskId
            taskId= parseInt(taskId);
            PubSub.publish('deleteTask', taskId);
        };


        // Loads all the tasks in the currently selected project and appends them to the selected project in the DOM
        const loadList = function (list) {
            if (list.length < 1) {
                const emptyList = document.createElement('li');
                emptyList.className = 'empty-list';
                emptyList.textContent = 'Select "Add Task" to add items.';
                taskList.appendChild(emptyList);
            } else {

                list.forEach((task) => {
                    const taskItem = document.createElement('li');
                    taskItem.classList.add ('task');
                    
                    const taskSummary = document.createElement('div');
                    taskSummary.classList.add('task-summary');

                    const taskDetails = document.createElement('div');
                    taskDetails.classList.add('task-details');
                    
                    const checkComplete = document.createElement('div');
                    checkComplete.classList.add('check');
                    const checkLabel = document.createElement('label');
                    const checkInput = document.createElement('input');
                    checkInput.type = 'checkbox';
                    checkInput.dataset.taskId = task.id;

                    const checkAltInput = document.createElement('div');
                    checkAltInput.classList.add('alt-checkbox')

                    checkLabel.append(checkInput, checkAltInput);
                    checkComplete.append(checkLabel);

                    const taskLink = document.createElement('a');
                    taskLink.classList.add('task-link');
                    taskLink.dataset.taskId = task.id;
                    taskLink.textContent = task.name;
                    taskLink.addEventListener('click', selectTask);

                    if (task.selected) {
                        taskLink.classList.add('selected');
                        taskItem.classList.add('selected');
                    };
                    if (task.completed) {
                        taskLink.classList.add('completed');
                        checkInput.checked = true;
                    }


                    taskItem.append(taskSummary, taskDetails);

                    const deleteButton = document.createElement('button');
                    deleteButton.type= 'button';
                    deleteButton.className ='delete-task-button';
                    deleteButton.dataset.taskId = task.id;
                    deleteButton.ariaLabel = "delete task";
                    deleteButton.addEventListener('click', deleteTask);

                    taskSummary.append(checkComplete, taskLink, deleteButton);   
                    
                    const toggleComplete = function (e) {
                        const taskId = e.target.dataset.taskId;
                        if (e.target.checked) {
                            taskLink.classList.add('completed');
                        } else {
                            taskLink.classList.remove('completed');
                        };
                        PubSub.publish('completeTask', taskId);

                    };


                    checkInput.addEventListener('change', toggleComplete)
                
                    const desc = document.createElement('div');
                    desc.classList.add('task-description-title');
                    desc.textContent = 'Description';
                    const taskDesc = document.createElement('div');
                    taskDesc.classList.add('task-description');
                    taskDesc.textContent = task.description;
                    const due = document.createElement('div');
                    due.classList.add('task-due-title');
                    due.textContent = 'Due date';
                    const taskDue = document.createElement('div');
                    taskDue.classList.add('task-due');
                    taskDue.textContent = task.due;
                    const priority = document.createElement('div');
                    priority.classList.add('task-priority-title');
                    priority.textContent = 'priority'
                    const taskPriority = document.createElement('div');
                    taskPriority.classList.add('task-priority');
                    taskPriority.textContent = task.priority;

                    const editButton = document.createElement('button');
                    editButton.type= 'button';
                    editButton.className ='edit-task-button';
                    editButton.dataset.taskId = task.id;
                    editButton.dataset.taskName = task.name;
                    editButton.textContent = 'Edit';
                    editButton.addEventListener('click', editTask);

                    taskDetails.append(desc, taskDesc, due, taskDue, priority, taskPriority,editButton);


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