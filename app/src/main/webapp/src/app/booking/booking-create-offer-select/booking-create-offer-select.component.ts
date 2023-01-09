import {Component, Input} from '@angular/core';
import {BookingService} from "../model/booking.service";
import {FormGroup} from "@angular/forms";
import {Offer} from "../../admin/offer-admin/model/offer-admin-api";

@Component({
  selector: 'app-booking-create-offer-select',
  templateUrl: './booking-create-offer-select.component.html',
  styleUrls: ['./booking-create-offer-select.component.scss']
})
export class BookingCreateOfferSelectComponent {


  @Input()
  offerFormGroup!: FormGroup;

  selected: Offer[] = []

  constructor(public service: BookingService) {
  }

  ngOnInit() {
    this.service.entries.forEach(e => this.toggleSelection(e.offer))
  }

  toggleSelection(offer: Offer | undefined) {
    if (!offer) return
    let index = this.selected.indexOf(offer)
    if (index < 0) {
      this.selected.push(offer)
    } else {
      this.selected.splice(index, 1)
    }
    let offerIds = this.selected.map(i => i.id)
    this.offerFormGroup.controls['selected'].setValue(offerIds)
  }


}
