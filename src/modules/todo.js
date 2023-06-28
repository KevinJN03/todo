 export default class Todo {
    constructor(title, date){
        this.title = title;
        this.date = date;
    }

    updateTodo(str){
        this.title = str
    }
 }