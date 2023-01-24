import {Component, Inject} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {MatDialog} from "@angular/material/dialog";
import {DOCUMENT} from "@angular/common";
import {AuthService} from "@auth0/auth0-angular";
import {MatSelectChange} from "@angular/material/select";
import {HomeService} from "../model/home.service";
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, shareReplay} from "rxjs/operators";

@Component({
  selector: 'app-home-toolbar',
  templateUrl: './home-toolbar.component.html',
  styleUrls: ['./home-toolbar.component.scss']
})
export class HomeToolbarComponent {

  languages = [
    {key: 'en', text: 'LANG.English'},
    {key: 'de', text: 'LANG.German'},
  ]

  lang: string | undefined = undefined;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private translate: TranslateService,
              public dialog: MatDialog, @Inject(DOCUMENT)
              public document: Document,
              public auth: AuthService,
              public service: HomeService,
              private breakpointObserver: BreakpointObserver
  ) {
    translate.setDefaultLang('de');

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
    let newTab = window.open()
    // @ts-ignore
    this.service.getHelpUrl().subscribe(url => newTab.location.href = url.url)
  }

}
