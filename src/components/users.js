import { PubSub } from './pubSub.js';
import { ToDoList, Project, Task } from './toDoList.js';

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
        };
    };
    const switchUser = function (user) {
        if (allUsers.includes(user) && !user.selected) {
            allUsers.forEach(u => u.selected = false);
            user.selected = true;
            //announce that the user was changed, interface will listen and load
            PubSub.publish('userSelected', user);
        };
    };
    const currentUser = function () {
        return allUsers.find(user => user.selected);
    }
    return {addUser, switchUser, currentUser};
}) ();

const addTemplate = function (userList) {
    const templateProject = Project.create('My Errands');
    templateProject.add(Task.create({ name: 'Buy milk' }));
    templateProject.add(Task.create({ name: 'Pay cable bill' }));
    userList.add(templateProject);
};


const getCurrentProject = function () {
    const currentUser = Users.currentUser();
    return currentUser.list.find(project => project.selected);
};

const addProjectToCurrentUser = function (projectData) {
    const currentUser = Users.currentUser();
    const newProject = Project.create(projectData);
    currentUser.add(newProject);
    currentUser.select(newProject.id);
    //PubSub.publish('projectListModified', currentUser.list);
}

const delProjectFromCurrentUser = function(projectId) {
    const currentUser = Users.currentUser();
    if (getCurrentProject().id === projectId) {
        const message = 'Create a new project or select a curent project to add tasks.'
        PubSub.publish('currentProjectDeleted', message);
    }
        
    currentUser.delete(projectId);
    //call getCurrentProject().id and IF it is equal to the projectId 
    //iterate through all project Ids and return the lowest and call select on that function to select
}

const displayProjectTasks = function (projectId) {
    const currentUser = Users.currentUser();
    currentUser.select(projectId)
}

const addTaskToCurrentProject = function (taskData) {
    const currentProject = getCurrentProject();
    const newTask = Task.create(taskData);
    currentProject.add(newTask);
    currentProject.select(newTask.id);
}
const deleteTaskFromCurrentUser = function (taskId) {
    const currentProject = getCurrentProject();
    currentProject.delete(taskId);

}



//subscribe to events where new user is created, interface will announce this 
PubSub.subscribe('addUser', Users.addUser);
PubSub.subscribe('selectUser', Users.switchUser);
PubSub.subscribe('selectProject', displayProjectTasks);
PubSub.subscribe('addProject', addProjectToCurrentUser );
PubSub.subscribe('deleteProject', delProjectFromCurrentUser );
PubSub.subscribe('addTask', addTaskToCurrentProject);
PubSub.subscribe('deleteTask', deleteTaskFromCurrentUser);

export { Users, addTemplate };




/* 
pub sub events that need to be migrated from my library

om ListObject.delete
PubSub.publish(`${this.type}Modified`, pubList);

on ListObject.select
PubSub.publish(`${this.type}Modified`, pubList);
PubSub.publish(`${this.type}Selected`, childList);
*/