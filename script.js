
class Todo 
{
  //This class describes a basic template of a todo
  constructor(id,todo_text,checkbox)
  {
    this.id = id
    this.todo_text = todo_text
    this.checkbox = checkbox
  }
}

let todoListArray = []
let todoCount = 0
let itemsUnchecked = 0

const todoList = document.querySelector("#todo-list")
const createButton = document.querySelector("#create-todo")

//initiate items unchecked
todoCountElement = document.querySelector("#item-count").textContent = todoCount

//assign an event listener to the create todo button

  createButton.addEventListener("click", addTodo)

function addTodo() {
  
  //grabs the todo input text

  const todo_text = document.querySelector("#todo-text").value

  if(todo_text != '')
  {
      //default the checkbox to uncheched

    const checkbox = false

    const id = generate_id()

    //create a new object of the todos 

    const newTodo = new Todo(id,todo_text,checkbox)

    //add the new todo object to the todo list array

    todoListArray.push(newTodo)

    //update the todos count 
    addTodoCount()

    //recount the number of items unchecked
    refreshItemsUnchecked()

    //diplay the new todo on the screen
    renderTodo(newTodo)

    //clear the input field when a new todo has been added
    clearInput();

    
  }
  else
  {
    alert("You can't submit a blank form")
  }


  

}

function generate_id()
{
  //This function checks the length of the todos array to come up with an id

  let id = 0
  
  if(todoListArray.length < 1)
  {
    id = 1
  }
  else
  {
    //increment the previous todo id by one
    id = todoListArray.length + 1 
  }

  return id

}

function addTodoCount()
{
  todoCount++
  todoCountElement = document.querySelector("#item-count").textContent = todoCount

}

function SubtractTodoCount()
{
  todoCount--
  todoCountElement = document.querySelector("#item-count").textContent = todoCount

}

function countItemsUnchecked()
{
  //This function loops over elements in the todo list array checking the values of the checkbox

let count = 0
  todoListArray.forEach(element => {
    if(element.checkbox == false)
    {
      count++
    }
  });

  return count
}

function refreshItemsUnchecked()
{
  let count = countItemsUnchecked()

  //update the element on the page

  document.querySelector("#unchecked-count").textContent = count;
}

function renderTodo(newTodo)
{
  //This function diplays the todo list array in a list format

    

      //create a new list item element
      const newLi = document.createElement("li");

      //create checkbox element 
      const checkbox = document.createElement("input")

      checkbox.setAttribute("type","checkbox")
      checkbox.setAttribute("id",newTodo.id)
      checkbox.classList.add("todo-checkbox")

      checkbox.addEventListener("click",function(){

        //update the todo item

        updateToDoCheckBox(newTodo)

      
      })

      //create delete todo button

      const deleteButton = document.createElement("Button")

      deleteButton.setAttribute("id",newTodo.id)
      deleteButton.innerText = "Remove"
      deleteButton.classList.add("todo-delete","button")

      //add an on click event listener to the button

      deleteButton.addEventListener("click",function()
      {
        //check if the checkbox of the todo was set to true to execute delete

        if(newTodo.checkbox == true)
        {
          deleteTodo(newTodo.id)

          //delete the list item from the screen
          
          //target the "ul" element wrapping around the list of todos
          let parentElement = this.parentNode.parentNode
  
          //remove the list node from the list of unordered list items
          parentElement.removeChild(this.parentNode)

          SubtractTodoCount()

          
  
        }
        else
        {
          alert("The Todo Item you selected is protected against deletion, check the checkbox to remove protection to proceed!!!!")
        }

       
          
      })
      
      
      

      newLi.classList.add("todo-container");
      const todoText = document.createTextNode(newTodo.todo_text)

      //append the text to the list item
      newLi.appendChild(todoText)

      //append the checkbox to the list item

      newLi.appendChild(checkbox);

      //append delete button to the list item

      newLi.appendChild(deleteButton)


      todoList.appendChild(newLi)

    
}

function deleteTodo(id)
{



  //This method handles click event attached to the delete button 
  let indexOfId = -1

  //loop throught the todo list array searching for the index of a todo having the id requested

  for(let i = 0; i < todoListArray.length; i++)
  {
    if(todoListArray[i].id == id)
    {

      indexOfId = i
    }
  }

  //remove the element of the index found in the todo list array

  todoListArray.splice(indexOfId,1)


}

function updateToDoCheckBox(newTodo)
{
    //check the current state of the todo item's check box and change it to the opposite
    if(newTodo.checkbox == false)
    {
      newTodo.checkbox = true

    }
    else
    {
      newTodo.checkbox = false
    }
         
    //update the counnt of unchecked todos on the screen
    refreshItemsUnchecked()
}

function clearInput()
{
  let todo_input = document.querySelector("#todo-text")

  todo_input.value = ""
}