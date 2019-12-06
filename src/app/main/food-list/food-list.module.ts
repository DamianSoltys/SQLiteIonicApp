import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodListRoutingModule } from './food-list-routing.module';
import { FoodListComponent } from './food-list.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [FoodListComponent],
  imports: [
    CommonModule,
    FoodListRoutingModule,
    IonicModule
  ]
})
export class FoodListModule { }
