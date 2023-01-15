import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuditBoardComponent} from "./audit-board/audit-board.component";

const routes: Routes = [
  {path: '', component: AuditBoardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditRoutingModule {
}
