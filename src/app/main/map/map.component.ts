import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AgmMap } from '@agm/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit{
  @ViewChild('map',{static:false}) map:AgmMap;
  public loaded: boolean = false;
  public lat: number = 51.246452;
  public lng: number = 22.568445;
  constructor(private geolocation: Geolocation, public plt:Platform) { }

  ngAfterViewInit() {
    this.plt.ready().then(()=>{
      this.map.mapReady.subscribe(resp=>{
        this.loadMap();
      });
    });
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((data) => {
      this.lat = data.coords.latitude
      this.lat = data.coords.longitude
     }).catch((error) => {
       alert('Nie udało się pobrać twojej lokalizacji');
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      this.lat = data.coords.latitude
      this.lat = data.coords.longitude
     });
     this.loaded = true;
  }

}
