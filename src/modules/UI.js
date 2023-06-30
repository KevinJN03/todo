

import Project from "./projects";
import Todo from "./todo";
import { format, addDays, parseISO, parse, isBefore, isSameDay, nextMonday } from 'date-fns'

function todayBtnClick(){
    todayBtn.addEventListener("click", ()=> {
        inputContainer.style.display = "none"
        clear()
      contentTitle.textContent = "Today"
      inputContainerBtn.style.display = "none"
        const todayDate = new Date()
        const tomorrowDate = addDays(todayDate, 1)
        lists.forEach(project => {
            project.toDos.forEach(todo => {
                console.log(todo.date)
                if(todo.date == format(todayDate, 'MM/dd/yyyy') || todo.date == format(tomorrowDate, 'MM/dd/yyyy')){
                    let todoCreation =DomTodo(todo)
                    todoCreation.h1.textContent += ` (${project.name})`
                }
            })
        })
        optionSelection(1)

    })
}
function weekBtnClick(){
    weekBtn.addEventListener("click", ()=> {
        console.log("weekBtn is clicked")
        clear();
        inputContainer.style.display = "none"
        contentTitle.textContent = "This Week"
        const todayDate = new Date()
        const weekDate = nextMonday(new Date().setHours(0, 0, 0, 0))
        lists.forEach(project => {
            project.toDos.forEach(todo => {
                let todoDate = parse(todo.date,'MM/dd/yyyy', new Date())
               console.log("todoDate: ", (todoDate))
               console.log("todayDate: ", todayDate)
                console.log("isSame: ",isSameDay(todoDate,todayDate ))
                //console.log("parse date:", parse(todo.date,'MM/dd/yyyy', new Date()))
                if( isBefore(todoDate, weekDate) || isSameDay(todoDate,todayDate )){
                    let todoCreation =DomTodo(todo)
                    todoCreation.h1.textContent += ` (${project.name})`
                 }
            })
        })
       optionSelection(2)
    })
}

const LOCAL_STORAGE_LIST_KEY = "task.lists"
const LOCAL_STORAGE_SELECTED_LIST_KEY = "task.selectedListId"
const homeProject = new Project("home", 0, );
homeProject.toDos.push({"title": "home Test","date": "30-06-2023"})

let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [homeProject] ;
//

let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_KEY)
const todoAddBtn = document.querySelector("[data-todo-add-btn");
const todoInput = document.querySelector("data-todo-input");
const contentContainer = document.querySelector("[data-content-container]")
let contentTitle = document.querySelector("[data-content-title]")
const homeBtn = document.querySelector("[data-home-btn]")
const input = document.querySelector("[data-new-list-input]")
const projectAddBtn = document.querySelector("[data-new-list-add]");
const projectContainer = document.querySelector("#project-container")
const todayBtn = document.querySelector("[data-btn-today]");
const inputContainer = document.querySelector("[data-input-container]")
const projectBtn = document.querySelector("#project-btn")
const cancelProjectBtn = document.querySelector("#popup-cancel-btn")
const projectPopup = document.querySelector(".add-project-popup")
const inputContainerBtn = document.querySelector("#input-container-btn")
const cancelTodoBtn = document.querySelector("[data-todo-cancel-btn]")
const weekBtn = document.querySelector("[data-btn-week]");
const menuBtn = document.querySelectorAll(".menu-btn")


