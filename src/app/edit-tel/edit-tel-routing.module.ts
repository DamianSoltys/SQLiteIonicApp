import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditTelComponent } from './edit-tel.component';

const routes: Routes = [
  {
    path: '', component: EditTelComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditTelRoutingModule { }
