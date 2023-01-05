import {Component} from '@angular/core';
import {OfferAdminService} from "../../offer-admin/model/offer-admin.service";
import {ActivatedRoute} from "@angular/router";
import {Offer} from "../../offer-admin/model/offer-admin-api";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Location} from "@angular/common";

@Component({
  selector: 'app-booking-admin-day-board',
  templateUrl: './booking-admin-day-board.component.html',
  styleUrls: ['./booking-admin-day-board.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BookingAdminDayBoardComponent {
  reloading: boolean = false
  offer: Offer[] = []

  date: string = ""

  constructor(
    private route: ActivatedRoute,
    private service: OfferAdminService,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(value => {
        let date = value.get('date')
        if (date) {
          this.date = date
          this.reloading = true
          this.service.findOfferByDate(date).subscribe(d => this.handleOffer(d))
        }
      }
    )
  }

  private handleOffer(d: Offer[]) {
    this.offer = d
    this.reloading = false
  }

  back() {
    this.location.back()
  }
}
