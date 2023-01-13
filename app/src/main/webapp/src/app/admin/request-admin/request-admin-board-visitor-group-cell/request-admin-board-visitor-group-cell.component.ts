import {Component, Input} from '@angular/core';
import {defaultVisitorGroup, VisitorGroup} from "../../../visitor-group/model/visitor-group-api";
import {VisitorGroupAdminService} from "../../visitor-group-admin/model/visitor-group-admin.service";
import {MatDialog} from "@angular/material/dialog";
import {VisitorGroupInfoDialogComponent} from "../../visitor-group-admin/visitor-group-info-dialog/visitor-group-info-dialog.component";

@Component({
  selector: 'app-request-admin-board-visitor-group-cell',
  templateUrl: './request-admin-board-visitor-group-cell.component.html',
  styleUrls: ['./request-admin-board-visitor-group-cell.component.scss']
})
export class RequestAdminBoardVisitorGroupCellComponent {
  @Input() data: VisitorGroup = defaultVisitorGroup
  @Input() showDetails: boolean = true
  confirming: boolean = false


  constructor(private visitorGroupService: VisitorGroupAdminService, private dialog: MatDialog) {
  }

  confirm() {
    if (this.confirming) return

    this.confirming = true
    this.visitorGroupService.confirmVisitorGroup(this.data.id).subscribe(
      {
        next: d => this.handleVisitorGroupChange(d),
        error: (err) => this.confirming = false
      }
    )
  }

  private handleVisitorGroupChange(d: VisitorGroup) {
    this.data = d
    this.confirming = false
  }

  showDetailsDialog() {
    this.dialog.open(VisitorGroupInfoDialogComponent, {data: this.data});
  }
}
