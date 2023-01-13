import {Component, Inject} from '@angular/core';
import {Editor, schema, Toolbar} from "ngx-editor";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BookingRequestInfo} from "../model/request-admin-api";

@Component({
  selector: 'app-request-confirm-message-dialog',
  templateUrl: './request-confirm-message-dialog.component.html',
  styleUrls: ['./request-confirm-message-dialog.component.scss']
})
export class RequestConfirmMessageDialogComponent {
  editor: Editor = new Editor({
      content: '',
      plugins: [],
      schema,
      nodeViews: {},
      history: true,
      keyboardShortcuts: true,
      inputRules: true,
    }
  )
  toolbar: Toolbar = [
    // default value
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']}],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear'],
  ];
  html: string = ""

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BookingRequestInfo,
    public dialogRef: MatDialogRef<RequestConfirmMessageDialogComponent>
  ) {
  }

  ngOnInit() {
    this.editor.setContent("Hello World!")
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
