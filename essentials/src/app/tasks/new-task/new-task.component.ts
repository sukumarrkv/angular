import { Component, Output, EventEmitter, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NewtaskData } from "../task/task.model";

@Component({
  selector: 'app-new-task',
  standalone: true,
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
  imports: [FormsModule]
})
export class NewTaskComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() add = new EventEmitter<NewtaskData>();
  enteredTitle = "";
  enteredSummary = "";
  enteredDueDate = "";

  //Two way binding using signals
  // enteredTitle = signal('');
  // enteredSummary = signal('');
  // enteredDueDate = signal('');

  onCancelClick() {
    this.cancel.emit();
  }

  onSubmitClick() {
    this.add.emit({
      title: this.enteredTitle,
      summary: this.enteredSummary,
      dueDate: this.enteredDueDate
    });
  }
}