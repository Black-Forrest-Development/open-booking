import {Component, OnInit} from '@angular/core';
import {DayInfoService} from "../model/day-info.service";
import {ActivatedRoute} from "@angular/router";
import {DayInfo} from "../model/day-info-api";
import {OfferService} from "../../offer/model/offer.service";
import {OfferInfo, OfferInfoSelectResultEntry} from "../../offer/model/offer-api";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-day-info-details',
  templateUrl: './day-info-details.component.html',
  styleUrls: ['./day-info-details.component.scss']
})
export class DayInfoDetailsComponent implements OnInit {

  dayReloading: boolean = false
  offerReloading: boolean = false
  data: DayInfo | undefined

  infos: OfferInfo[] = []

  displayedColumns: string[] = ['start', 'end', 'total', 'available', 'booked'];
  dataSource = new MatTableDataSource();

  constructor(private route: ActivatedRoute,
              private service: DayInfoService,
              private offerService: OfferService,
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(value => {
        let date = value.get('id')
        if (date) {
          this.dayReloading = true
          this.service.loadDayInfo(date).subscribe(d => this.handleDayInfo(d))
          this.offerReloading = true
          this.offerService.getOfferInfoDate(date).subscribe(d => this.handleOfferInfo(d))
        }
      }
    )
  }


  private handleDayInfo(d: DayInfo) {
    this.data = d
    this.dayReloading = false
  }

  private handleOfferInfo(d: OfferInfoSelectResultEntry) {
    this.infos = d.infos
    this.dataSource.data = d.infos
    this.offerReloading = false
  }

}
