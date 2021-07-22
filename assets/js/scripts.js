// Theme changer

const body = document.querySelector("body");
const toDark = document.querySelector("#toDark");
const toLight = document.querySelector("#toLight");

function toggleTheme() {
  if (body.classList.contains("theme-light")) {
    body.classList.replace("theme-light", "theme-dark");
    toDark.classList.remove("hide");
    toLight.classList.add("hide");
  } else {
    body.classList.replace("theme-dark", "theme-light");
    toLight.classList.remove("hide");
    toDark.classList.add("hide");
  }
}

// TODO app (folowed a tutorial from: https://freshman.tech/todo-list/)

// This is the array that will hold the todo list items
let todoItems = [0, 1, 2, 3, 4, 5];
const list = document.querySelector('.todo-container');

// This function will create a new todo object based on the
// text that was entered in the text input, and push it into
// the `todoItems` array
function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  todoItems.push(todo);
  renderTodo(todo);
}

// Select the form element
const form = document.querySelector('.todo-create');
// Add a submit event listener
form.addEventListener('submit', event => {
  // prevent page refresh on form submission
  event.preventDefault();
  // select the text input
  const input = document.querySelector('.todo-input');

  // Get the value of the input and remove whitespace
  const text = input.value.trim();
  if (text !== '') {
    addTodo(text);
    input.value = '';
    input.focus();
  }
});

function renderTodo(todo) {
  const item = document.querySelector(`[data-key='${todo.id}']`);

  // add this if block
  if (todo.deleted) {
    // remove the item from the DOM
    item.remove();
    return
  }

  const isChecked = todo.checked ? 'done': '';
  const node = document.createElement("li");
  node.setAttribute('class', `between-flex todo-item ${isChecked}`);
  node.setAttribute('data-key', todo.id);
  node.innerHTML = `
    <label class="checkbox" for="${todo.id}">
    <input type="checkbox" id="${todo.id}">
    <span class="checkmark"></span>
    <span class="todo-text">${todo.text}</span>
    </label>
    <button type="button" aria-label="delete item" class="delete"><img src="assets/images/icon-cross.svg" alt=""></button>
  `;

  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
}

// Add a click event listener to the list and its children
list.addEventListener('click', event => {
  if (event.target.classList.contains('checkbox')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }
});

function toggleDone(key) {
  // findIndex is an array method that returns the position of an element
  // in the array.
  const index = todoItems.findIndex(item => item.id === Number(key));
  // Locate the todo item in the todoItems array and set its checked
  // property to the opposite. That means, `true` will become `false` and vice
  // versa.
  todoItems[index].checked = !todoItems[index].checked;
  renderTodo(todoItems[index]);
}

list.addEventListener('click', event => {
  if (event.target.classList.contains('checkbox')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }

  // add this `if` block
  if (event.target.classList.contains('delete')) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});

function deleteTodo(key) {
  // find the corresponding todo object in the todoItems array
  const index = todoItems.findIndex(item => item.id === Number(key));
  // Create a new object with properties of the current todo item
  // and a `deleted` property which is set to true
  const todo = {
    deleted: true,
    ...todoItems[index]
  };
  // remove the todo item from the array by filtering it out
  todoItems = todoItems.filter(item => item.id !== Number(key));
  renderTodo(todo);
}