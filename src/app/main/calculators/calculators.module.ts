import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculatorsRoutingModule } from './calculators-routing.module';
import { IonicModule } from '@ionic/angular';
import { CalculatorsComponent } from './calculators.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CalculatorsComponent],
  imports: [
    CommonModule,
    CalculatorsRoutingModule,
    IonicModule,
    SelectDropDownModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CalculatorsModule { }
