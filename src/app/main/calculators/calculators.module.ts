import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculatorsRoutingModule } from './calculators-routing.module';
import { IonicModule } from '@ionic/angular';
import { CalculatorsComponent } from './calculators.component';


@NgModule({
  declarations: [CalculatorsComponent],
  imports: [
    CommonModule,
    CalculatorsRoutingModule,
    IonicModule
  ]
})
export class CalculatorsModule { }
