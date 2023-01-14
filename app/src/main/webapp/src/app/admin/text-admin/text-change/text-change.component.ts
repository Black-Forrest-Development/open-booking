import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {TextChangeRequest, TextDefinition} from "../model/text-api";
import {TextService} from "../model/text.service";

@Component({
  selector: 'app-text-change',
  templateUrl: './text-change.component.html',
  styleUrls: ['./text-change.component.scss']
})
export class TextChangeComponent {

  title: string = "TEXT.MENU.Add";
  reloading: boolean = false

  data: TextDefinition | null = null
  languages: string[] = []

  form: FormGroup = this.fb.group({
      lang: [this.translationService.currentLang, Validators.required],
      type: ['', Validators.required],
      content: ['', Validators.required]
    }
  )
  private snackbarConfig = new MatSnackBarConfig()

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private service: TextService,
    private snackBar: MatSnackBar,
    private translationService: TranslateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.snackbarConfig.horizontalPosition = 'center';
    this.snackbarConfig.verticalPosition = 'bottom';
    this.snackbarConfig.duration = 5000;
    this.snackbarConfig.panelClass = ['snack-success'];

    this.languages = this.translationService.langs
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadData(+id, (e) => this.handleDataEdit(e))
    } else {
      this.handleDataCreate()
    }
  }

  private loadData(textId: number, callback: (e: TextDefinition) => void) {
    this.reloading = true;
    this.service.getText(textId).subscribe(data => callback(data));
  }

  private handleDataCreate() {
    console.log("Handle data create");
    this.data = null;
    this.translationService.get("TEXT.CHANGE.Create").subscribe(text => this.title = text);
  }

  private handleDataEdit(data: TextDefinition) {
    console.log("Handle data edit " + data.id);
    this.data = data;
    this.initValues(data);
    this.translationService.get("TEXT.CHANGE.Update", {offer: data.id}).subscribe(text => this.title = text);
    this.validateForm();
    this.reloading = false;
  }


  private initValues(data: TextDefinition) {
    this.form.get('lang')?.setValue(data.lang)
    this.form.get('type')?.setValue(data.type)
    this.form.get('content')?.setValue(data.content)
  }

  private validateForm() {
    this.form.markAllAsTouched()
  }

  onSubmit() {
    if (this.form.invalid) {
      console.error("Cannot submit form, cause its invalid.")
      this.validateForm()
      this.showFormInvalidError()
      return
    }

    this.reloading = true;
    if (this.data == null) {
      this.create()
    } else {
      this.update(this.data)
    }
  }

  cancel() {
    this.location.back()
  }

  private showFormInvalidError() {
    this.translationService.get("TEXT.MESSAGE.ERROR.FORM_INVALID").subscribe(
      msg => this.snackBar.open(msg, 'OK', this.snackbarConfig).afterDismissed()
    )
  }

  private get request(): TextChangeRequest | null {
    return this.form.value
  }

  private create() {
    let request = this.request
    if (!request) {
      this.showFormInvalidError()
    } else {
      this.service.createText(request).subscribe((result) => this.handleCreateResult(result))
    }
  }

  private update(text: TextDefinition) {
    let request = this.request
    if (!request) {
      this.showFormInvalidError()
    } else {
      this.service.updateText(text.id, request).subscribe((result) => this.handleCreateResult(result))
    }
  }

  private handleCreateResult(result: TextDefinition) {
    if (result == null) {
      this.translationService.get("TEXT.MESSAGE.ERROR.CREATION_FAILED").subscribe(
        msg => this.snackBar.open(msg, 'OK', this.snackbarConfig)
          .afterDismissed()
      )
    } else {
      this.translationService.get("TEXT.MESSAGE.INFO.CREATION_SUCCEED").subscribe(
        msg => this.snackBar.open(msg, 'OK', this.snackbarConfig)
          .afterDismissed()
          .subscribe(() => this.router.navigate(["/admin/text/details/" + result.id]))
      )
    }
  }
}
