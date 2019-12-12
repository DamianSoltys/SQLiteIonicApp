import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AgmMap } from '@agm/core';
import { Platform } from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  MyLocation,
  GoogleMapsAnimation
} from '@ionic-native/google-maps';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  public lat: number = 51.246452;
  public lng: number = 22.568445;
  map: GoogleMap;
  address: string;

  constructor(public toastCtrl: ToastsService, private platform: Platform) {}

  ngOnInit() {

    
  }

  ionViewDidEnter() {
    this.platform.ready().then(()=>{
      this.loadMap();
    });
  }

  loadMap() {
    this.map = GoogleMaps.create('map_canvas', {
      // camera: {
      //   target: {
      //     lat: 43.0741704,
      //     lng: -89.3809802
      //   },
      //   zoom: 18,
      //   tilt: 30
      // }
    });
    this.goToMyLocation();
  }

  goToMyLocation() {
    this.map.clear();
    this.map
      .getMyLocation()
      .then((location: MyLocation) => {
        console.log(JSON.stringify(location, null, 2));

        this.map.animateCamera({
          target: location.latLng,
          zoom: 17,
          duration: 5000
        });

        let marker: Marker = this.map.addMarkerSync({
          title: 'Twoja lokalizacja',
          snippet: 'Aktualnie znajdujesz się tutaj',
          position: location.latLng,
          animation: GoogleMapsAnimation.BOUNCE
        });

        marker.showInfoWindow();

        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          this.toastCtrl.showToast('Nie klikaj we mnie :)');
        });

        // this.map.on(GoogleMapsEvent.MAP_READY).subscribe(
        //   (data) => {
        //       console.log("Click MAP",data);
        //   }
        // );
      })
      .catch(err => {
        //this.loading.dismiss();
        this.toastCtrl.showToast(err.error_message);
      });
  }
}