function popup(todo){
    let popupContainer = document.createElement("div");
    let popupContent = document.createElement("div");
    popupContent.classList.add("popup-content");
    popupContainer.classList.add("popup-container");
    let inputField = document.createElement("input")
    inputField.setAttribute("id", "input-popup")
    inputField.setAttribute("type", "text");
    inputField.setAttribute("value", todo.title)
    let dateInputField = document.createElement("input");
    dateInputField.setAttribute("id", "input-date-popup")
    dateInputField.setAttribute("type", "date");
    dateInputField.setAttribute("value", todo.date)
    let confirmButton = document.createElement("button");
    confirmButton.setAttribute("type", "button");
    confirmButton.classList.add("confirm-btn");
    confirmButton.textContent = "Confirm Edit"

    confirmButton.addEventListener("click", ()=> {
   todo.title = inputField.value;
   todo.date = format(parseISO(dateInputField.value), 'MM/dd/yyyy')
   //console.log("todo.date", todo.date);
   //console.log("dateInputField", format(parseISO(dateInputField.value), 'MM/dd/yyyy'))
    popupContainer.style.display = "none"
    renderTodo()
    })
    let cancelBtn = document.createElement("button");
    cancelBtn.classList.add("cancel-btn");
    cancelBtn.textContent = "Cancel";
    cancelBtn.addEventListener("click", ()=> {
        popupContainer.style.display = "none"
    })
    const itemsContainer = document.createElement("div")
    itemsContainer.classList.add("items-container");
    itemsContainer.append(inputField, dateInputField,confirmButton, cancelBtn)
    popupContent.append(itemsContainer)
    popupContainer.append(popupContent)
    contentContainer.append(popupContainer)
}
function clear(){
    let input = document.querySelector("[data-todo-input]")
    let input2 = document.querySelector("[data-new-list-input]")
    input2.value = ""
    input.value = ""
    contentTitle.textContent = ""
    contentContainer.innerHTML = ""
}
function DomTodo(todo){
    const card  = document.createElement("card")
    card.classList.add("card");
    const h1 = document.createElement("h1");
    h1.textContent = todo.title; 
    const btnContainer = document.createElement("div");
    btnContainer.classList.add("date-button-container")
    const h2 = document.createElement("h2");
    h2.textContent = todo.date; 
    let inputField = document.createElement("input")
    inputField.setAttribute("id", "input-popup")

    const inputBtn = document.createElement("button")
    inputBtn.classList.add("todo-item-input-btn");
    inputBtn.setAttribute("type", "button");
    inputBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`
    inputBtn.addEventListener("click", ()=> {
        popup(todo)

    })
    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("delete-btn");
    deleteBtn.setAttribute("type", "button");
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`
    
    deleteBtn.addEventListener("click", ()=> {
        console.log("delete btn clicky")
        const selectedProject = lists.find(obj => obj.id == selectedListId)
        //const selectedTodo = selectedProject.toDos.find(x => x == todo)
        selectedProject.toDos.splice(todo, 1)
        renderTodo()
    console.log(selectedProject)      
    }) 
    // deleteBtn.setAttribute("onclick", `${this}.deleteTodo()` )
    btnContainer.append(h2, inputBtn, deleteBtn)
    card.append(h1, btnContainer)
    contentContainer.append(card);
    return {card, h1}

}
    function createProject(project){
        lists.push(project);
        saveAndRender()
    }
    function DomProject(list){
        const project = document.createElement("div");
        project.dataset.listId = list.id;
        project.classList.add("project-list-item")
        project.setAttribute("id", list.id)
        project.innerHTML = `<h3 class= project-list-name>${list.name}</h3>`
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        deleteBtn.style.display = "none"
        deleteBtn.classList.add("delete-btn");
                deleteBtn.addEventListener("click", function(){
                    project.remove()
                    selectedListId = ""
                    const index = lists.indexOf(list)
                    lists.splice(index, 1)
                    saveAndRender()          
                })
                project.addEventListener("mouseover", ()=>{
                    deleteBtn.style.display = ""
                })
                project.addEventListener("mouseleave", ()=>{
                    deleteBtn.style.display = "none"
                })

                project.append(deleteBtn)
                projectContainer.append(project) 
                return {project, "id":list.id}
    }

        
function save(){
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_KEY, selectedListId)
}


function render(){
    clearProjectContainer()
   renderLists()
    if(selectedListId == ""){
        contentContainer.style.display = "none";
    } else {     
        contentContainer.style.display  = "";
        renderTodo()
    }
   // renderTodo()
}

