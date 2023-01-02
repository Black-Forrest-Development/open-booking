import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeBoardComponent } from './home-board/home-board.component';
import {MaterialModule} from "../material/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {SharedModule} from "../shared/shared.module";
import {DayInfoModule} from "../day-info/day-info.module";
import { HomeToolbarComponent } from './home-toolbar/home-toolbar.component';


@NgModule({
    declarations: [
        HomeBoardComponent,
        HomeToolbarComponent
    ],
    exports: [
        HomeToolbarComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        MaterialModule,
        TranslateModule,
        SharedModule,
        DayInfoModule,
    ]
})
export class HomeModule { }
