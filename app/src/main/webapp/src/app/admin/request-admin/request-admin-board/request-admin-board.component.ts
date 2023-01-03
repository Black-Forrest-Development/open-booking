import {Component, OnInit} from '@angular/core';
import {RequestAdminService} from '../model/request-admin.service';
import {Page} from "../../../shared/page/page";
import {BookingRequestInfo} from "../model/request-admin-api";

@Component({
  selector: 'app-request-admin-board',
  templateUrl: './request-admin-board.component.html',
  styleUrls: ['./request-admin-board.component.scss']
})
export class RequestAdminBoardComponent implements OnInit {

  reloading: boolean = false

  data: BookingRequestInfo[] = []

  pageNumber = 0;
  pageSize = 20;
  totalElements = 0;


  constructor(private service: RequestAdminService) {
  }

  ngOnInit(): void {
    this.reload()
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
      this.pageNumber = page.pageable.pageNumber;
      this.pageSize = page.pageable.pageSize;
      this.totalElements = page.totalElements;
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
}
