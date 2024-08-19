import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoModel } from './models/todo.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DockerToDoTestClient';

  todoModel: TodoModel = new TodoModel();
  todos: TodoModel[] = [];
  allTodos: TodoModel[] = [];

  constructor(
    private http: HttpClient
  ){
    this.getAll();
  }

  getAll(){
    this.http.get("https://docker-test.erendelibas.xyz/api/Todos/GetAll")
    .subscribe({
      next: (res:any) => {
        this.todoModel = res;
        this.todos = res;
        this.allTodos = res;
        console.log(this.todoModel);
      }
    });
  }

  create(){
    this.http.post("https://docker-test.erendelibas.xyz/api/Todos/Create", {note: this.todoModel.note})
    .subscribe({
      next: (res:any) => {
        this.getAll();
      }
    });
  }

  update(id:any){
    this.todoModel.id = id;
    this.http.post("https://docker-test.erendelibas.xyz/api/Todos/Update", this.todoModel)
    .subscribe({
      next: (res:any) => {
        this.getAll();
      }
    });
  }

  complateTodo(todo: TodoModel){
    todo.complated = !todo.complated;
    
    this.http.post("https://docker-test.erendelibas.xyz/api/Todos/Update", todo)
      .subscribe({
        next: (res:any) => {
          this.getAll();
        }
      });
  }

  deleteById(id:any){
    this.http.get(`https://docker-test.erendelibas.xyz/api/Todos/DeleteById?Id=${id}`)
    .subscribe({
      next: (res:any) => {
        this.getAll();
      }
    });
  }

  deleteAll(){
    for (let index = 0; index < this.todos.length; index++) {
      const id = this.todos[index].id;
      this.deleteById(id);
    }
  }

  complateList() {
    this.todos = this.allTodos.filter(todo => todo.complated);
  }
  
  pendingList() {
    this.todos = this.allTodos.filter(todo => !todo.complated);
  }

  showAll() {
    this.todos = [...this.allTodos]; // Orijinal listeyi geri yükleyin
  }
}
