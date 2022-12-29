import {Component, OnInit} from '@angular/core';
import {Offer} from "../../offer/model/offer-api";
import {ActivatedRoute} from "@angular/router";
import {OfferAdminService} from "../model/offer-admin.service";

@Component({
  selector: 'app-admin-board-offer-daily',
  templateUrl: './admin-board-offer-daily.component.html',
  styleUrls: ['./admin-board-offer-daily.component.scss']
})
export class AdminBoardOfferDailyComponent implements OnInit{

  reloading: boolean = false
  displayedColumns: string[] = ['id', 'start', 'end', 'maxPersons', 'active', 'cmd'];
  data: Offer[] = [];

  constructor(private route: ActivatedRoute, private service: OfferAdminService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(value => {
        let date = value.get('id')
        if (date) {
          this.reloading = true
          this.service.findOfferByDate(date).subscribe(d => this.handleData(d))
        }
      }
    )
  }

  private handleData(d: Offer[]) {
    this.data = d
    this.reloading = false
  }

  updateOfferOngoing: Offer[] = [];

  getOfferMode(offer: Offer) {
    if (this.isUpdateOngoing(offer)) return "update"
    return "none"
  }

  isUpdateOngoing(offer: Offer): boolean {
    return this.updateOfferOngoing.find(o => o.id == offer.id) != null
  }

  toggleActive(offer: Offer) {
    if (this.isUpdateOngoing(offer)) return

    this.updateOfferOngoing.push(offer);
    this.service.setActive(offer.id, !offer.active).subscribe(data => this.updateOffer(data))
  }

  private updateOffer(offer: Offer) {
    const index = this.data.findIndex(u => u.id == offer.id)
    if (index >= 0) {
      this.data[index] = offer;
      this.data = [...this.data];
    }
    this.clearUpdateOffer(offer);
  }

  private clearUpdateOffer(offer: Offer) {
    const index = this.updateOfferOngoing.findIndex(u => u.id == offer.id)
    if (index > -1) {
      this.updateOfferOngoing.splice(index, 1);
    }
  }
}
