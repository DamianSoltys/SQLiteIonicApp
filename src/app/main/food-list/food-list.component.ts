import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss'],
})
export class FoodListComponent implements OnInit {
  public options = {
    x: 0,
    y: 0,
    width: window.screen.width,
    height: window.screen.height,
    camera: 'back',
    toBack: false,
    tapPhoto: true,
    tapFocus: false,
    previewDrag: false,
    storeToFile: false,
    disableExifHeaderStripping: false
  };
  
  constructor(public platform:Platform,private cameraPreview:CameraPreview) { }

  ngOnInit() {
    this.platform.ready().then(()=>{
      alert('fajno')
      this.cameraPreview.startCamera(this.options).then( (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      });
    });
  }

}
