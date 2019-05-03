import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { EditTelRoutingModule } from './edit-tel-routing.module';
import { EditTelComponent } from './edit-tel.component';

@NgModule({
  declarations: [EditTelComponent],
  imports: [
    CommonModule,
    EditTelRoutingModule,
    IonicModule,
    ReactiveFormsModule,
  ]
})
export class EditTelModule { }
