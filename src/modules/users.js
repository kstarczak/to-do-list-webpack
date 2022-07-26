import PubSub from './pubSub';
import { ToDoList, Project, Task } from './listComponents';

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
PubSub.subscribe('addUser', Users.addUser);
PubSub.subscribe('selectUser', Users.switchUser);




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
        if (getCurrentProject().id === projectId) {
            const message = 'Create a new project or select a curent project to add tasks.'
            PubSub.publish('currentProjectDeleted', message);
        }
        currentUser.delete(projectId);
        PubSub.publish('projectListModified', currentUser.list);
    }
    
    const displayProjectTasks = function (projectId) {
        const currentUser = Users.currentUser();
        currentUser.select(projectId);
        const currentProjectTaskList = getCurrentProject().list;
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
        PubSub.publish('projectModifed', currentProject.list)
    }

    return { addProjectToCurrentUser, delProjectFromCurrentUser, 
        displayProjectTasks, addTaskToCurrentProject, deleteTaskFromCurrentUser}
    
})();
PubSub.subscribe('selectProject', List.displayProjectTasks);
PubSub.subscribe('addProject', List.addProjectToCurrentUser );
PubSub.subscribe('deleteProject', List.delProjectFromCurrentUser );
PubSub.subscribe('addTask', List.addTaskToCurrentProject);
PubSub.subscribe('deleteTask', List.deleteTaskFromCurrentUser);

export { Users, List };