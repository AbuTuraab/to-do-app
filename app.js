// ****** SELECT ITEMS **********

const submitBtn = document.querySelector(".submit-btn");
const edit = document.querySelector(".edit-btn")
const del = document.querySelector(".delete-btn")
const list = document.querySelector(".grocery-list")
const clearBtn = document.querySelector(".clear-btn")
const container=document.querySelector(".grocery-container")
const alert = document.querySelector(".alert")
const form = document.querySelector(".grocery-form")
const grocery = document.getElementById("grocery")
// edit option

let editElement;
let editFlag = false;
let editId = "";

// ****** EVENT LISTENERS **********

form.addEventListener("submit", addItem)


// ****** FUNCTIONS **********

clearBtn.addEventListener("click", clearItems)

window.addEventListener("DOMContentLoaded", setupItems)


function addItem(e){
e.preventDefault();
const value = grocery.value
const id = new Date().getTime().toString();
if(value && !editFlag){

    createListItem (id, value)
  displayAlert("item added to the list", "success")
    container.classList.add("show-container")

    addToLocalStorage(id, value)
    setBackToDefault();
}
else if(value && editFlag){
    editElement.innerHTML = value;
    displayAlert("vaue changed", "success");
    editLocalStorage(editId, value)
    setBackToDefault()
}
else{
    displayAlert("please enter a value", "danger");
}   
}

function displayAlert(text,action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`)
 
    setTimeout(function(){
        alert.textContent = " ";
        alert.classList.remove(`alert-${action}`)
    }, 1000)

}

function clearItems(){
    const items = document.querySelectorAll(".grocry-item")

    if(items.length > 0){
        items.forEach(function(item){
            list.removeChild(item)
        })
    } 
    container.classList.remove("show-container")
    displayAlert("empty list", "danger")
    setBackToDefault()


}

function deleteItem(e){
const element = e.currentTarget.parentElement.parentElement;
const id = element.dataset.id;


list.removeChild(element);
if (list.children.length ===0){
    container.classList.remove("show-container");
}
displayAlert ("item removed", "danger")
setBackToDefault();

removeFromLocalStorage(id)
}

function editItem(e){

    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editId = element.dataset.id
    submitBtn.textContent = "edit"
}

    function setBackToDefault(){
        grocery.value = "";
        editFlag = false;
        editId = ""
        submitBtn.textContent = "submit";

    }

// ****** LOCAL STORAGE **********
    function addToLocalStorage(id, value){
    const grocery = {id, value} 
    let items = getLocalStorage()
    
    items.push(grocery)
    localStorage.setItem("list", JSON.stringify(items))
    
    }

    function removeFromLocalStorage(id){
let items = getLocalStorage();

items = items.filter(function(item){
    if(item, id !==id){
        return item;
    }
})
    }

    function editLocalStorage(id, value){
        let items = getLocalStorage();
        items = items.map(function(item){
            if (item.id ===id){
                item.value = value;
            }
            return item;
        }) 
        localStorage.setItem("list", JSON.stringify(items));
    }

    function getLocalStorage(){
            return localStorage.getItem("list") 
            ? JSON.parse(localStorage.getItem("list"))
            : [];
    }

        localStorage.setItem("orange", JSON.stringify(["item", "item2"]))

        const oranges = JSON.parse(localStorage.getItem("orange"))

        localStorage.removeItem("orange")
// ****** SETUP ITEMS **********

function setupItems() {
    let items = getLocalStorage();
    if(items.length > 0){
            item.forEach(function(item){
                createListItem(item.id,item,value)
            })
            container.classList.add("show-container")
    }
}

function createListItem(id, value){
    const element = document.createElement("article")
    element.classList.add("grocery-item")
    const attr=document.createAttribute("data-id")
     attr.value = id;
     element.setAttributeNode(attr);
     element.innerHTML = `<p class="title">${value}</p>
     <div class="btn-container">
      <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
      </button>
      <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
      </button>
     </div>`;
     const deleteBtn = element.querySelector(".delete-btn")
     const editBtn = element.querySelector(".delete-btn")
     deleteBtn.addEventListener("click", deleteItem)
     editBtn.addEventListener("click", editItem)
 
     list.appendChild(element);
     
}
