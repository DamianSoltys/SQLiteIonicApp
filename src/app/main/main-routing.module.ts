import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { CalculatorsComponent } from './calculators/calculators.component';
import { FoodListComponent } from './food-list/food-list.component';
import { HistoryComponent } from './history/history.component';
import { MapComponent } from './map/map.component';
import { HomePageComponent } from './home-page/home-page.component';


const routes: Routes = [
  {path:'',component:MainComponent,children:[
    {path:'homePage',component:HomePageComponent},
    {path:'calculators',component:CalculatorsComponent},
    {path:'foodList',component:FoodListComponent},
    {path:'history',component:HistoryComponent},
    {path:'map',component:MapComponent},
  ]},
  
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
