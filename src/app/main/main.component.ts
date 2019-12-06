import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { FormBuilder , FormGroup, FormArray, FormControl} from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  constructor(private nav: NavController,private router:Router,private activeRoute:ActivatedRoute, private db: DatabaseService, private fb: FormBuilder,private menu: MenuController) { }

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

  public navigate(route:string) {
    this.router.navigateByUrl(`/home/${route}`);
    this.menu.close('first');
  }
  public logOut() {
    this.nav.navigateRoot('/login');
  }
}
