import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VisitorGroupRoutingModule} from './visitor-group-routing.module';
import {VisitorGroupInfoComponent} from './visitor-group-info/visitor-group-info.component';
import {MaterialModule} from "../../material/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";
import {VisitorGroupInfoDialogComponent} from "./visitor-group-info-dialog/visitor-group-info-dialog.component";


@NgModule({
  declarations: [
    VisitorGroupInfoComponent,
    VisitorGroupInfoDialogComponent
  ],
  exports: [
    VisitorGroupInfoComponent,
    VisitorGroupInfoDialogComponent
  ],
  imports: [
    CommonModule,
    VisitorGroupRoutingModule,
    MaterialModule,
    TranslateModule,
    ReactiveFormsModule,
  ]
})
export class VisitorGroupModule {
}
