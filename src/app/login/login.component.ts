import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm = this.fb.group({
    userName:[],
    password:[]
  });
  public loginError = false;
  public errorMessage = '';
  constructor(private fb:FormBuilder,public navController:NavController,private db:DatabaseService) { }

  ngOnInit() {}

  public loginUser() {
    console.log(this.loginForm.value);
    this.db.loginUser(this.loginForm.value).subscribe(response=>{
      if(response) {
        this.loginError = false;
        alert(`Witaj ${response.userName}`);
        this.navController.navigateForward('home');
      } else {
        this.loginError = true;
        this.errorMessage = 'Logowanie się nie powiodło!'
      }
    });
  }

  public navigateRegister() {
    this.navController.navigateForward('/register');
  }

}
