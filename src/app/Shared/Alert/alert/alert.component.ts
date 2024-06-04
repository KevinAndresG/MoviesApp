import {
  Component,
  input,
  signal,
  OnChanges,
  SimpleChanges,
  output,
} from '@angular/core';
import {
  AlertPositionX,
  AlertPositionY,
  AlertType,
} from '../../../Models/alert.model';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent implements OnChanges {
  showAlert = input<boolean>();
  changeShowAlert = output<boolean>();
  typeColors = {
    Success: 'green-500',
    Error: 'red-500',
    Warning: 'yellow-500',
    Info: 'blue-500',
  };
  type = input.required<AlertType>();
  controled = input.required<boolean>();
  title = input<string>('');
  description = input<string>('');
  acceptBtn = input<boolean>(false);
  cancelBtn = input<boolean>(false);
  delay = input<number>(1000);
  x = input<AlertPositionX>(AlertPositionX.Right);
  y = input<AlertPositionY>(AlertPositionY.Top);
  accept() {}
  cancel() {}
  classesType = signal<any>({});
  classesType2 = signal<any>('');
  ngOnChanges(changes: SimpleChanges) {
    console.log(this.type());
    if (changes['type']) {
      this.classesType2.set(
        `alert bg-${this.typeColors[this.type()]} ${
          this.controled() ? '!min-h-[130px]' : ''
        } ${this.y().toLowerCase() === 'top' ? 'top-3' : ''} ${
          this.y().toLowerCase() === 'middle' ? 'top-[50%]' : ''
        } ${this.y().toLowerCase() === 'bottom' ? 'bottom-3' : ''} ${
          this.x().toLowerCase() === 'left' ? 'left-3' : ''
        } ${this.x().toLowerCase() === 'right' ? 'right-3' : ''} ${
          this.x().toLowerCase() === 'center' ? 'left-[50%]' : ''
        } ${this.x().toLowerCase() === 'center' ? 'translate-x-[-50%]' : ''}`
      );
      setTimeout(() => {
        this.changeShowAlert.emit(false);
      }, this.delay());
    }
  }
}
