import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';
import { ToastsService } from '../services/toasts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm = this.fb.group({
    userName:[null,[Validators.required]],
    password:[null,[Validators.required]]
  });

  constructor(private fb:FormBuilder,public navController:NavController,private db:DatabaseService,private router:Router,private toastCtr:ToastsService) { }

  ngOnInit() {
    //this.navController.navigateForward('/home');
  }

  public loginUser() {
    this.db.loginUser(this.loginForm.value).subscribe(response=>{
      if(response) {
        this.toastCtr.showToast(`Witaj ${response.userName}`);
        this.navController.navigateForward('/home');
      } else {
        this.toastCtr.showToast('Nie udało się zalogować!')
      }
    });
  }

  public navigateRegister() {
    this.navController.navigateForward('/register');
  }

}
