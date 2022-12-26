import {Component} from '@angular/core';
import {MatSelectChange} from "@angular/material/select";
import {TranslateService} from "@ngx-translate/core";
import {MatDialog} from "@angular/material/dialog";
import {HelpDialogComponent} from "./help/help-dialog/help-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'open-booking';
  lang: string = 'de';

  languages = [
    {key: 'en', text: 'LANG.English'},
    {key: 'de', text: 'LANG.German'},
  ]

  constructor(private translate: TranslateService, public dialog: MatDialog) {
    translate.setDefaultLang('en');
    translate.use(this.lang);
  }

  changeLang(event: MatSelectChange) {
    let value = event.value;
    this.translate.use(value)
  }

  showHelp() {
    this.dialog.open(HelpDialogComponent);
  }
}
