import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {DayInfoService} from "../model/day-info.service";

@Component({
  selector: 'app-day-info-range-selection',
  templateUrl: './day-info-range-selection.component.html',
  styleUrls: ['./day-info-range-selection.component.scss']
})
export class DayInfoRangeSelectionComponent {

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(private service: DayInfoService) {
  }

  handleSelectionChange() {
    let start = this.range.get('start')?.value
    let end = this.range.get('end')?.value

    console.log("Handle selection change" + start + " " + end)
    if (this.range.invalid) return
    if (start == null || end == null) {
      this.service.loadDefaultDayInfo()
    } else {
      this.service.loadRangeDayInfo(start, end)
    }
  }

  clearSelection() {
    this.range.get('start')?.setValue(null)
    this.range.get('end')?.setValue(null)
  }
}
