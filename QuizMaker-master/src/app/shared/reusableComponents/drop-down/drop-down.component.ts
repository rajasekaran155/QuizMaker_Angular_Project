import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropDown } from '../../interfaces/drop-down';


@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent {
   @Input() name!: string;
   @Input() options!: DropDown[];
   @Output() selectedValue = new EventEmitter();
   onClick( event : Event):void{
    this.selectedValue.emit((event.target as HTMLSelectElement).value);
   }
}
