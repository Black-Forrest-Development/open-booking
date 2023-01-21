import {Component} from '@angular/core';
import {DayInfoService} from "../../../day-info/model/day-info.service";
import {MatDialog} from "@angular/material/dialog";
import {OfferAdminService} from "../model/offer-admin.service";
import {OfferAdminCreateSeriesDialogComponent} from "../offer-admin-create-series-dialog/offer-admin-create-series-dialog.component";
import {OfferAdminCreateRangeDialogComponent} from '../offer-admin-create-range-dialog/offer-admin-create-range-dialog.component';
import {DayInfo} from "../../../day-info/model/day-info-api";
import {ExportService} from "../../export/model/export.service";
import {HotToastService} from "@ngneat/hot-toast";

@Component({
  selector: 'app-offer-admin-board',
  templateUrl: './offer-admin-board.component.html',
  styleUrls: ['./offer-admin-board.component.scss']
})
export class OfferAdminBoardComponent {
  reloading: boolean = false;

  constructor(public dayInfoService: DayInfoService,
              public service: OfferAdminService,
              private dialog: MatDialog,
              private exportService: ExportService,
              private toast: HotToastService
  ) {

  }

  ngOnInit(): void {
    this.dayInfoService.loadDefaultDayInfo()
  }

  create() {
    // const dialogRef = this.dialog.open(OfferAdminChangeDialogComponent)
    // dialogRef.afterClosed().subscribe(() => this.dayInfoService.loadDefaultDayInfo())
  }

  createSeries() {
    const dialogRef = this.dialog.open(OfferAdminCreateSeriesDialogComponent)
    dialogRef.afterClosed().subscribe(() => this.dayInfoService.loadDefaultDayInfo())
  }

  createRange() {
    const dialogRef = this.dialog.open(OfferAdminCreateRangeDialogComponent)
    dialogRef.afterClosed().subscribe(() => this.dayInfoService.loadDefaultDayInfo())
  }


  exportPdf(data: DayInfo) {
    let reference = this.toast.loading("Download started...")
    this.exportService.createDailyReportPdf(data.date)
      .subscribe({
          error: (e) => {
            reference.close()
            this.toast.error("Failed to generate PDF for " + data.date)
          },
          complete: () => reference.close()
        }
      )
  }
}
