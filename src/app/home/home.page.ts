import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { FormBuilder , FormGroup, FormArray, FormControl} from '@angular/forms';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private router: Router, private db: DatabaseService, private fb: FormBuilder,private menu: MenuController) {}

  ngOnInit() {
    // this.db.getDatabaseState().subscribe(ready=>{
    //   if(ready) {
    //     console.log(ready);
    //   }
    // });
  }

  penFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
}
