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
        const { name, color = '#a7ffeb' } = obj;
        const type = 'project';
        let selected = false;
        let completed = false;
        const list = [];
        let idCount = 1;
        return Object.assign(Object.create(listObject), { name, type, selected, completed, color, list, idCount });
;
    };
    return { create };
})();

const Task = (function () {
    const create = function (obj) {
        const { name, description = null, due = null, priority = 'normal' } = obj;
        const type = 'task';
        let selected = false;
        let completed = false;
        const { select } = { listObject };
        return { name, type, selected, completed, description, due, priority, select };
    };
    return { create };

})();


export { ToDoList, Project, Task };
