import { listObject } from "./myLibrary.js";

const ToDoList = (function () {
    const create = function (name) {
        const type = 'projectList';
        let selected = false;
        const list = [];
        let idCount = 1;
        return Object.assign(Object.create(listObject),{ name, type, selected, list, idCount });
    };
    return { create };

})();


const Project = (function () {
    const create = function (obj) {
        const { name, color = 'PowderBlue' } = obj;
        const type = 'project';
        let selected = false;
        const list = [];
        let idCount = 1;
        return Object.assign(Object.create(listObject), { name, type, selected, color, list, idCount });
;
    };
    return { create };
})();

const Task = (function () {
    const create = function (obj) {
        const { name, description = null, due = null, proiority = 'normal' } = obj;
        const type = 'task';
        let selected = false;
        const { select } = { listObject };
        return { name, description, due, proiority, type, selected, select };
    };
    return { create };

})();

const addTemplate = function (userList) {
    const templateProject = Project.create('My Errands');
    templateProject.add(Task.create({ name: 'Buy milk' }));
    templateProject.add(Task.create({ name: 'Pay cable bill' }));
    userList.add(templateProject);
};


export { ToDoList, Project, Task, addTemplate };
