import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { FormBuilder , FormGroup, FormArray, FormControl} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private router: Router, private db: DatabaseService, private fb: FormBuilder) {}

  ngOnInit() {
    // this.db.getDatabaseState().subscribe(ready=>{
    //   if(ready) {
    //     console.log(ready);
    //   }
    // });
  }

}
