import {Component} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {StepperSelectionEvent} from "@angular/cdk/stepper";
import {BookingService} from "../model/booking.service";

@Component({
  selector: 'app-booking-create',
  templateUrl: './booking-create.component.html',
  styleUrls: ['./booking-create.component.scss']
})
export class BookingCreateComponent {


  visitorFormGroup = this.fb.group({
    title: ['', Validators.required],
    size: ['', Validators.required],
    minAge: ['', Validators.required],
    maxAge: ['', Validators.required],
    contact: ['', Validators.required],
    street: ['', Validators.required],
    zip: ['', Validators.required],
    city: ['', Validators.required],
    phone: ['', Validators.required],
    mail: ['', Validators.required],
  });


  offerFormGroup = this.fb.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private service: BookingService) {
    this.visitorFormGroup.valueChanges.subscribe(s => console.log("status changed" + JSON.stringify(this.visitorFormGroup.value)))
  }

  handleStepperSelectionChanged(event: StepperSelectionEvent) {

  }
}
