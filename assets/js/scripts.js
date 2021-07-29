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
let todoItems = [
  {text:"Complete online JavaScript Course", checked: true, hidden: false, id: 0},
  {text:"Jog around the park", checked: false, hidden: false, id: 1},
  {text:"10 minutes meditation", checked: false, hidden: false, id: 2},
  {text:"Read for 1 hour", checked: false, hidden: false, id: 3},
  {text:"Pickup groceries", checked: false, hidden: false, id: 4},
  {text:"Complete Todo App on frontendmentor", checked: false, hidden: false, id: 5},
];

// This function will create a new todo object based on the
// text that was entered in the text input, and push it into
// the `todoItems` array
function addTodo(text) {
  const todo = {
    text,
    checked: false,
    hidden: false,
    id: Date.now(),
  };

  todoItems.push(todo);
  renderTodo(todo);
}

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
  let arrCheckedTodos = [];

  todoItems.forEach(el => {
    if (el.checked == true) {
      arrCheckedTodos.push(el);
    }
  });

  if (todo.deleted) {
    // remove the item from the DOM
    item.remove();
    document.querySelector("#left").innerHTML = `
    ${todoItems.length - arrCheckedTodos.length} items left
    `
    return
  }

  if (todo.hidden == true) {
    // hide the item from the DOM
    item.style.display = "none";
    // Remember to return otherwise it will be drawn by some of the next code!
    return 
  }

  const isChecked = todo.checked ? 'done': '';
  const node = document.createElement("li");
  node.setAttribute('class', `between-flex todo-item`);
  node.setAttribute('data-key', todo.id);
  node.innerHTML = `
    <label class="checkbox" for="${todo.id}">
    <input type="checkbox" id="${todo.id}">
    <span class="checkmark ${isChecked}"></span>
    <span class="todo-text">${todo.text}</span>
    </label>
    <button type="button" aria-label="delete item" class="delete"></button>
  `;

  document.querySelector("#left").innerHTML = `
  ${todoItems.length - arrCheckedTodos.length} items left
  `
  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
}

// Add a click event listener to the list and its children
const list = document.querySelector('.todo-container');
const checkbox = document.querySelector(".checkbox");

list.addEventListener('click', event => {
  if (event.target.classList.contains('checkmark')) {
    const itemKey = event.target.parentElement.parentElement.dataset.key;
    toggleDone(itemKey);
    checkbox.classList.toggle("checked");
  }

  if (event.target.classList.contains('todo-text')) {
    const itemKey = event.target.parentElement.parentElement.dataset.key;
    toggleDone(itemKey);
    checkbox.classList.toggle("checked");
  }

  if (event.target.classList.contains('delete')) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});


// Add a click event listener to the footer and its children
const footer = document.querySelector(".footer-container");
const allEl = document.querySelector("#all");
const activeEl = document.querySelector("#active");
const completedEl = document.querySelector("#completed");


footer.addEventListener("click", event => {
  if (event.target == allEl) {
    all();
    event.target.classList.add("active");
    activeEl.classList.remove("active");
    completedEl.classList.remove("active")
  }
  if (event.target == activeEl) {
    active();
    event.target.classList.add("active");
    allEl.classList.remove("active");
    completedEl.classList.remove("active")
  }
  if (event.target == completedEl) {
    completed();
    event.target.classList.add("active");
    activeEl.classList.remove("active");
    allEl.classList.remove("active")
  }
  if (event.target == document.querySelector("#clear")) {
    clear();
  }
});

function all() {
  todoItems.forEach(el => {
    if (el.hidden == true) {
      el.hidden = false;
    }
    renderTodo(todoItems[todoItems.indexOf(el)]);
  });
}

function active() {
  todoItems.forEach(el => {
    if (el.checked == true) {
      el.hidden = true;
    } else {
      el.hidden = false;
    }
    renderTodo(todoItems[todoItems.indexOf(el)]);
  });
}

function completed() {
  todoItems.forEach(el => {
    if (el.checked == true) {
      el.hidden = false;

    } else {
      el.hidden = true;
    }
    renderTodo(todoItems[todoItems.indexOf(el)]);
  });
}

function clear() {
  todoItems.forEach(el => {
    if (el.checked == true) {
      deleteTodo(el.id);
    }
  });
}