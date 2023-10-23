const todos = [];
const RENDER_EVENT = "render-todo";
const SAVED_ITEM = "saved-todo";
const STORAGE_KEY = "TODO_APPS";

function isStorageExist() {
  if (typeof Storage !== undefined) {
    return true;
  }
  alert("Browser tidak mendukung local storage");
  return false;
}

function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_ITEM));
  }
}

function loadDataStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);
  if (data !== null) {
    for (const todoItem of data) {
      todos.push(todoItem);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function generateId() {
  return +new Date();
}

function generateTodoObject(id, task, date, isCompleted) {
  return {
    id,
    task,
    date,
    isCompleted,
  };
}

function addTodo() {
  const titleTodo = document.getElementById("title").value;
  const dateTodo = document.getElementById("date").value;

  const ID = generateId();
  const todoObject = generateTodoObject(ID, titleTodo, dateTodo, false);
  todos.push(todoObject);
  saveData();

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function makeDisplayTodo(todoObject) {
  const titleTodo = document.createElement("h2");
  titleTodo.innerText = todoObject.task;

  const dateTodo = document.createElement("p");
  dateTodo.innerText = todoObject.date;

  const todoContainer = document.createElement("div");
  todoContainer.classList.add("inner");
  todoContainer.append(titleTodo, dateTodo);

  const parentContainer = document.createElement("div");
  parentContainer.classList.add("item", "shadow");
  parentContainer.append(todoContainer);
  parentContainer.setAttribute("id", `todo-${todoObject.id}`);

  if (todoObject.isCompleted) {
    const undoButton = document.createElement("button");
    undoButton.classList.add("undo-button");

    undoButton.addEventListener("click", function () {
      undoTaskFromCompleted(todoObject.id);
    });

    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-button");

    trashButton.addEventListener("click", function () {
      removeTaskFromCompleted(todoObject.id);
    });

    parentContainer.append(undoButton, trashButton);
  } else {
    const checkButton = document.createElement("button");
    checkButton.classList.add("check-button");

    checkButton.addEventListener("click", function () {
      addTaskToCompleted(todoObject.id);
    });

    parentContainer.append(checkButton);
  }

  return parentContainer;
}

function findTodo(todoId) {
  for (const todoItem of todos) {
    if (todoItem.id === todoId) {
      return todoItem;
    }
  }
  return null;
}

function addTaskToCompleted(todoId) {
  const todoTarget = findTodo(todoId);

  if (todoTarget == null) return;

  todoTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function findTodoIndex(todoId) {
  for (const index in todos) {
    if (todos[index].id === todoId) {
      return index;
    }
  }

  return -1;
}

function removeTaskFromCompleted(todoId) {
  const todoTarget = findTodoIndex(todoId);

  if (todoTarget === -1) return;

  todos.splice(todoTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function undoTaskFromCompleted(todoId) {
  const todoTarget = findTodo(todoId);

  if (todoTarget == null) return;

  todoTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

document.addEventListener(RENDER_EVENT, function () {
  const uncompletedTodoList = document.getElementById("todos");
  uncompletedTodoList.innerHTML = "";

  const completedTodoList = document.getElementById("completed-todos");
  completedTodoList.innerHTML = "";

  for (const todoItem of todos) {
    const todoElement = makeDisplayTodo(todoItem);
    if (!todoItem.isCompleted) {
      uncompletedTodoList.append(todoElement);
    } else {
      completedTodoList.append(todoElement);
    }
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("form");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTodo();
  });

  if (isStorageExist()) {
    loadDataStorage();
  }
});

document.addEventListener(SAVED_ITEM, function () {  
  alert(`Data berhasil ditambahkan`);
});
