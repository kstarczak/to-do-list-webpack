import PubSub from "./pubSub.js";
import { deleteAllChildren } from "./myLibrary.js";

//DeleteProjectModal (are you sure???)

const loadModalTemplate = () => {
    const content = document.getElementById('content');
    let contentCover;
    if (document.querySelector('.content-cover')) {
        contentCover = document.querySelector('.content-cover');
    } else {
        contentCover = document.createElement('div'); 
        contentCover.classList.add('content-cover');
        content.appendChild(contentCover);
    };
    contentCover.classList.add('cover');

    let formContainer;
    if (document.querySelector('.form-container')) {
        formContainer = document.querySelector('.form-container');
    } else {
        formContainer = document.createElement('div'); 
        formContainer.classList.add('form-container');
        content.appendChild(formContainer);
    };
    formContainer.classList.add('open');
}

const closeModal = () => {
    const contentCover = document.querySelector('.content-cover');
    const formContainer = document.querySelector('.form-container');
    deleteAllChildren(formContainer);
    formContainer.classList.remove('open');
    contentCover.classList.remove('cover');
}
/*
const confirmDelete = ()=>
    loadModalTemplate();
*/

const addUser = () => {
    loadModalTemplate();
    const formContainer = document.querySelector('.form-container')

    const userForm = document.createElement('form');
    userForm.className = 'user-form';
    userForm.setAttribute('autocomplete', 'off');

    const header = document.createElement('div');
    header.classname = 'user-header';
    header.textContent = 'Welcome to my TO-DO list!';
    header.className = 'welcome-header';


    const subHeading = document.createElement('div');
    subHeading.textContent = 'Enter your name below to get started.';
    subHeading.className = 'user-sub-heading';
    
    const nameField = document.createElement('div');
    const nameLabel = document.createElement('label');
    nameLabel.for = 'name';
    nameLabel.textContent = 'Name:'
    const nameInput = document.createElement('input');
    nameInput.id = 'name';
    nameInput.type = 'text'
    nameField.append(nameLabel, nameInput);

    const submitForm = () => {
        const name = nameInput.value;
        closeModal();
        PubSub.publish('addUser', name);
    };
    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('button-group');
    
    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.classList.add('button', 'cancel');
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', closeModal);

    const submitButton = document.createElement('button')
    submitButton.type = 'button';
    submitButton.classList.add('button', 'submit');
    submitButton.textContent = 'Create';
    submitButton.addEventListener('click', submitForm);

    buttonGroup.append(cancelButton, submitButton);


    userForm.append(header, subHeading, nameField, buttonGroup);
    userForm.addEventListener('submit', (event) => {
        event.preventDefault();
        submitForm();
    });


    formContainer.append(userForm);
};



const addProject = () => {
    loadModalTemplate();
    const formContainer = document.querySelector('.form-container')

    const projectForm = document.createElement('form');
    projectForm.className = 'project-form';
    projectForm.setAttribute('autocomplete', 'off');

    const header = document.createElement('div');
    header.textContent = 'Create New Project';
    header.className = 'header';
    
    const nameField = document.createElement('div');
    const nameLabel = document.createElement('label');
    nameLabel.for = 'name';
    nameLabel.textContent = 'Project Name:'
    const nameInput = document.createElement('input');
    nameInput.id = 'name';
    nameInput.type = 'text'
    nameField.append(nameLabel, nameInput);

    const colorField = document.createElement('div');
    const colorLabel = document.createElement('label');
    colorLabel.for = 'color1';

    colorLabel.textContent = 'Choose a color (optional)';
    const colorInput = document.createElement('input');
    colorInput.id = 'color';
    colorInput.type= 'color'
    colorInput.value = "#f6b73c"
    colorInput.addEventListener('change', function() { colorLabel.style.backgroundColor = this.value; });
    colorField.append(colorLabel, colorInput);


    const submitForm = () => {
        const name = document.getElementById('name').value;
        const color = document.getElementById('color').value;
        const newProject = { name, color };
        closeModal();
        PubSub.publish('addProject', newProject);
    };
    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('button-group');
    
    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.classList.add('button', 'cancel');
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', closeModal);

    const submitButton = document.createElement('button')
    submitButton.type = 'button';
    submitButton.classList.add('button', 'submit');
    submitButton.textContent = 'Create';
    submitButton.addEventListener('click', submitForm);

    buttonGroup.append(cancelButton, submitButton);


    projectForm.append(header, nameField, colorField, buttonGroup);
    projectForm.addEventListener('submit', (event) => {
        event.preventDefault();
        submitForm();
    });

    formContainer.append(projectForm);
    
};


