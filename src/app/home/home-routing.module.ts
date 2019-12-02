import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomePage } from './home.page';
import { CalculatorsComponent } from '../calculators/calculators.component';
import { FoodListComponent } from '../food-list/food-list.component';
const routes: Routes = [
  {path: '',component: HomePage},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
