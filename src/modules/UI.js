
import Project from "./projects";
import Todo from "./todo";
const LOCAL_STORAGE_LIST_KEY = "task.lists"
const LOCAL_STORAGE_SELECTED_LIST_KEY = "task.selectedListId"
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [] ;
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_KEY)
const todoAddBtn = document.querySelector("[data-todo-add-btn");
const todoInput = document.querySelector("data-todo-input");
const contentContainer = document.querySelector("[data-content-container]")
const contentTitle = document.querySelector("[data-content-title]")

const input = document.querySelector("[data-new-list-input]")
const projectAddBtn = document.querySelector("[data-new-list-add]");
const projectContainer = document.querySelector("#project-container")


// when a todo is created, it is also generate on the page as well
function DomTodo(todo){
    const card  = document.createElement("card")
    card.classList.add("card");
    const h1 = document.createElement("h1");
    h1.textContent = todo.title; 
    const h2 = document.createElement("h2");
    h2.textContent = todo.date; 
    const inputBtn = document.createElement("button");
    inputBtn.classList.add("todo-input-btn");
    inputBtn.setAttribute("type", "button");
    inputBtn.textContent = "Input";

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete"
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
    function DomProject(list){
        
        const project = document.createElement("div");
        project.dataset.listId = list.id;
        project.classList.add("project-list-item")
        project.setAttribute("id", list.id)
        project.innerHTML = `<h3 class= project-list-name>${list.name}</h3>`
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "delete";
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
        
        let list = DomProject(element)
        //console.log("element Id: ",element.id, "selectedListId Id: ",selectedListId)
        if(list.id === selectedListId) {
            console.log("list Id: ",list.id, "selectedListId Id: ",selectedListId)
            list.classList.add("active-list")
        }
         
})
}

function renderTodo(){
    contentContainer.innerHTML = ""
    const selectedProject = lists.find(obj => obj.id == selectedListId)
    console.log(selectedProject.toDos)
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
        let todo = new Todo(input.value,  "27-06-2023");
        //add todo to project list
        //lists[selectedListId].toDos.push(todo)
        //let selectedProject = lists.find(obj => obj.id == selectedListId)
        //selectedProject.toDos.push(todo)
        lists[selectedListId].toDos.push(todo)
        console.log("selected Id", selectedListId)
        console.log("selected list", lists[selectedListId])
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

function createProject(project){
    lists.push(project);
    saveAndRender()
    

}
function getLastId(){
    let lastId = null
    //if(lists.length == 0) return
    if(lists.length != 0) lastId = lists[lists.length -1].id;
    console.log("lastId:", lastId)
    if (lastId == null || lastId == "undefined") return 0
    console.log("lastId:", lastId)
    return lastId + 1
}

export default function UI(){
console.log("UI");
render()
projectAddBtn.addEventListener("click", function(){
    if(input.value == null || input.value === "") return
        const project = new Project(input.value, getLastId());

        //project.id = 
        //console.log("lastId: ", project.id)
        createProject(project)
        
        console.log(project)
    
})


projectContainer.addEventListener("click", e => {
    if(e.target.tagName.toLowerCase() === "div"){
        console.log(("clicky"))
        selectedListId = e.target.dataset.listId
        console.log("selectedListId", selectedListId)
        saveAndRender()
    }
})


createTodo()

}

 