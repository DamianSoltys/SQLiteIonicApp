import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map.component';
import { IonicModule } from '@ionic/angular';
import { AgmCoreModule } from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    IonicModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyDymmSbQ_6KBgygpEZwcztemgH3HXTOYrI',
    })
  ],
  providers:[
    Geolocation
  ]

})
export class MapModule { }
