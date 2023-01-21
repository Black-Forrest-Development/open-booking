import {Component, EventEmitter, OnInit} from '@angular/core';
import {RequestAdminService} from '../model/request-admin.service';
import {Page} from "../../../shared/page/page";
import {BookingRequestInfo} from "../model/request-admin-api";
import {VisitorGroup} from "../../../visitor-group/model/visitor-group-api";
import {MatDialog} from "@angular/material/dialog";
import {VisitorGroupAdminService} from "../../visitor-group-admin/model/visitor-group-admin.service";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {HotToastService} from "@ngneat/hot-toast";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-request-admin-board',
  templateUrl: './request-admin-board.component.html',
  styleUrls: ['./request-admin-board.component.scss']
})
export class RequestAdminBoardComponent implements OnInit {

  reloading: boolean = false
  keyUp: EventEmitter<string> = new EventEmitter<string>()
  data: BookingRequestInfo[] = []
  displayedColumns: string[] = ['timestamp', 'visitorGroup', 'bookings', 'note'];

  pageNumber = 0
  pageSize = 20
  totalElements = 0

  showVisitorGroupDetails: boolean = true

  constructor(
    private service: RequestAdminService,
    private visitorGroupService: VisitorGroupAdminService,
    private dialog: MatDialog,
    private toastService: HotToastService
  ) {
  }

  ngOnInit(): void {
    this.reload()
    this.keyUp.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(data => this.search(data))
  }

  reload() {
    if (this.reloading) return
    this.reloading = true
    this.service.getAllBookingRequestInfoUnconfirmed(this.pageNumber, this.pageSize).subscribe(d => this.handleData(d))
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

  isPaginatorVisible() {
    return this.totalElements > this.pageSize;
  }

  handleEntryChanged() {
    if (this.reloading) return
    this.reloading = true
    this.service.getAllBookingRequestInfoUnconfirmed(0, 20).subscribe(d => this.handleData(d))
  }

  showDetails(visitorGroup: VisitorGroup) {
    // this.dialog.open(VisitorGroupInfoDialogComponent, {data: visitorGroup});
  }

  private search(data: string) {
    this.toastService.error("Sorry searching '" + data + "' is not supported yet")
  }

  showVisitorGroupDetailsChanged($event: MatSlideToggleChange) {
    this.showVisitorGroupDetails = $event.checked
  }

  showNote(request: BookingRequestInfo) {
    // this.dialog.open(RequestCommentDialogComponent, {data: request});
  }
}
