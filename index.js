const inputBox = document.getElementById("input-box");
const addIcon = document.getElementById("add-icon");
const listContainer = document.getElementById("list-container");
const searchItem = document.getElementById("search-item");
const inputDescription = document.getElementById("input-description");
const inputDeadline = document.getElementById("input-deadline");
const completeContainer = document.getElementById("complete-container");
const uncompleteContainer = document.getElementById("uncomplete-container");
// console.log(inputBox.value);
const todoList = [];
let completed = [];
let uncomplete = [];

const createHtmlElement = (tagName, classList, innerHTML) => {
  const element = document.createElement(tagName);
  classList.forEach((className) => {
    element.classList.add(className);
  });

  element.innerHTML = innerHTML;
  return element;
};

addIcon.addEventListener("click", (e) => {
  e.preventDefault();
  const value = inputBox.value;
  const descValue = inputDescription.value;

  // console.log(value);

  const todoObject = {
    id: todoList.length,
    task: value,
    description: descValue,
    complete: false,
  };
  todoList.push(todoObject);
  inputBox.value = "";
  inputDescription.value = "";
  console.log(todoList);

  // console.log(todoList);

  const todoElement = createHtmlElement(
    "li",
    [],
    `${todoObject.id} : ${todoObject.task}
    <br>description:${todoObject.description} `
  );
  console.log({ todoElement });

  const checkBoxElement = createHtmlElement("input", ["checkbox"], "");
  checkBoxElement.type = "checkbox";
  checkBoxElement.id = todoObject.id;
  todoElement.appendChild(checkBoxElement);

  listContainer.appendChild(todoElement);

  checkBoxElement.addEventListener("change", (e) => {
    let checkboxId = parseInt(e.target.id);
    console.log(checkboxId);
    console.log(todoList);
    todoList[checkboxId].complete = !todoList[checkboxId].complete;
    console.log("check complete", todoList[checkboxId].complete);

    //completed
    completed = todoList.filter((element) => {
      return element.complete == true;
    });
    console.log({ completed });

    completed.forEach((item) => {
      console.log({ item });
      const completedElement = createHtmlElement(
        "li",
        [],
        `${item.id} : ${item.task}
     <br>description:${item.description} `
      );
      completeContainer.appendChild(completedElement);
    });

    uncomplete = todoList.filter((element) => {
      return element.uncomplete === false;
    });
  });
});

//search
searchItem.addEventListener("input", () => {
  const searchValue = searchItem.value.toLowerCase();
  // console.log(searchValue);

  const filteredList = todoList.filter((item) => {
    return item.task.toLowerCase().includes(searchValue);
  });

  listContainer.innerHTML = "";

  const liElements = filteredList.map((array) => {
    // Create a new li (list item) element
    const li = document.createElement("li");

    // Set the inner HTML of the li element to display the task information
    li.innerHTML = `${array.id} : ${array.task} <br>description:${array.description} <span id="delete-icon">&#10006;</span>`;

    // Return the li element
    return li;
  });
  // console.log(liElements);

  liElements.forEach((item) => listContainer.appendChild(item));
});
