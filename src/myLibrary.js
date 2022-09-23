import PubSub from "./pubSub.js";

const deleteAllChildren = function (parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
};

const listObject = {
    add: function (item) {
        item.id = this.idCount;
        this.idCount++;
        this.list.push(item);
    },
    delete: function (itemId) {
        this.list = this.list.filter(obj => obj.id !== itemId);
    },
    select: function (itemId) {
        this.list.forEach(function (item) {
            if (item.id === itemId) {
                item.selected = true;
            } else {
                item.selected = false;
            }
        });
    },
    toggleComplete: function (itemId) {
        let completedItem = this.list.find((item) => item.id === itemId);
        if (completedItem.completed) {
            completedItem.completed = false;
        } else {
            completedItem.completed = true;
        }
    },
};


export { deleteAllChildren, listObject };