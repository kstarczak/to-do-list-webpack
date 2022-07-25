import { PubSub } from "./pubSub.js";
import { listObject } from "./myLibrary.js";

const ToDoList = (function () {
    const create = function (name) {
        const type = 'projectList';
        const selected = false;
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

export { ToDoList, Project, Task };
