import {Component} from '@angular/core';
import {TextService} from "../model/text.service";
import {TextDefinition} from "../model/text-api";
import {Router} from '@angular/router';

@Component({
  selector: 'app-text-admin-board',
  templateUrl: './text-admin-board.component.html',
  styleUrls: ['./text-admin-board.component.scss']
})
export class TextAdminBoardComponent {

  reloading: boolean = false
  text: TextDefinition[] = []

  displayedColumns: string[] = ['id', 'lang', 'type', 'action'];

  constructor(private service: TextService, private router: Router) {
  }

  ngOnInit() {
    this.service.getAllTexts(0, 20).subscribe()
  }

  create() {
    this.router.navigate(['/admin/text/create']).then()
  }
}
