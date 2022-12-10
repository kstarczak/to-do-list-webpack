import PubSub from './pubSub.js';
import { ToDoList, Project, Task } from './listComponents.js';

const Users = (function () {
    // add code the check if allUsers exists in local storage on load, if not run code below and publish it to local storage:
    
    const allUsers = [];
    const addUser = function (name) {
        if (allUsers.find(user => user.name === name)) {
            const promptName = prompt(`A user with the name "${name}" already exists! Please enter a new user name.`);
            addUser(promptName);
        } else {
            const newUser = ToDoList.create(name);
            allUsers.push(newUser);
            switchUser(newUser);
            addTemplate();
        };
    };
    const switchUser = function (user) {
        if (allUsers.includes(user) && !user.selected) {
            allUsers.forEach(u => u.selected = false);
            user.selected = true;
            PubSub.publish('userSelected', user);
        };
    };
    const currentUser = function () {
        return allUsers.find(user => user.selected);
    }

    return {addUser, switchUser, currentUser};
}) ();

const subToUserModal = ()=> {
    PubSub.subscribe('addUser', Users.addUser);
    PubSub.subscribe('selectUser', Users.switchUser);
}


const List = (function () {
    const getCurrentProject = function () {
        const currentUser = Users.currentUser();
        return currentUser.list.find(project => project.selected);
    };
    
    const addProjectToCurrentUser = function (projectData) {
        const currentUser = Users.currentUser();
        const newProject = Project.create(projectData);
        currentUser.add(newProject);
        currentUser.select(newProject.id);
        PubSub.publish('projectListModified', currentUser.list);
    }
    
    const delProjectFromCurrentUser = function(projectId) {
        const currentUser = Users.currentUser();
        if (getCurrentProject()  && getCurrentProject().id === projectId) {
            const message = 'Select a current project or create a new project to add tasks.'
            PubSub.publish('currentProjectDeleted', message);
        }
        currentUser.delete(projectId);
        PubSub.publish('projectListModified', currentUser.list);
    }
    
    const displayProjectTasks = function (projectId) {
        const currentUser = Users.currentUser();
        currentUser.select(projectId);
        const currentProjectTaskList = getCurrentProject().list;
        PubSub.publish('projectListModified', currentUser.list)
        PubSub.publish('projectSelected', currentProjectTaskList)
    }
    
    const addTaskToCurrentProject = function (taskData) {
        const currentProject = getCurrentProject();
        const newTask = Task.create(taskData);
        currentProject.add(newTask);
        currentProject.select(newTask.id);
        PubSub.publish('projectModified', currentProject.list);
    }
    const deleteTaskFromCurrentUser = function (taskId) {
        const currentProject = getCurrentProject();
        currentProject.delete(taskId);
        PubSub.publish('projectModified', currentProject.list)
    }

    const displayTaskInfo = function (taskId) {
        const currentProject = getCurrentProject();
        currentProject.select(taskId);
        PubSub.publish('taskSelected', currentProject.list)
    }
    const editTask = function (obj) {
        const {id, task} = obj;
        const currentProject = getCurrentProject();
        const taskToEdit = currentProject.list.find((task) => task.id === id);
        taskToEdit.name = task.name;
        taskToEdit.description = task.description;
        taskToEdit.due = task.due;
        taskToEdit.priority = task.priority;
        PubSub.publish('taskEdited', currentProject.list);
    }
    const toggleTaskComplete = function (taskId) {
        const currentProject = getCurrentProject();
        const taskToComplete = currentProject.list.find((task) => task.id === parseInt(taskId));
        console.log('taskToComplete');
        if (taskToComplete.completed) {
            taskToComplete.completed = false;
        } else {
            taskToComplete.completed = true;
        }
    }
    return { addProjectToCurrentUser, delProjectFromCurrentUser, 
        displayProjectTasks, addTaskToCurrentProject, deleteTaskFromCurrentUser, displayTaskInfo, toggleTaskComplete, editTask};
    
})();

const subToInterface = () => {
    PubSub.subscribe('selectProject', List.displayProjectTasks);
    PubSub.subscribe('addProject', List.addProjectToCurrentUser );
    PubSub.subscribe('deleteProject', List.delProjectFromCurrentUser );
    PubSub.subscribe('addTask', List.addTaskToCurrentProject);
    PubSub.subscribe('deleteTask', List.deleteTaskFromCurrentUser);
    PubSub.subscribe('selectTask', List.displayTaskInfo);
    PubSub.subscribe('completeTask', List.toggleTaskComplete);
    PubSub.subscribe('editTask', List.editTask);
}



function addTemplate() {
    List.addProjectToCurrentUser({ name: 'Grocery List', color: 'PowderBlue' });
    List.addTaskToCurrentProject({ name: 'milk', description: null, due: null, proiority: 'normal'});
    List.addTaskToCurrentProject({ name: 'bread', description: 'Gluten-free kind!', due: null, proiority: 'normal'})
};
    


export { Users, List, subToInterface, subToUserModal, addTemplate};