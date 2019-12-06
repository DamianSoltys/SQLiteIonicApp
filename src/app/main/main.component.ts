import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { FormBuilder , FormGroup, FormArray, FormControl} from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  constructor(private router: NavController, private db: DatabaseService, private fb: FormBuilder,private menu: MenuController) { }

  ngOnInit() {
    // this.db.getDatabaseState().subscribe(ready=>{
    //   if(ready) {
    //     console.log(ready);
    //   }
    // });
  }
  
  public penFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  public openEnd() {
    this.menu.open('end');
  }

  public openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  public logOut() {
    this.router.navigateRoot('/login');
  }
}
