import { Component, Output, EventEmitter, signal, Input, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NewtaskData } from "../task/task.model";
import { TasksService } from "../tasks.service";

@Component({
  selector: 'app-new-task',
  standalone: true,
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
  imports: [FormsModule]
})
export class NewTaskComponent {
  @Input({required: true}) userId! : string;
  @Output() cancel = new EventEmitter<void>();
  enteredTitle = "";
  enteredSummary = "";
  enteredDueDate = "";

  private tasksService = inject(TasksService); //Another way of instanciating object in Angular

  //Two way binding using signals
  // enteredTitle = signal('');
  // enteredSummary = signal('');
  // enteredDueDate = signal('');

  onCancelClick() {
    this.cancel.emit();
  }

  onSubmitClick() {
    this.tasksService.addNewTask({
      title: this.enteredTitle,
      summary: this.enteredSummary,
      dueDate: this.enteredDueDate
    }, this.userId);

    this.cancel.emit();
  }
}