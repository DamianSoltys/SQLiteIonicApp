import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectDropDownComponent } from 'ngx-select-dropdown';
import { FormBuilder } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';

export enum SelectOption {
  BMI = 'Kalkulator BMI',
  KCAL = 'Kalkulator spalania kalorii',
  WEIGHT = 'Kalkulator idealnej wagi'
}
export interface ShowOptions {
  BMI:boolean,
  KCAL:boolean,
  WEIGHT:boolean
}
export interface Product {
   productId?:number,
   productName:string,
   carbs:number,
   protein:number,
   fat:number,
   kcal:number 
}

export interface CalulateData {
  protein:number,
  carbs:number,
  kcal:number,
  fat:number,
}

export interface History {
  calculateId?:number,
  userId:number,
  calculateName:string,
  BMI:number,
  weight:number,
  height:number,
  age:number,
  carbs:number,
  protein:number,
  fat:number,
  kcal:number,
  date:string,
}
@Component({
  selector: 'app-calculators',
  templateUrl: './calculators.component.html',
  styleUrls: ['./calculators.component.scss'],
})
export class CalculatorsComponent implements OnInit {
  public calculatorOptions = [
    'Kalkulator BMI',
    'Kalkulator spalania kalorii',
    'Kalkulator idealnej wagi'
  ];
  public productOptions = [

  ];

  public showOptions:ShowOptions = {
    BMI:false,
    KCAL:false,
    WEIGHT:false
  }
  public config = {

  };
  public bmiForm = this.fb.group({
    height:[null],
    weight:[null]
  });
  public kcalForm = this.fb.group({
    product:[null],
  });
  public weightForm = this.fb.group({
    height:[null],
    age:[null]
  });

  public productList:Product[];
  public productSelectList:Product[];
  public calculatedData:CalulateData;
  public BMI:number;
  public bmiText:string;
  public idealWeight:number;
  @ViewChild('calculatorSelect',{static: false}) calcSelect:SelectDropDownComponent;
  @ViewChild('productSelect',{static: false}) prodSelect:SelectDropDownComponent;
  constructor(private fb:FormBuilder,private db:DatabaseService) { }

  ngOnInit() {}

  public productChanged($event) {

  }
  private getProductData() {
    this.db.getProducts().subscribe((data:[])=>{
      if(data) {
        this.productList = data;
        this.productList.forEach((element:Product) => {
          this.productOptions = [...this.productOptions,element.productName];
        });
      }
    })
  }
  public setHistoryData(historyData:History) {
    this.db.setHistory(historyData).subscribe(response=>{
      if(response) {
        alert('Pomyślnie dodano do historii');
      } else {
        alert('Nie udało się dodać danych');
      }
    });
  }
  public onSubmit(type:string) {
    let userIds = JSON.parse(localStorage.getItem('user')).userId;
    switch(type) {
      case 'bmi':{
        this.calculateBMI();
        let historyData:History = {
          userId:userIds,
          calculateName:'BMI',
          BMI:Number(this.BMI.toFixed(2)),
          weight:this.bmiForm.controls.weight.value,
          height:this.bmiForm.controls.height.value,
          age:0,
          carbs:0,
          protein:0,
          fat:0,
          kcal:0,
          date:new Date().toISOString().slice(0, 10),
        }
        this.setHistoryData(historyData);
        
        break;
      }
      case 'kcal':{
        let historyData:History = {
          userId:userIds,
          calculateName:'KCAL',
          BMI:0,
          weight:0,
          height:0,
          age:0,
          carbs:this.calculatedData.carbs,
          protein:this.calculatedData.protein,
          fat:this.calculatedData.fat,
          kcal:this.calculatedData.kcal,                           
          date:new Date().toISOString().slice(0, 10),
        }
        this.setHistoryData(historyData);
        break;
      }
      case 'weight':{
        this.calculateIdealWeight();
        let historyData:History = {
          userId:userIds,
          calculateName:'WEIGHT',
          BMI:0,
          weight:this.idealWeight,
          height:this.weightForm.controls.height.value,
          age:this.weightForm.controls.age.value,
          carbs:0,
          protein:0,
          fat:0,
          kcal:0,
          date:new Date().toISOString().slice(0, 10),
        }
        this.setHistoryData(historyData);
        break;
      }
    }
  }

  public addProduct() {
    this.productList.forEach(product=>{
      if(product.productName == this.prodSelect.value) {
        if(!this.productSelectList) {
          this.productSelectList = [];
        }

        this.productSelectList.push(product);
        if(!this.calculatedData) {
          this.calculatedData = {
            fat:product.fat,
            kcal:product.kcal,
            protein:product.protein,
            carbs:product.carbs
          }
        } else {
          this.calculatedData = {
            fat:this.calculatedData.fat + product.fat,
            kcal:this.calculatedData.kcal + product.kcal,
            protein:this.calculatedData.protein + product.protein,
            carbs:this.calculatedData.carbs + product.carbs
          }
        }
      }
    })
  }

  public calculateBMI() {
    this.BMI = this.bmiForm.controls.weight.value/((this.bmiForm.controls.height.value/100)*(this.bmiForm.controls.height.value/100));
    if(this.BMI <= 18.5){
      this.bmiText = 'niedowage';
    } else if(this.BMI > 18.5 && this.BMI <= 24.9){
      this.bmiText = 'wagę prawidłową';
    } if(this.BMI > 25 && this.BMI <= 29.9){
      this.bmiText = 'nadwagę';
    } else {
      this.bmiText = 'otyłość';
    }

  }

  public calculateIdealWeight() {
    this.idealWeight = ((this.weightForm.controls.height.value-100) + (this.weightForm.controls.age.value/10)) *0.9;
  }

  public selectionChanged($event) {
    switch(this.calcSelect.value) {
      case SelectOption.BMI:{
        this.showOptions = {
          BMI:true,
          KCAL:false,
          WEIGHT:false,
        }
        break;
      }
      case SelectOption.KCAL:{
        this.showOptions = {
          BMI:false,
          KCAL:true,
          WEIGHT:false,
        }
        this.getProductData();
        break;
      }
      case SelectOption.WEIGHT:{
        this.showOptions = {
          BMI:false,
          KCAL:false,
          WEIGHT:true,
        }
        break;
      }
    }
  }
}