const addTask = () => {
    loadModalTemplate();
    const formContainer = document.querySelector('.form-container')

    const taskForm = document.createElement('form');
    taskForm.className = 'task-form';
    taskForm.setAttribute('autocomplete', 'off');

    const header = document.createElement('div');
    header.textContent = 'Create New task';
    header.className = 'header';
    
    const nameField = document.createElement('div');
    const nameLabel = document.createElement('label');
    nameLabel.for = 'name';
    nameLabel.textContent = 'Task Name:'
    const nameInput = document.createElement('input');
    nameInput.id = 'name';
    nameInput.type = 'text'
    nameField.append(nameLabel, nameInput);

    const descField = document.createElement('div');
    const descLabel = document.createElement('label');
    descLabel.for = 'description';
    descLabel.textContent = 'Task Description:'
    const descInput = document.createElement('textarea');
    descInput.id = 'description';
    descInput.setAttribute('rows', '4');
    descField.append(descLabel, descInput);


    const dueField = document.createElement('div');
    const dueLabel = document.createElement('label');
    dueLabel.for = 'due';
    dueLabel.textContent = 'Task Due:'
    const dueInput = document.createElement('input');
    dueInput.id = 'due';
    dueInput.type = 'date'
    dueField.append(dueLabel, dueInput);

    const priField = document.createElement('div');
    const priLabel = document.createElement('label');
    priLabel.for = 'priority';
    priLabel.textContent = 'Task priority:'
    const priInput = document.createElement('select');
    priInput.id = 'priority'
    const low = document.createElement('option');
    low.textContent = 'low';
    const med = document.createElement('option');
    med.value = 'medium';
    med.textContent = 'medium (default)';
    med.setAttribute('selected', true);
    const high = document.createElement('option');
    high.textContent = 'high';
    priInput.append(low, med, high);
    priField.append(priLabel, priInput);

    const submitForm = () => {
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const due = document.getElementById('due').value;
        const priority = document.getElementById('priority').value;
        const newTask = { name, description, due, priority };
        closeModal();
        PubSub.publish('addTask', newTask);
    };


    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('button-group');
    
    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.classList.add('button', 'cancel');
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', closeModal);

    const submitButton = document.createElement('button')
    submitButton.type = 'button';
    submitButton.classList.add('button', 'submit');
    submitButton.textContent = 'Create';
    submitButton.addEventListener('click', submitForm);

    buttonGroup.append(cancelButton, submitButton);


    taskForm.append(header, nameField, descField, dueField, priField, buttonGroup);
    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        submitForm();
    });

    formContainer.append(taskForm);
};

/* editTask selects the DOM data from the current task, creates a form, 
then populates the form with that data */
const editTask = (e) => {
    
    const button = e.target;
    const taskId = button.dataset.taskId;
    const name = button.dataset.taskName;
    const details = Array.from(button.parentElement.children);
    const currentName = name.textContent;
    const desc = details.find((child) => child.className === 'task-description');
    const currentDesc = desc.textContent
    const due = details.find((child) => child.className === 'task-due');
    const currentDue = due.textContent;
    const pri = details.find((child) => child.className === 'task-priority');
    const currentPri = pri.textContent;

    loadModalTemplate();
    const formContainer = document.querySelector('.form-container')

    const taskForm = document.createElement('form');
    taskForm.className = 'task-form';
    taskForm.setAttribute('autocomplete', 'off');

    const header = document.createElement('div');
    header.textContent = 'Create New task';
    header.className = 'header';
    
    const nameField = document.createElement('div');
    const nameLabel = document.createElement('label');
    nameLabel.for = 'name';
    nameLabel.textContent = 'Task Name:'
    const nameInput = document.createElement('input');
    nameInput.id = 'name';
    nameInput.type = 'text'
    nameField.append(nameLabel, nameInput);
    nameInput.value = currentName;

    const descField = document.createElement('div');
    const descLabel = document.createElement('label');
    descLabel.for = 'description';
    descLabel.textContent = 'Task Description:'
    const descInput = document.createElement('textarea');
    descInput.id = 'description';
    descInput.setAttribute('rows', '4');
    descField.append(descLabel, descInput);
    descInput.value = currentDesc;


    const dueField = document.createElement('div');
    const dueLabel = document.createElement('label');
    dueLabel.for = 'due';
    dueLabel.textContent = 'Task Due:'
    const dueInput = document.createElement('input');
    dueInput.id = 'due';
    dueInput.type = 'date'
    dueField.append(dueLabel, dueInput);
    dueInput.value = currentDue;

    const priField = document.createElement('div');
    const priLabel = document.createElement('label');
    priLabel.for = 'priority';
    priLabel.textContent = 'Task priority:'
    const priInput = document.createElement('select');
    priInput.id = 'priority'
    const low = document.createElement('option');
    low.value = 'low';
    low.textContent = 'low';
    const med = document.createElement('option');
    med.value = 'medium';
    med.textContent = 'medium (default)';
    const high = document.createElement('option');
    high.value = 'high';
    high.textContent = 'high';
    priInput.append(low, med, high);
    priField.append(priLabel, priInput);
    priInput.value = currentPri;

    const submitForm = () => {
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const due = document.getElementById('due').value;
        const priority = document.getElementById('priority').value;
        const task = { name, description, due, priority };
        const modifiedTask = { id: parseInt(taskId) , task};
        closeModal();
        console.log(modifiedTask);
        PubSub.publish('editTask', modifiedTask)
    };


    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('button-group');
    
    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.classList.add('button', 'cancel');
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', closeModal);

    const submitButton = document.createElement('button')
    submitButton.type = 'button';
    submitButton.classList.add('button', 'submit');
    submitButton.textContent = 'Create';
    submitButton.addEventListener('click', submitForm);

    buttonGroup.append(cancelButton, submitButton);
    taskForm.append(header, nameField, descField, dueField, priField, buttonGroup);
    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        submitForm();
    });


    formContainer.append(taskForm);
};


export { addProject, addTask, editTask, addUser };
