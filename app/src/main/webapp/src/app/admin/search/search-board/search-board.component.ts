import {Component, EventEmitter, ViewChild} from '@angular/core';
import {BookingAdminService} from "../../booking-admin/model/booking-admin.service";
import {FormBuilder, FormControl} from "@angular/forms";
import {debounceTime, defer, distinctUntilChanged, merge, Observable, of, switchMap} from "rxjs";
import {BookingDetails, BookingSearchRequest, BookingSearchResult} from "../../booking-admin/model/booking-admin-api";
import {Page} from "../../../shared/page/page";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-search-board',
  templateUrl: './search-board.component.html',
  styleUrls: ['./search-board.component.scss']
})
export class SearchBoardComponent {

  reloading: boolean = false

  keyUp: EventEmitter<string> = new EventEmitter<string>()

  pageNumber = 0
  pageSize = 25
  totalElements = 0

  data: BookingSearchResult[] = []

  displayedColumns: string[] = ['title', 'contact', 'size', 'start', 'status', 'cmd'];

  constructor(private service: BookingAdminService) {
  }

  ngOnInit(): void {
    this.keyUp.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(data => this.search(data))
  }

  search(query: string) {
    if (this.reloading) return
    this.reloading = true
    this.service.searchBookingDetails(new BookingSearchRequest(query), this.pageNumber, this.pageSize)
      .subscribe({
        next: p => this.handleData(p),
        error: (e) => this.reloading = false
      })
  }

  private handleData(p: Page<BookingSearchResult>) {
    this.data = p.content
    this.totalElements = p.totalSize
    this.reloading = false
  }
}
