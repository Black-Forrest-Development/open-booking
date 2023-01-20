import {Component, EventEmitter} from '@angular/core';
import {debounceTime, distinctUntilChanged} from "rxjs";
import {HotToastService} from "@ngneat/hot-toast";
import {DayInfoService} from "../../../day-info/model/day-info.service";
import {ExportService} from "../../../admin/export/model/export.service";
import {DayInfo} from "../../../day-info/model/day-info-api";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  reloading: boolean = false

  constructor(
    public dayInfoService: DayInfoService,
    private exportService: ExportService,
    private toastService: HotToastService
  ) {
  }

  ngOnInit(): void {
    this.dayInfoService.loadDefaultDayInfo()
  }




}
