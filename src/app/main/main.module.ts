import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CalculatorsModule } from './calculators/calculators.module';
import { FoodListModule } from './food-list/food-list.module';
import { CalculatorsComponent } from './calculators/calculators.component';
import { FoodListComponent } from './food-list/food-list.component';
import { HistoryModule } from './history/history.module';
import { MapModule } from './map/map.module';
import { HomePageModule } from './home-page/home-page.module';


@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    IonicModule,
    RouterModule,
    CalculatorsModule,
    FoodListModule,
    HistoryModule,
    MapModule,
    HomePageModule
  ],
})
export class MainModule { }