function renderLists(){
    
    lists.forEach(element => {
      
       if(element != lists[0])
     {
           let list = DomProject(element)
    
       
        //console.log("element Id: ",element.id, "list Id: ",list.id, "selectedListId: ", selectedListId)
        console.log("list render:", )
        if(list.id == selectedListId) {
           clearSelection()
            list.project.classList.add("active-list")
    
            console.log("lists[selectedListId]", lists[selectedListId])
            contentTitle.textContent  = lists[selectedListId].name
        }        
        }
        
})
}

function renderTodo(){
    contentContainer.innerHTML = "";
    inputContainer.style.display ="none"
    inputContainerBtn.style.display = ""
    const selectedProject = lists.find(obj => obj.id == selectedListId)
    console.log("renderTodo", selectedProject)
    if (selectedProject == undefined) return
    selectedProject.toDos.forEach(element => {
        DomTodo(element)
    })
    save()
}

function createTodo(){
    todoAddBtn.addEventListener("click", () => {
        let input = document.querySelector("[data-todo-input]");
        const dateInput = document.querySelector("[data-todo-date-input]")
        let newDateInput = format(parseISO(dateInput.value), 'MM/dd/yyyy')

        let todo = new Todo(input.value,  newDateInput);
        lists[selectedListId].toDos.push(todo)
       inputContainerBtn.style.display = "";
       inputContainer.style.display = "none"
        clear()
      renderTodo()
    })
}


function saveAndRender(){
    save();
    render()
}


function clearProjectContainer() {
    projectContainer.innerHTML = ""
    return projectContainer
}


function getLastId(){
    console.log("list length from get last: ", lists.length)
   if(lists.length == 0) return 1
   else if(lists.length > 0){
   return  lists[lists.length -1].id + 1
   }
}

function homeBtnClick(){
    homeBtn.addEventListener("click", ()=>{
        
        contentTitle.textContent = "Home"
        inputContainerBtn.style.display = ""
        selectedListId = 0;
        const activeList = document.querySelector(".active-list");
       if(activeList) activeList.classList.remove("active-list")
       optionSelection(0)
        renderTodo()

    })
}

function optionSelection(num){
    
    clearSelection()
    for(let i=0; i< menuBtn.length; i++){
        if(i == num){
            menuBtn[i].classList.add("active-list");

        }else {
            menuBtn[i].classList.remove("active-list");
        }
    }
}

function clearSelection() {
    for(let i=0; i< menuBtn.length; i++){
        if(menuBtn[i].classList.contains("active-list")){
          menuBtn[i].classList.remove("active-list")  
        } 
       // return
        
    }

const projectItems =document.querySelectorAll(".project-list-item ")
    for(let i=0; i< projectItems.length; i++){
        if(projectItems[i].classList.contains("active-list")){
          projectItems[i].classList.remove("active-list")  
        }      
    }
}
export default function UI(){
    localStorage.clear()
   homeBtnClick()
   todayBtnClick()
   weekBtnClick()
console.log("UI");
//localStorage.clear()
console.log("lists", lists)
render()
projectAddBtn.addEventListener("click", function(){
    let input = document.querySelector("[data-new-list-input]")
    if(input.value == null || input.value === "") return
        const project = new Project(input.value, getLastId());
        selectedListId = project.id
        console.log("ProjectId: ", project.id)
        createProject(project)
        projectPopup.style.display = "none"
        projectBtn.style.display = ""
})

projectBtn.addEventListener("click", ()=> {
    projectBtn.style.display = "none"
    projectPopup.style.display = ""
})
cancelProjectBtn.addEventListener("click", ()=> {
    projectPopup.style.display = "none"
    projectBtn.style.display = ""
    clear()
})

inputContainerBtn.addEventListener("click", ()=> {
    inputContainer.style.display = ""
    inputContainerBtn.style.display = "none"
})

cancelTodoBtn.addEventListener("click", ()=> {
    inputContainer.style.display = "none";
    inputContainerBtn.style.display = ""
})
projectContainer.addEventListener("click", e => {
    if(e.target.tagName.toLowerCase() === "div"){
        console.log(("clicky"))
        inputContainer.style.display = ""
        selectedListId = e.target.dataset.listId
        console.log("selectedListId", selectedListId)
        saveAndRender()
    }
})


createTodo()

}

 