import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FormBuilder, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { User } from 'src/app/register/register.component';
export enum SwitchOptions {
  HISTORY = 'history',
  FORM = 'form'
}
export interface Meal {
  mealId?:number,
  userId:number,
  name:string,
  protein:number,
  fat:number,
  carbohydrates:number,
  kcal:number,
  picture:any,
  date:string,
}
@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss'],
})
export class FoodListComponent implements OnInit {
  public options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  public picture:any;

  public isHistory:boolean = true;
  public mealList:Meal[] = null;
  public success = false;
  public error = false;

  public addForm = this.fb.group({
    name:[null,[Validators.required]],
    protein:[null,[Validators.required]],
    fat:[null,[Validators.required]],
    carbohydrates:[null,[Validators.required]],
    kcal:[null,[Validators.required]],
  });

  
  constructor(public platform:Platform,private camera: Camera,private fb:FormBuilder,private db:DatabaseService) { }

  ngOnInit() {
    this.platform.ready().then(()=>{
      this.getMeals();
      this.db.getMealData.subscribe(response=>{
        if(response) {
          this.getMeals();
        }
      })
    });
  }

  private getMeals() {
    this.db.getMeals().subscribe(response=>{
      console.log(response)
      if(response) {
        this.mealList = response;
      } else {
        this.mealList = null;
      }
    })
  }

  public switchView(switchOption:string) {
    if(switchOption === SwitchOptions.FORM) {
      this.isHistory = false;
    } else {
      this.isHistory = true;
    }
  }

  public onSubmit() {
    let userIds = JSON.parse(localStorage.getItem('user')).userId;
    if(this.picture && userIds) {
      let mealData:Meal = {
        userId:userIds,
        name:this.addForm.controls.name.value,
        protein:this.addForm.controls.protein.value,
        carbohydrates:this.addForm.controls.carbohydrates.value,
        fat:this.addForm.controls.fat.value,
        kcal:this.addForm.controls.kcal.value,
        picture:this.picture,
        date:new Date().toISOString().slice(0, 10);
      }

      this.db.setMeal(mealData).subscribe(response=>{
        console.log(response)
        if(response) {
          alert('Posiłek został pomyślnie dodany');
          this.switchView('history');
        } else {
          alert('Nie udało się dodać posiłku');
        }
      });
    } else {
      alert('Nie udało się dodać posiłku');
    }
  }

  public addPhoto() {
    this.camera.getPicture(this.options).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      this.picture = null;
    });
  }

}
