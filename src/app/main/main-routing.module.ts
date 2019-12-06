import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { CalculatorsComponent } from './calculators/calculators.component';
import { FoodListComponent } from './food-list/food-list.component';
import { HistoryComponent } from './history/history.component';


const routes: Routes = [
  {path:'',component:MainComponent,children:[
    {path:'calculators',component:CalculatorsComponent},
    {path:'foodList',component:FoodListComponent},
    {path:'history',component:HistoryComponent},
  ]},
  
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
