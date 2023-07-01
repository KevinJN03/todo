 export default class Todo {
    constructor(title, date){
        this.title = title;
        this.date = date;
        this.isComplete = false
    }

    updateTodoTitle(str){
        Todo.title = str
    }
 }