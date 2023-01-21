import {Component, Input} from '@angular/core';
import {defaultVisitorGroup, VisitorGroup} from "../../../visitor-group/model/visitor-group-api";
import {VisitorGroupAdminService} from "../model/visitor-group-admin.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-visitor-group-admin-entry',
  templateUrl: './visitor-group-admin-entry.component.html',
  styleUrls: ['./visitor-group-admin-entry.component.scss']
})
export class VisitorGroupAdminEntryComponent {
  @Input() data: VisitorGroup = defaultVisitorGroup
  @Input() statusVisible: boolean = true
  @Input() infoVisible: boolean = true

  confirming: boolean = false


  constructor(private visitorGroupService: VisitorGroupAdminService, private dialog: MatDialog) {
  }

  confirm() {
    if (this.confirming) return

    this.confirming = true
    this.visitorGroupService.confirmVisitorGroup(this.data.id).subscribe(d => this.handleVisitorGroupChange(d))
  }

  private handleVisitorGroupChange(d: VisitorGroup) {
    this.data = d
    this.confirming = false
  }

  showDetails() {
    // this.dialog.open(VisitorGroupInfoDialogComponent, {data: this.data});
  }
}
