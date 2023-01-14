import {Component} from '@angular/core';
import {DayInfo, defaultDayInfo} from "../../day-info/model/day-info-api";
import {ActivatedRoute} from "@angular/router";
import {DayInfoService} from "../../day-info/model/day-info.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-day-info-details',
  templateUrl: './day-info-details.component.html',
  styleUrls: ['./day-info-details.component.scss']
})
export class DayInfoDetailsComponent {

  dayReloading: boolean = false

  data: DayInfo = defaultDayInfo


  constructor(private route: ActivatedRoute,
              private service: DayInfoService,
              private location: Location
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(value => {
        let date = value.get('date')
        if (date) {
          this.dayReloading = true
          this.service.loadDayInfo(date).subscribe(d => this.handleDayInfo(d))
        }
      }
    )
  }

  private handleDayInfo(d: DayInfo) {
    this.data = d
    this.dayReloading = false
  }

  back() {
    this.location.back()
  }
}
