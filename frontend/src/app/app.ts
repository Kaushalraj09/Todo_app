import { Component, signal, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


interface Task {
  id: number;
  task: string;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  task = "";
  taskList: Task[] = []

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8000/task_api/tasks/';

  ngOnInit() {
    this.fetchTasks();

  }
  fetchTasks() {
    this.http.get<Task[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.taskList = data;
      },
      error: (error) => console.error('Error fetching tasks:', error)
    });
  }

  addTask() {
    if (this.task.trim() === '') {
      return;
    }

    const taskData = {
      task: this.task
    };

    this.http.post(this.apiUrl, taskData).subscribe((response: any) => {
      this.taskList.push(response);
      this.task = '';
      console.log("Task added successfully");
    },
      (error) => {
        console.log("Error while adding task", error);
      });

  }
  deleteTask(taskId: number) {
    this.http.delete(this.apiUrl + taskId + "/").subscribe(() => {
      this.taskList = this.taskList.filter(task => task.id !== taskId);
      console.log("Task Deleted successfully");

    }, (error) => {
      console.log("Error while deleting task", error);
    });

  }
}
