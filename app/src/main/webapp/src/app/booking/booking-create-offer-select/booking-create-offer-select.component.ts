import {Component, Input} from '@angular/core';
import {BookingService} from "../model/booking.service";
import {FormGroup} from "@angular/forms";
import {OfferInfo} from "../../offer/model/offer-api";

@Component({
  selector: 'app-booking-create-offer-select',
  templateUrl: './booking-create-offer-select.component.html',
  styleUrls: ['./booking-create-offer-select.component.scss']
})
export class BookingCreateOfferSelectComponent {


  @Input()
  offerFormGroup!: FormGroup;

  selected: OfferInfo[] = []

  constructor(public service: BookingService) {
  }

  toggleSelection(info: OfferInfo) {
    let index = this.selected.indexOf(info)
    if (index < 0) {
      this.selected.push(info)
    } else {
      this.selected.splice(index, 1)
    }
    let offerIds = this.selected.map(i => i.offer.id)
    this.offerFormGroup.controls['selected'].setValue(offerIds)
  }
}
