

export default class Project {

   
    constructor(name, id){
       
        this.name = name,
        this.id = id 
        this.toDos = []
    }

    appendToDo(todo) {
        this.toDos.push(todo)
    }

    loadTodo(){
        return this.Project
    }


    removeProject(){
        console.log("project",this.Project)
        delete this.Project
        
    }

    
}