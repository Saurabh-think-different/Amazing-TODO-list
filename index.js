
//Selectors
const todoInput  = document.querySelector(".todo-input");
const todoButton  = document.querySelector(".todo-button");
const todoList  = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


//Event Listeners
document.addEventListener('DOMContentLoaded', getPrevTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteAndCheck);
filterOption.addEventListener('click', filterTodo);

//Functions
function addTodo(event){
    event.preventDefault();
    if(todoInput.value){
        //Todo DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        
        //Create LI
        const newTodo = document.createElement("li");
        newTodo.innerText = todoInput.value;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        //Saving to localStorage
        saveLocalStorage(todoInput.value);
        
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

        //Reset TODO Input
        todoInput.value = "";
    }
} 

function deleteAndCheck(e){
    const item = e.target;

    //Delete Todo
    if(item.classList[0] === 'delete-btn'){
       const itemParent  = item.parentNode;
       itemParent.classList.add('fall');
       removeLocalTodo(itemParent);
       itemParent.addEventListener('transitionend', ()=>{
            itemParent.remove();
       });
    }

    //Mark Done
    if(item.classList[0] === 'mark-btn'){
        const itemParent = item.parentNode;
        itemParent.classList.toggle('completed');
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalStorage(todo){
    let prevTodos = JSON.parse(localStorage.getItem('prevTodos')) || [];
    prevTodos.push(todo);
    localStorage.setItem('prevTodos', JSON.stringify(prevTodos));
}

function getPrevTodos(){
    let prevTodos = JSON.parse(localStorage.getItem('prevTodos')) || [];
    prevTodos.forEach( (todo) => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        
        //Create LI
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
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
    });
}

function removeLocalTodo(todo){
    let todos = JSON.parse(localStorage.getItem('prevTodos'));
    const removeIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(removeIndex), 1);
    localStorage.setItem('prevTodos', JSON.stringify(todos));
}