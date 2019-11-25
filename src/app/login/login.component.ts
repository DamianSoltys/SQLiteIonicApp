import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm = this.fb.group({
    loginName:[],
    password:[]
  });
  constructor(private fb:FormBuilder,public navController:NavController) { }

  ngOnInit() {}

  public loginUser() {
    console.log(this.loginForm.value);
  }

  public navigateRegister() {
    this.navController.navigateForward('/register');
  }

}
