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
    'test'
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
  @ViewChild('calculatorSelect',{static: false}) calcSelect:SelectDropDownComponent;
  @ViewChild('productSelect',{static: false}) prodSelect:SelectDropDownComponent;
  constructor(private fb:FormBuilder,private db:DatabaseService) { }

  ngOnInit() {}

  public productChanged($event) {

  }
  public onSubmit(type:string) {
    switch(type) {
      case 'bmi':{
        alert(type);
        break;
      }
      case 'kcal':{

        break;
      }
      case 'weight':{

        break;
      }
    }
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
