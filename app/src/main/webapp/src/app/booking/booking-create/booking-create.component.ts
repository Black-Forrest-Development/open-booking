import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {StepperSelectionEvent} from "@angular/cdk/stepper";
import {BookingService} from "../model/booking.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-booking-create',
  templateUrl: './booking-create.component.html',
  styleUrls: ['./booking-create.component.scss']
})
export class BookingCreateComponent implements OnInit {


  visitorFormGroup = this.fb.group({
    title: ['Title', Validators.required],
    size: ['20', Validators.required],
    minAge: ['1', Validators.required],
    maxAge: ['99', Validators.required],
    contact: ['Contact', Validators.required],
    street: ['Street', Validators.required],
    zip: ['Zip', Validators.required],
    city: ['City', Validators.required],
    phone: ['Phone', Validators.required],
    mail: ['Mail', Validators.required],
  });


  offerFormGroup = this.fb.group({
    secondCtrl: ['', Validators.required],
  });

  private dates: string[] = []

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private service: BookingService) {

  }

  ngOnInit() {
    let snapshot = this.route.snapshot
    let primary = snapshot.paramMap.get("primary")
    if (primary) this.dates.push(primary)
    let selected = snapshot.paramMap.get("selected")
    if (selected) {
      let data = selected.split(",").filter(s => s != primary)
      this.dates.push(...data)
    }
  }

  handleStepperSelectionChanged(event: StepperSelectionEvent) {
    if (event.selectedIndex != 1) return
    let size = this.visitorFormGroup.get('size')?.value
    if (size == null) return
    this.service.loadOfferInfo(+size, this.dates)
  }
}
