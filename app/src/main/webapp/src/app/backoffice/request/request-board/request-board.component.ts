import {Component, EventEmitter} from '@angular/core';
import {HotToastService} from "@ngneat/hot-toast";
import {TranslateService} from "@ngx-translate/core";
import {MatDialog} from "@angular/material/dialog";
import {BookingRequestService} from "../model/booking-request.service";
import {BookingRequestInfo} from "../model/booking-request-api";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {Page} from "../../../shared/page/page";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {RequestCommentDialogComponent} from "../../../admin/request-admin/request-comment-dialog/request-comment-dialog.component";
import {VisitorGroup} from "../../../visitor-group/model/visitor-group-api";
import {PageEvent} from "@angular/material/paginator";
import {VisitorGroupInfoDialogComponent} from "../../visitor-group/visitor-group-info-dialog/visitor-group-info-dialog.component";

@Component({
  selector: 'app-request-board',
  templateUrl: './request-board.component.html',
  styleUrls: ['./request-board.component.scss']
})
export class RequestBoardComponent {
  reloading: boolean = false
  pageNumber = 0
  pageSize = 25
  totalElements = 0

  data: BookingRequestInfo[] = []

  displayedColumns: string[] = ['timestamp', 'visitorGroup', 'bookings', 'note']

  keyUp: EventEmitter<string> = new EventEmitter<string>()

  showVisitorGroupDetails: boolean = true

  constructor(
    private service: BookingRequestService,
    private toastService: HotToastService,
    private translateService: TranslateService,
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

    this.service.getAllBookingRequestInfoUnconfirmed(number, this.pageSize).subscribe(p => this.handleData(p))
  }

  private handleData(page: Page<BookingRequestInfo>) {
    if (page == null) {
      this.data = [];
      this.pageNumber = 0;
      this.pageSize = 20;
      this.totalElements = 0;
    } else {
      this.data = page.content.filter(d => d != null);
      this.pageNumber = page.pageable.number;
      this.pageSize = page.pageable.size;
      this.totalElements = page.totalSize;
    }
    this.reloading = false;
  }

  handleEntryChanged() {
    if (this.reloading) return
    this.reloading = true
    this.service.getAllBookingRequestInfoUnconfirmed(0, 20).subscribe(d => this.handleData(d))
  }

  handlePageChange(event: PageEvent) {
    if (this.reloading) return
    this.pageSize = event.pageSize
    this.loadPage(event.pageIndex)
  }

  showDetails(visitorGroup: VisitorGroup) {
    this.dialog.open(VisitorGroupInfoDialogComponent, {data: visitorGroup});
  }

  showVisitorGroupDetailsChanged($event: MatSlideToggleChange) {
    this.showVisitorGroupDetails = $event.checked
  }

  showNote(request: BookingRequestInfo) {
    this.dialog.open(RequestCommentDialogComponent, {data: request});
  }

  private search(data: string) {
    this.toastService.error("Sorry searching '" + data + "' is not supported yet")
  }
}
