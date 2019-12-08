import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodListRoutingModule } from './food-list-routing.module';
import { FoodListComponent } from './food-list.component';
import { IonicModule } from '@ionic/angular';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [FoodListComponent],
  imports: [
    CommonModule,
    FoodListRoutingModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    Camera
  ]
})
export class FoodListModule { }
