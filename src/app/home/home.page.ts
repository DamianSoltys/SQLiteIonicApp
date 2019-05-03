import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TelInfo, DatabaseService } from '../services/database.service';
import { FormBuilder , FormGroup, FormArray, FormControl} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  telForm: FormGroup;
  telchecks = [];
  showDelete = false;

   progress = 0;
   pressState = 'released';
   interval: any;

  telephones: TelInfo[] = [];


  constructor(private router: Router, private db: DatabaseService, private fb: FormBuilder) {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getTelephones().subscribe(phones => {
          this.telephones = phones;
          if (this.telephones.length > 0 && this.formArray.controls.length<= this.telephones.length) {
            this.addChecks();
            console.log(this.telForm.controls.telephones);
          }
        });
      }
    });
    this.telForm = fb.group({
      telephones: new FormArray([]),
    });




  }

get formArray(){
  return this.telForm.get('telephones') as FormArray;
}
  goToRemList() {
    this.showDelete = !this.showDelete;

  }
  addChecks() {
    this.telephones.map((o, i) => {
      const control = new FormControl(false);
      (this.telForm.controls.telephones as FormArray).push(control);
    });
  }

  goToEditTel(tel: TelInfo) {
   if (tel) {
    this.router.navigate(['editTel', tel.telId]);
   } else {
        this.router.navigate(['editTel']);

      }


  }


onPress($event) {
  console.log('onPress', $event);
  this.pressState = 'pressing';
  this.startInterval();
}

onPressUp($event, tel: TelInfo) {
  console.log('onPressUp', $event);
  this.pressState = 'released';
  this.stopInterval();
  this.router.navigate(['/editTel', tel.telId]);



}

startInterval() {
  const self = this;
  this.interval = setInterval(_ => {
      self.progress = self.progress + 1;
  }, 50);
}

stopInterval() {
  clearInterval(this.interval);
  this.progress = 0;

}
Delete() {
  this.formArray.controls.forEach((element, index) => {
    if (element.value) {
        this.db.deleteTelephone(this.telephones[index].telId);
        this.showDelete = !this.showDelete;
        this.router.navigate(['/']);
    } else {

    }
  });
}



}
