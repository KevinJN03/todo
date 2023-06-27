

export default class Project {
    constructor(name, id){
       
        this.name = name,
        this.id = id
        this.toDos = []
    }

    static incrementId(){
        
        if (!this.latestId) this.latestId = 0
        if(this.latestId = 0) this.latestId+= 1
        return this.latestId
    }
    appendToDo(todo) {
        this.toDos.push(todo)
    }

    

    
}