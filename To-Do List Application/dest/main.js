const inputBox = document.querySelector('#inputBox');
const addBtn = document.querySelector('#addBtn');
const taskContainer = document.querySelector('#taskContainer');

/* ----------------------------------------- FUNCTIONS ----------------------------------------- */

// Creates Task Element - creates HTML elements representing a task and appends them to the taskContainer in the HTML.
const createTask = (taskObj) => {

    // Create HTML elements for the task
    const div = document.createElement('div');
    const toggleBtn = document.createElement('button');
    const toggleImg = document.createElement('img');
    const p = document.createElement('p');
    const deleteTaskBtn = document.createElement('button');

    // Set class and styles for the task div
    div.className = 'flex w-[440px] mt-2 rounded-2xl p-2 bg-blue-100 hover:bg-blue-200';
    div.id = taskObj.id;

    // Set class and attributes for the toggle button
    toggleBtn.className = 'mr-2 flex-grow-0 flex-shrink-0';
    toggleBtn.setAttribute('data-action', 'toggle');

    // Set class and attributes for the toggle image (checkbox icon)
    toggleImg.className = "w-5 hover:border-2 hover:border-gray-500 hover:rounded-full";
    toggleImg.setAttribute('data-action', 'toggle');
    toggleImg.src = taskObj.completed ? "./Assets/images/checked.png" : "./Assets/images/unchecked.png";

    // Append the toggle image to the toggle button
    toggleBtn.appendChild(toggleImg);

    // Append the toggle button to the task div
    div.appendChild(toggleBtn);

    // Set text content and styles for the task description paragraph
    p.innerText = `${taskObj.content}`;
    p.className = `flex-grow cursor-default ${taskObj.completed ? 'line-through' : 'cursor-default flex-grow'}`;

    // Append the paragraph to the task div
    div.appendChild(p);

    // Set class and attributes for the delete button
    deleteTaskBtn.className = 'flex-grow-0 flex-shrink-0 text-lg w-6 h-6 flex justify-center items-center pb-1 hover:bg-slate-300 rounded-full';
    deleteTaskBtn.setAttribute('data-action', 'delete task');
    deleteTaskBtn.innerText = '\u00d7';

    // Append the delete button to the task div
    div.appendChild(deleteTaskBtn);

    // Append the task div to the taskContainer in the HTML
    taskContainer.appendChild(div);
}

// Adds Task to the ToDo list
const addTask = () => {

    // Check if the input box is empty
    if (inputBox.value === '') {
        window.alert('Task cannot be Empty!');
        return  // Exit the function if the input box is empty
    };

    //'taskData' object, representing the new task.
    const taskObj = {
        id: Math.floor((Math.random() * 100)),  // Generate a unique identifier for the task
        content: inputBox.value, // Get the task content from the input box
        completed: false // Set the initial completion state to false
    }

    // Create the HTML elements for the task and append them to the task container
    createTask(taskObj);

    // Add the task data to local storage for persistence
    addTaskToLocalStorage(taskObj);

    // Clear the input box after adding the task
    inputBox.value = '';
}

// Calls addTask when the Enter key is pressed
const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
}

// Toggles the task completion state in the UI and updates the state in local storage
const toggleTaskState = (ele) => {

    // grabs check box image
    const checkBoxImg = ele.querySelector('img');
    //grabs task description paragraph
    const taskPara = ele.querySelector('p');

    // Toggle the source of the check box image between checked and unchecked icons
    checkBoxImg.src = (checkBoxImg.src).includes('unchecked') ? "./Assets/images/checked.png" : "./Assets/images/unchecked.png"

    // Toggle the 'line-through' class on the task description paragraph
    taskPara.classList.toggle('line-through')

    // Retrieve the unique identifier (id) of the task div
    const eleId = ele.id;

    // Retrieve the ToDo data from local storage and parse it as JSON
    const LocalStorageData = JSON.parse(localStorage.getItem('ToDoData'));

    // Iterate through the Retrieved ToDo data to find the task with the matching id
    LocalStorageData.forEach((ele) => {
        if (ele.id === parseInt(eleId)) {
            // Toggle the completion state of the task in the local storage data
            ele.completed = ele.completed ? false : true;
        }
    })

    // Update the local storage with the modified ToDo data
    localStorage.setItem('ToDoData', JSON.stringify(LocalStorageData));
}

// Deletes a task from the UI and local storage
const deleteTask = (ele) => {

    // Retrieve the unique identifier (id) of the task div
    const eleId = ele.id;

    // Remove the task from the task list
    ele.remove();

    // Retrieve the ToDo data from local storage and parse it as JSON
    const LocalStorageData = JSON.parse(localStorage.getItem('ToDoData'));

    // Find the index of the task with the matching id in the Retrieved ToDo data
    const delIndex = LocalStorageData.findIndex((ele) => ele.id === parseInt(eleId));

    // Remove the task at the identified index from the Retrieved ToDo data
    LocalStorageData.splice(delIndex, 1);

    // Update the local storage with the modified ToDo data
    localStorage.setItem('ToDoData', JSON.stringify(LocalStorageData));
}

// Adds a task object to local storage
const addTaskToLocalStorage = (taskObj) => {

    // Retrieve the current ToDo data from local storage and parse it as JSON, or initialize an empty array if no data is present
    const LocalStorageData = localStorage.getItem('ToDoData') ? JSON.parse(localStorage.getItem('ToDoData')) : [];

    // Push the new task object onto the ToDo data array
    LocalStorageData.push(taskObj);

    // Update the local storage with the modified ToDo data
    localStorage.setItem('ToDoData', JSON.stringify(LocalStorageData));
}

// Self-invoking function to create the task list from local storage on page load
(function createListFromLocalStorage() {

    // Retrieve the current ToDo data from local storage and parse it as JSON, or initialize an empty array if no data is present
    const LocalStorageData = JSON.parse(localStorage.getItem('ToDoData')) || [];

    // Iterate through each task object in the parsed ToDo data array
    LocalStorageData.forEach((taskObj) => {
        // Call the createTask function to dynamically create and add the task to the UI
        createTask(taskObj);
    })
})()

// Checks for the data-action attribute to toggle task state or delete a task.
const handleTaskContainerClick = (event) => {

    // Check if the clicked element has a 'data-action' attribute
    const dataSetAction = event.target.dataset && event.target.dataset.action;

    // Switch statement to handle different data-action values
    switch (dataSetAction) {
        case 'toggle':
            // Finds the toggle button element
            const buttonElement = event.target.closest('button');
            const targetElement = buttonElement || event.target;

            // Call the toggleTaskState function with the parent element of the toggle button element
            toggleTaskState(targetElement.parentElement);
            break;
        case 'delete task':
            // Call the deleteTask function with the parent element of the delete button
            deleteTask(event.target.parentElement);
            break;
        default:
            break;
    }
}

/* ----------------------------------------- EVENT LISTENERS ----------------------------------------- */

// Listens for the "Add" button click to add a new task.
addBtn.addEventListener('click', addTask);

// Listens for "Enter" key press to add a new task.
inputBox.addEventListener('keydown', handleKeyDown);

// Listens for the 'click' event on the task container.
taskContainer.addEventListener('click', handleTaskContainerClick)