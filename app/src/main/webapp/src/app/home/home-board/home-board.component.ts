import {Component, OnInit} from '@angular/core';
import {UserApiService} from "../model/user-api.service";
import {DayInfo} from "../model/user-api";

@Component({
  selector: 'app-home-board',
  templateUrl: './home-board.component.html',
  styleUrls: ['./home-board.component.scss']
})
export class HomeBoardComponent implements OnInit {

  reloading: boolean = false;
  data: DayInfo[] = []

  constructor(private service: UserApiService) {
  }

  ngOnInit(): void {
    this.reloading = true
    this.service.getDefaultDayInfo().subscribe(d => this.handleData(d))
  }


  private handleData(data: DayInfo[]) {
    this.data = data;
    this.reloading = false;
  }
}
