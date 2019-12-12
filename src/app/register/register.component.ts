import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { ToastController } from '@ionic/angular';
import { ToastsService } from '../services/toasts.service';
export interface User {
  userId:number,
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
    userName:[null,[Validators.required]],
    email:[null,[Validators.required,Validators.pattern(new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"))]],
    password:[null,[Validators.required]],
    checkPassword:[null,[Validators.required]]
  });
  constructor(private fb:FormBuilder,public navController:NavController,private db:DatabaseService,private toastCtr:ToastsService) { }

  ngOnInit() {
    //this.db.deleteTableData('user');
  }

  public registerUser() {
    if(this.registerForm.controls.password.value === this.registerForm.controls.checkPassword.value) {
      this.db.registerUser(this.registerForm.value).subscribe(response=>{
        if(response) {
          this.toastCtr.showToast('Rejestracja się powiodła!');
          this.navController.navigateBack('/login');
        } else {
          this.toastCtr.showToast('Rejestacja się nie powiodła!');
        }
      })
      
    } else {
      this.toastCtr.showToast('Hasła nie są takie same!');
    }
  }

  public navigateLogin() {
    this.navController.navigateBack('/login');
  }
}
