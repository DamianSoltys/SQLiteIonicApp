import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterRoutingModule } from './register-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    RegisterRoutingModule,
    IonicModule
  ]
})
export class RegisterModule { }
