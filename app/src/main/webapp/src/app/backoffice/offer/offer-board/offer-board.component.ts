import {Component, EventEmitter} from '@angular/core';
import {HotToastService} from "@ngneat/hot-toast";
import {TranslateService} from "@ngx-translate/core";
import {MatDialog} from "@angular/material/dialog";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {Page} from "../../../shared/page/page";
import {PageEvent} from "@angular/material/paginator";
import {Offer} from "../model/offer-api";
import {OfferDeleteDialogComponent} from "../offer-delete-dialog/offer-delete-dialog.component";
import {OfferService} from "../model/offer.service";
import {OfferAdminCreateSeriesDialogComponent} from "../../../admin/offer-admin/offer-admin-create-series-dialog/offer-admin-create-series-dialog.component";
import {OfferAdminCreateRangeDialogComponent} from "../../../admin/offer-admin/offer-admin-create-range-dialog/offer-admin-create-range-dialog.component";
import {ExportService} from "../../export/model/export.service";

@Component({
  selector: 'app-offer-board',
  templateUrl: './offer-board.component.html',
  styleUrls: ['./offer-board.component.scss']
})
export class OfferBoardComponent {

  reloading: boolean = false
  pageNumber = 0
  pageSize = 10
  totalElements = 0

  data: Offer[] = []

  displayedColumns: string[] = ['start', 'finish', 'maxPersons', 'active', 'cmd']

  keyUp: EventEmitter<string> = new EventEmitter<string>()

  constructor(
    private service: OfferService,
    private toastService: HotToastService,
    private translateService: TranslateService,
    private exportService: ExportService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.loadPage(this.pageNumber)

    this.keyUp.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(data => this.search(data))
  }

  private loadPage(number: number) {
    if (this.reloading) return
    this.reloading = true

    this.service.getAllOffer(number, this.pageSize).subscribe(p => this.handleData(p))
  }

  private handleData(p: Page<Offer>) {
    this.data = p.content

    this.totalElements = p.totalSize
    this.pageNumber = p.pageable.number
    this.pageSize = p.pageable.size
    this.reloading = false
  }


  delete(offer: Offer) {
    let dialogRef = this.dialog.open(OfferDeleteDialogComponent, {data: offer})

    dialogRef.afterClosed().subscribe((value) => {
      if (value) this.service.deleteOffer(offer.id).subscribe(() => this.handleDeleted(offer))
    });
  }

  private handleDeleted(offer: Offer) {
    this.translateService.get("OFFER.Message.DeleteSuccess", offer).subscribe(msg => this.toastService.success(msg))
    this.loadPage(0)
  }


  search(query: string) {
    this.toastService.error("Not implemented yet to search for '" + query + "'")
  }

  handlePageChange(event: PageEvent) {
    if (this.reloading) return
    this.pageSize = event.pageSize
    this.loadPage(event.pageIndex)
  }

  createSeries() {
    const dialogRef = this.dialog.open(OfferAdminCreateSeriesDialogComponent)
    dialogRef.afterClosed().subscribe(() => this.loadPage(0))
  }

  createRange() {
    const dialogRef = this.dialog.open(OfferAdminCreateRangeDialogComponent)
    dialogRef.afterClosed().subscribe(() => this.loadPage(0))
  }

  updateOfferOngoing: UpdateEntry[] = [];

  isUpdateOngoing(offer: Offer): boolean {
    return this.getUpdateEntry(offer) != null
  }

  private getUpdateEntry(offer: Offer): UpdateEntry | undefined {
    return this.updateOfferOngoing.find(o => o.offer.id == offer.id)
  }

  getOfferMode(offer: Offer) {
    return this.getUpdateEntry(offer)?.field ?? "none"
  }

  toggleActive(offer: Offer) {
    if (this.isUpdateOngoing(offer)) return

    this.updateOfferOngoing.push({offer: offer, field: 'active'});
    this.service.setOfferActive(offer.id, !offer.active).subscribe(data => this.updateOffer(data))
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
    const index = this.updateOfferOngoing.findIndex(u => u.offer.id == offer.id)
    if (index > -1) {
      this.updateOfferOngoing.splice(index, 1);
    }
  }
}

interface UpdateEntry {
  offer: Offer,
  field: string
}
