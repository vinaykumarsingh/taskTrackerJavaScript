
(function () {
  var taskInput = document.getElementById("new-task");
  var addButton = document.getElementById("addNewTaskButton");
  var incompleteTasksHolder = document.getElementById("incomplete-tasks");
  var completedTasksHolder = document.getElementById("completed-tasks");

  var createNewTaskElement = function (taskString, arr) {
    listItem = document.createElement("li");
    checkBox = document.createElement("input");
    label = document.createElement("label");
    editInput = document.createElement("input");
    editButton = document.createElement("button");
    deleteButton = document.createElement("button");

    checkBox.type = "checkbox";
    editInput.type = "text";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    label.innerText = taskString;

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
  };

  var addTask = function () {
    if (taskInput.value.length > 0) {
      var listItemName = taskInput.value;
      listItem = createNewTaskElement(listItemName)
      incompleteTasksHolder.appendChild(listItem)
      bindTaskEvents(listItem, taskCompleted)
      taskInput.value = "";
    }

  };

  var editTask = function () {
    var listItem = this.parentNode;
    var editInput = listItem.querySelectorAll("input[type=text")[0];
    var label = listItem.querySelector("label");
    var button = listItem.getElementsByTagName("button")[0];

    var containsClass = listItem.classList.contains("editMode");
    if (containsClass) {
      label.innerText = editInput.value
      button.innerText = "Edit";
    } else {
      editInput.value = label.innerText
      button.innerText = "Save";
    }

    listItem.classList.toggle("editMode");
    store();
  };

  var deleteTask = function (el) {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
    store();
  };

  var taskCompleted = function (el) {
    var listItem = this.parentNode;
    listItem.classList.add('completed');
    listItem.children[0].setAttribute("checked", "");

    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
    store()
  };

  var taskIncomplete = function () {
    var listItem = this.parentNode;
    listItem.classList.remove("completed");
    listItem.children[0].removeAttribute('checked');

    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    store()
  };

  var bindTaskEvents = function (taskListItem, checkBoxEventHandler, cb) {
    var checkBox = taskListItem.querySelectorAll("input[type=checkbox]")[0];
    var editButton = taskListItem.querySelectorAll("button.edit")[0];
    var deleteButton = taskListItem.querySelectorAll("button.delete")[0];
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
  };

  addButton.addEventListener("click", addTask);

  function getValues() {
    var completedTask = window.localStorage.completedTask;
    var incompleteTask = window.localStorage.incompleteTask;

    if (!completedTask && !incompleteTask) {
      completedTasksHolder.innerHTML = ' <li class="completed"><input type="checkbox" checked><label>See the Doctor</label><input type="text"><button class="edit">Edit</button><button class="delete">Delete</button></li>';
      incompleteTasksHolder.innerHTML = ' <li><input type="checkbox"><label>Pay Bills</label><input type="text"><button class="edit">Edit</button><button class="delete">Delete</button></li>' +
        '<li><input type="checkbox"><label>Go Shopping</label><input type="text"><button class="edit">Edit</button><button class="delete">Delete</button></li>';
    }
    else {
      completedTasksHolder.innerHTML = completedTask;
      incompleteTasksHolder.innerHTML = incompleteTask;

    }
  }
  getValues();

  for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
  }

  for (var i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
  }

  function store() {
    window.localStorage.completedTask = completedTasksHolder.innerHTML;
    window.localStorage.incompleteTask = incompleteTasksHolder.innerHTML;

  }
})();