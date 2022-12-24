import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-booking-create-visitor-group',
  templateUrl: './booking-create-visitor-group.component.html',
  styleUrls: ['./booking-create-visitor-group.component.scss']
})
export class BookingCreateVisitorGroupComponent {

  @Input()
  visitorFormGroup!: FormGroup;

}
