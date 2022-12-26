import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HelpRoutingModule} from './help-routing.module';
import {HelpDialogComponent} from './help-dialog/help-dialog.component';
import {MaterialModule} from "../material/material.module";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    HelpDialogComponent
  ],
  imports: [
    CommonModule,
    HelpRoutingModule,
    MaterialModule,
    TranslateModule
  ]
})
export class HelpModule {
}
