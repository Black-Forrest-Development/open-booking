import {Component, Inject, OnInit} from '@angular/core';
import {MatSelectChange} from "@angular/material/select";
import {TranslateService} from "@ngx-translate/core";
import {MatDialog} from "@angular/material/dialog";
import {HelpDialogComponent} from "./help/help-dialog/help-dialog.component";
import {AuthService} from "@auth0/auth0-angular";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'open-booking';

  languages = [
    {key: 'en', text: 'LANG.English'},
    {key: 'de', text: 'LANG.German'},
  ]

  lang: string | undefined = undefined;


  constructor(private translate: TranslateService, public dialog: MatDialog, @Inject(DOCUMENT) public document: Document, public auth: AuthService) {
    translate.setDefaultLang('en');

  }

  ngOnInit() {
    this.lang = navigator.language
    this.translate.use(this.lang);
  }

  changeLang(event: MatSelectChange) {
    let value = event.value
    this.setLanguage(value)
  }

  setLanguage(language: string) {
    this.lang = language
    this.translate.use(language)
  }

  showHelp() {
    this.dialog.open(HelpDialogComponent);
  }

}
