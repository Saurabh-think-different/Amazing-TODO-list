
//Selectors
const todoInput  = document.querySelector(".todo-input");
const todoButton  = document.querySelector(".todo-button");
const todoList  = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//localStorage Arrays
let prevTodos = JSON.parse(localStorage.getItem('prevTodos')) || [];
let markedTodos = JSON.parse(localStorage.getItem('markedTodos')) || []; // 0 == Not-completed, 1 == Completed

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
        newTodo.innerText = todoInput.value.trim();
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        //Saving to localStorage
        saveLocalStorage(todoInput.value.trim());
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
    const itemParent  = item.parentNode;

    const index = prevTodos.indexOf(itemParent.children[0].innerText);
    //Delete Todo
    if(item.classList[0] === 'delete-btn'){
       itemParent.classList.add('fall');
       removeLocalTodo(itemParent);
       itemParent.addEventListener('transitionend', ()=>{
            itemParent.remove();
       });
    }

    //Mark Done
    if(item.classList[0] === 'mark-btn'){
        itemParent.classList.toggle('completed');
        //Updating value in markedTodo 
        if(itemParent.classList.contains('completed')){
            markedTodos[index] = 1;
        }
        else{
            markedTodos[index] = 0;
        }
        console.log(markedTodos);
        localStorage.setItem('markedTodos', JSON.stringify(markedTodos));
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
    markedTodos.push(0);
    prevTodos.push(todo);
    localStorage.setItem('prevTodos', JSON.stringify(prevTodos));
    localStorage.setItem('markedTodos', JSON.stringify(markedTodos));
}

function getPrevTodos(){
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
        
        if(markedTodos[prevTodos.indexOf(todo)] == 1){
            todoDiv.classList.add('completed');
        }
        else{
            todoDiv.classList.remove('completed');
        }
    });
}

function removeLocalTodo(todo){
    const removeIndex = todo.children[0].innerText;
    const prevTodoIndex = prevTodos.indexOf(removeIndex);
    //prevTodos
    prevTodos.splice(prevTodoIndex, 1);
    localStorage.setItem('prevTodos', JSON.stringify(prevTodos));
    //markedTodos
    console.log(markedTodos);
    markedTodos.splice(prevTodoIndex, 1);
    console.log(markedTodos);
    localStorage.setItem('markedTodos', JSON.stringify(markedTodos));
}
