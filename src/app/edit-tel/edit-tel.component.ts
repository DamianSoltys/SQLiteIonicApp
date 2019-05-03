import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup, FormArray, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TelInfo, DatabaseService } from '../services/database.service';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-edit-tel',
  templateUrl: './edit-tel.component.html',
  styleUrls: ['./edit-tel.component.scss'],
})
export class EditTelComponent implements OnInit {


  formTel: FormGroup;

  constructor(private db: DatabaseService, private params: ActivatedRoute,
              private fb: FormBuilder, private router: Router, private browser: InAppBrowser) {
    this.formTel = this.fb.group({
      manufacturer: ['', Validators.required],
      model: ['', Validators.required],
      url: ['', [Validators.required, Validators.
      pattern(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/))]],
      android: ['', [Validators.required, Validators.pattern(new RegExp(/\d+(?:\.\d+)+/))]]
    });

   }

  ngOnInit() {
    const paramId = +this.params.snapshot.paramMap.get('id');
    if (paramId) {
      this.db.getTelephone(paramId).then(element => {
        this.formTel.controls.manufacturer.setValue(element.manufacturer);
        this.formTel.controls.model.setValue(element.model);
        this.formTel.controls.url.setValue(element.url);
        this.formTel.controls.android.setValue(element.android);
      });
    }

  }

  get form() {
    return this.formTel.controls;
  }
  onSubmit() {
    const paramId = +this.params.snapshot.paramMap.get('id');

    const manufacturer = this.form.manufacturer.value;
    const model = this.form.model.value;
    const url = this.form.url.value;
    const android = this.form.android.value;
    console.log(manufacturer);
    if (!paramId) {
      this.db.addTelephone(manufacturer, model, url, android);
      this.router.navigate(['/']);
      console.log(paramId);
    } else {
      const Tel: TelInfo = {
        telId: paramId,
        manufacturer,
        model,
        url,
        android
      };

      this.db.updateTelephone(Tel);
      console.log(paramId);
      this.router.navigate(['/']);
    }



  }
  OpenBrowser() {
    const url = this.form.url.value;
    this.browser.create(url, '_blank');
  }
  Cancel() {
    this.router.navigate(['/']);
  }

}
