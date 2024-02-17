# To-Do List Application

This is a simple ToDo list application built using `HTML`, `Tailwind CSS`, and `JavaScript`. It allows users to add, toggle completion state, and delete tasks. The application stores tasks in the local storage, providing persistence across page refreshes.

### Features

The To-Do list application provides the following features:

- **Add Task:** Users can add a new task by typing in the input box and clicking the "Add" button or pressing the "Enter" key.

- **Toggle Task State:** Tasks can be marked as complete or incomplete by clicking on the checkbox icon next to each task.

- **Delete Task:** Users can remove a task by clicking the delete button (represented by 'x').

- **Local Storage:** Tasks are stored in the browser's local storage, allowing data persistence.

### Usage

- **Adding a Task:**
  - Type the task in the input box.
  - Click the "Add" button or press "Enter" to add the task.
  
- **Toggling Task State:**
  - Click on the checkbox icon next to a task to toggle its completion state.
  
- **Deleting a Task:**
  - Click the 'x' button next to a task to delete it.

## Code Explanation

### Code Structure

The project consists of the following main files:

- `index.html`: Main HTML file containing the structure of the ToDo application.
- `styles.css`: Stylesheet for styling the application. (Uses Tailwind CSS classes)
- `script.js`: JavaScript file containing the logic for adding, toggling, and deleting tasks, as well as local storage functionality.
- `Assets/`: Folder containing images used in the application.

### JavaScript Functions

- #### `createTask(taskObj)`: The function creates a task div that contains a button for toggling completion, a paragraph for the task description, and a button for deleting the task and appends them to the task Container in the HTML.
  **Parameter**: `taskObj` - Task object containing task details

  ---
- #### `addTask()`: Handles the addition of a new task to the ToDo list. Invoked when the "Add" button is clicked or when the "Enter" key is pressed.
    It creates `taskObj = {id, content, completed}` - Task object containing task details
    - id: Unique identifier for the task
    - content: The text content of the task
    - completed: Boolean indicating whether the task is completed

  ---
- #### `handleKeyDown(event)`: Listens for the "Enter" key press to invoke the `addTask` function.
  **parameter**: `event` - The click event

  ---
- #### `toggleTaskState(ele)`: Toggles the completion state of a task in the UI and updates the state in local storage.
  **parameter**: `ele` - The HTML element representing the task to be toggled

  ---
- #### `deleteTask(ele)`: Deletes a task from the UI and local storage.
  **parameter**: `ele` - The HTML element representing the task to be deleted

  ---
- #### `addTaskToLocalStorage(taskObj)`: Adds a task object to local storage.
  **parameter**: `taskObj` - The task object to be added to local storage

  ---
- #### `createListFromLocalStorage()`: Self-invoking function to create the task list from local storage on page load.
    **Code Break Down**

    `JSON.parse(localStorage.getItem('ToDoData'))` is used to retrieve and parse the JSON data from the 'ToDoData' key in the localStorage. 
    
    The `|| []` part ensures that if the result is falsy (e.g., if the data is not present or cannot be parsed), it defaults to an empty array [].
    ```js
    const LocalStorageData = JSON.parse(localStorage.getItem('ToDoData')) || [];
    ```

    ---
- #### `handleTaskContainerClick(event)`
    **parameter**: `event` - The click event

    **Code Break Down**

    Check if the clicked element has a 'data-action' attribute.

    The `&&` operator returns the second operand if the first operand is truthy; otherwise, it returns the first operand.

    If `event.target.dataset` exists (i.e., it's truthy), the expression continues to evaluate `event.target.dataset.action` and is assigned to `datasetAction`.

    If `event.target.dataset` is `null` or `undefined` (i.e., falsy), the expression short-circuits, and `datasetAction` is assigned the value of `event.target.dataset` (which will be falsy).
    ```js
    const dataSetAction = event.target.dataset && event.target.dataset.action;
    ```

    Finds the toggle button element.

    This code is using the '`closest`' method and the logical OR (`||`) operator to find the toggle button as nearest ancestor button element of the `event.target` ( if `event.target` is img element) and, if not found, fallback to using the `event.target` itself (if `event.target` is toggle button).

    ```js
    const buttonElement = event.target.closest('button');
    const targetElement = buttonElement || event.target;
    ```
    The `closest` method is used on `event.target` to find the nearest ancestor element that matches the specified CSS selector, in this case, '`button`'. If an ancestor button is found, `buttonElement` will be a reference to that button element (toggle button). If not found, `buttonElement` will be null.

    The logical OR (`||`) operator is used to create a fallback mechanism. It checks if `buttonElement` is truthy (i.e., toggle button was found using closest). If it is, targetElement is assigned the value of `buttonElement`. If not (i.e., `buttonElement` is null), it falls back to event.target.

    ---

### HTML and CSS

The HTML file (`index.html`) contains the structure of the ToDo application. The styling is handled by the `styles.css` file, which uses Tailwind CSS classes for styling.

### Local Storage Handling

Tasks are stored in the browser's local storage. If you close the browser or refresh the page, the tasks will persist.

### Event Listeners

- `addBtn.addEventListener('click', addTask)`: Listens for the "Add" button click to add a new task.
- `inputBox.addEventListener('keydown', handleKeyDown)`: Listens for "Enter" key press to add a new task.
- `taskContainer.addEventListener('click', handleTaskContainerClick)`: Checks for the data-action attribute to toggle task state or delete a task.

---
### Dependencies

- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for quickly building custom designs.
- No other external dependencies are required.

### Contributing

Feel free to contribute to the development of this ToDo list application. Submit issues or pull requests to help improve the functionality or fix bugs.