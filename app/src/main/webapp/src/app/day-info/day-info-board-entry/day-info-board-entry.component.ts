import {Component, Input} from '@angular/core';
import {DayInfo, defaultDayInfo} from "../model/day-info-api";
import {DayInfoService} from '../model/day-info.service';

@Component({
  selector: 'app-day-info-board-entry',
  templateUrl: './day-info-board-entry.component.html',
  styleUrls: ['./day-info-board-entry.component.scss']
})
export class DayInfoBoardEntryComponent {
  @Input()
  data: DayInfo = defaultDayInfo

  selected = false;

  constructor(private service: DayInfoService) {
  }

  isSelected(): boolean {
    return false
  }

  toggleSelection() {
      this.service.toggleSelection(this.data)
  }
}
