import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
export interface User {
  userName:string,
  email:string,
  password:string,
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm = this.fb.group({
    userName:[],
    email:[],
    password:[],
    checkPassword:[]
  });
  public registerError = false;
  public errorMessage = '';
  constructor(private fb:FormBuilder,public navController:NavController,private db:DatabaseService) { }

  ngOnInit() {
    //this.db.deleteTableData('user');
  }

  public registerUser() {
    if(this.registerForm.controls.password.value === this.registerForm.controls.checkPassword.value) {
      this.db.registerUser(this.registerForm.value).subscribe(response=>{
        if(response) {
          this.registerError = false;
          alert('Rejestracja się powiodła!');
        } else {
          this.registerError = true;
          this.errorMessage = "Rejestacja się nie powiodła!";
        }
      })
      
    } else {
      this.registerError = true;
      this.errorMessage = "Hasła nie są takie same!";
    }
  }

  public navigateLogin() {
    this.navController.navigateBack('/login');
  }
}
