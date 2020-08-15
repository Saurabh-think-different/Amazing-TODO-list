
//Selectors
const todoInput  = document.querySelector(".todo-input");
const todoButton  = document.querySelector(".todo-button");
const todoList  = document.querySelector(".todo-list");

//Event Listeners
todoButton.addEventListener("click", addTodo);

//Functions
function addTodo(event){
    event.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = "hey";
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Creating MARK Button
    const markButton = document.createElement("button");
    markButton.innerHTML = '<i class="fas fa-check"></i>'
    markButton.classList.add('mark-btn');
    todoDiv.appendChild(markButton);
    //Creating DELETE button 
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);
    //Append to ul list 
    todoList.appendChild(todoDiv);
}
