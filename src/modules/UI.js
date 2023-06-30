

import Project from "./projects";
import Todo from "./todo";
import { compareAsc, format, addDays, addWeeks, parseISO, parse, isBefore, isAfter, isSameDay, nextMonday } from 'date-fns'

function todayBtnClick(){
    todayBtn.addEventListener("click", ()=> {
        console.log("today btn clicked")
        clear()
      contentTitle.textContent = "Today"
      inputContainer.style.display = "none"
        const todayDate = new Date()
        const tomorrowDate = addDays(todayDate, 1)
        lists.forEach(project => {

            project.toDos.forEach(todo => {
                console.log(todo.date)
                if(todo.date == format(todayDate, 'MM/dd/yyyy') || todo.date == format(tomorrowDate, 'MM/dd/yyyy')){
                    DomTodo(todo)
                }
            })
            //console.log("project: ", project.toDos)
        })
        console.log("todayDate: ", todayDate)
        console.log("tomorrowDate: ", tomorrowDate)

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
                     DomTodo(todo)
                 }
            })
        })
        console.log("todayDate: ", todayDate)
        console.log("tomorrowDate: ", weekDate)
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

const weekBtn = document.querySelector("[data-btn-week]");


function popup(todo){
    let popupContainer = document.createElement("div");
    popupContainer.classList.add("popup-container");
    let inputField = document.createElement("input")
    inputField.setAttribute("id", "input-popup")
    inputField.setAttribute("type", "text");
    inputField.setAttribute("value", todo.title)
    let confirmButton = document.createElement("button");
    confirmButton.setAttribute("type", "button");
    confirmButton.classList.add("confirm-btn");
    confirmButton.textContent = "Confirm Edit"
    confirmButton.addEventListener("click", ()=> {
       // todo.updateTodoTitle(inputField.value)
   todo.title = inputField.value;
    popupContainer.style.display = "none"
    renderTodo()
    })
    popupContainer.append(inputField,confirmButton)
    contentContainer.append(popupContainer)
}
function clear(){
    let input = document.querySelector("[data-todo-input]")
    input.value = ""
    contentTitle.textContent = ""
    contentContainer.innerHTML = ""
}
function DomTodo(todo){
    const card  = document.createElement("card")
    card.classList.add("card");
    const h1 = document.createElement("h1");
    h1.textContent = todo.title; 
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
    card.append(h1, h2, inputBtn, deleteBtn)
    contentContainer.append(card);

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
        deleteBtn.classList.add("delete-btn");
                deleteBtn.addEventListener("click", function(){
                    project.remove()
                    selectedListId = ""
                    const index = lists.indexOf(list)
                    lists.splice(index, 1)
                    saveAndRender()          
                })
                project.append(deleteBtn)
                projectContainer.append(project) 
                return project
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
    
       
        console.log("element Id: ",element.id, "list Id: ",list.id, "selectedListId: ", selectedListId)
        if(list.id === selectedListId) {
  
            list.classList.add("active-list")
    
            console.log("lists[selectedListId]", lists[selectedListId])
            contentTitle.textContent  = lists[selectedListId].name
        }        
        }
        
})
}

function renderTodo(){
    contentContainer.innerHTML = ""
    const selectedProject = lists.find(obj => obj.id == selectedListId)
    console.log("renderTodo", selectedProject)
    if (selectedProject == undefined) return
    selectedProject.toDos.forEach(element => {
        DomTodo(element)
    })
    save()
}

function createTodo(){
    console.log("selectedListId", selectedListId)
    todoAddBtn.addEventListener("click", () => {
        console.log("selectedListId for project", selectedListId)
        let input = document.querySelector("[data-todo-input]");
        const dateInput = document.querySelector("[data-todo-date-input]")
        let newDateInput = format(parseISO(dateInput.value), 'MM/dd/yyyy')
        //console.log("date Value:", )
        let todo = new Todo(input.value,  newDateInput);
        lists[selectedListId].toDos.push(todo)
        //console.log("selected Id", selectedListId)
        //console.log("selected list", lists[selectedListId])
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

function homeBtnClick(home){
    home.addEventListener("click", ()=>{
        console.log("home button clicked")
        contentTitle.textContent = "Home"
        inputContainer.style.display = ""
        selectedListId = 0;
        const activeList = document.querySelector(".active-list");
       if(activeList) activeList.classList.remove("active-list")
        renderTodo()
        //createTodo()
        
        console.log(lists[0])
    })
}
export default function UI(){
    localStorage.clear()
   homeBtnClick(homeBtn)
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
        
        //console.log(project)
    
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

 