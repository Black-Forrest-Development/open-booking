import {Component} from '@angular/core';
import {DayInfoService} from "../../../day-info/model/day-info.service";
import {MatDialog} from "@angular/material/dialog";
import {OfferAdminChangeDialogComponent} from "../offer-admin-change-dialog/offer-admin-change-dialog.component";
import {OfferAdminService} from "../model/offer-admin.service";
import {OfferAdminCreateSeriesDialogComponent} from "../offer-admin-create-series-dialog/offer-admin-create-series-dialog.component";
import {OfferAdminCreateRangeDialogComponent} from '../offer-admin-create-range-dialog/offer-admin-create-range-dialog.component';

@Component({
  selector: 'app-offer-admin-board',
  templateUrl: './offer-admin-board.component.html',
  styleUrls: ['./offer-admin-board.component.scss']
})
export class OfferAdminBoardComponent {
  reloading: boolean = false;

  constructor(public dayInfoService: DayInfoService, public service: OfferAdminService, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.dayInfoService.loadDefaultDayInfo()
  }

  create() {
    const dialogRef = this.dialog.open(OfferAdminChangeDialogComponent)
    dialogRef.afterClosed().subscribe(() => this.dayInfoService.loadDefaultDayInfo())
  }

  createSeries() {
    const dialogRef = this.dialog.open(OfferAdminCreateSeriesDialogComponent)
    dialogRef.afterClosed().subscribe(() => this.dayInfoService.loadDefaultDayInfo())
  }

  createRange() {
    const dialogRef = this.dialog.open(OfferAdminCreateRangeDialogComponent)
    dialogRef.afterClosed().subscribe(() => this.dayInfoService.loadDefaultDayInfo())
  }

}
