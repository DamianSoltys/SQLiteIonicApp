import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { User } from '../register/register.component';
import { Meal } from '../main/food-list/food-list.component';
import { Product, History } from '../main/calculators/calculators.component';
import { ToastsService } from './toasts.service';

export interface TelInfo {
  telId: number;
  manufacturer: string;
  model: string;
  url: string;
  android: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  public getMealData = new Subject<any>();
  public getHistoryData = new Subject<any>();
  public getProductData = new Subject<any>();
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  telephones = new BehaviorSubject([]);

  constructor(
    private plt: Platform,
    private sqlitePorter: SQLitePorter,
    private sqlite: SQLite,
    private http: HttpClient,
    private toastCtrl: ToastsService
  ) {
    this.plt.ready().then(() => {
      this.sqlite
        .create({
          name: 'fitApp.db',
          location: 'default'
        })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
        });
    });
  }

  private seedDatabase() {
    this.http.get('assets/seed.sql', { responseType: 'text' }).subscribe(sql => {
      this.sqlitePorter
        .importSqlToDb(this.database, sql)
        .then(() => {
          //this.loadTelephones();
          this.dbReady.next(true);
        })
        .catch(e => console.error(e));
    });
  }

  public registerUser(userData: User) {
    let subject = new Subject<any>();
    let data = [userData.userName, userData.password, userData.email];

    this.database.executeSql(`INSERT INTO user(userName,password,email) VALUES(?,?,?)`, data).then(
      data => {
        console.log(data);
        if(data.rowsAffected>=1) {
          subject.next(true);
        } else {
          subject.next(false);
        }
      },
      reject => {
        subject.next(false);
      }
    );

    return subject;
  }

  public getUser() {
    let userData = JSON.parse(localStorage.getItem('user'));
    if(userData) {
        return userData;
    } else {
        return false;
    }
}

  public loginUser(userData: User) {
    let subject = new Subject<any>();
    let userName = userData.userName;

    this.database.executeSql(`SELECT * FROM user WHERE userName = ?`, [userName]).then(
      data => {
        if (data.rows.length > 0) {
          let user: User = {
            userId: data.rows.item(0).userId,
            userName: data.rows.item(0).userName,
            email: data.rows.item(0).email,
            password: data.rows.item(0).password
          };

          if (user.password == userData.password) {
            subject.next(user);
            localStorage.setItem('user', JSON.stringify(user));
          } else {
            subject.next(false);
          }
        } else {
          subject.next(false);
        }
      },
      reject => {
        console.log(reject);
        subject.next(false);
      }
    );

    return subject;
  }

  public getHistory() {
    let subject = new Subject<any>();
    this.database.executeSql('SELECT * FROM calculateHistory', []).then(
      data => {
        let history: History[] = [];

        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            history.push({
              calculateId: data.rows.item(i).calculateId,
              userId: data.rows.item(i).userId,
              calculateName: data.rows.item(i).calculateName,
              BMI: data.rows.item(i).BMI,
              weight: data.rows.item(i).userWeight,
              height: data.rows.item(i).userHeight,
              age: data.rows.item(i).age,
              carbs: data.rows.item(i).carbs,
              protein: data.rows.item(i).protein,
              fat: data.rows.item(i).fat,
              kcal: data.rows.item(i).kcal,
              date: data.rows.item(i).historyDate
            });
          }
          subject.next(history);
        } else {
          subject.next(false);
        }
      },
      reject => {
        subject.next(false);
      }
    );
    return subject;
  }

  public deleteTableData(tableName) {
    return this.database.executeSql(`DELETE FROM ${tableName}`);
  }

  public getUsers() {
    return this.database.executeSql(`SELECT * FROM user`, []).then(users => {
      if (users.rows.length > 0) {
        for (let i = 0; i < users.rows.length; i++) {
          alert(users.rows.item(i).userName);
        }
      }
    });
  }

  public getMeals() {
    let subject = new Subject<any>();
    this.database.executeSql('SELECT * FROM meal', []).then(
      data => {
        let meals: Meal[] = [];

        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            meals.push({
              mealId: data.rows.item(i).mealId,
              userId: data.rows.item(i).userId,
              name: data.rows.item(i).mealName,
              carbohydrates: data.rows.item(i).carbs,
              protein: data.rows.item(i).protein,
              kcal: data.rows.item(i).kcal,
              fat: data.rows.item(i).fat,
              picture: data.rows.item(i).picture,
              date: data.rows.item(i).date
            });
          }
          subject.next(meals);
        } else {
          subject.next(false);
        }
      },
      reject => {
        subject.next(false);
      }
    );
    return subject;
  }

  public getProducts() {
    let subject = new Subject<any>();
    this.database.executeSql('SELECT * FROM product', []).then(
      data => {
        let products: Product[] = [];

        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            products.push({
              productName: data.rows.item(i).productName,
              carbs: data.rows.item(i).carbs,
              protein: data.rows.item(i).protein,
              kcal: data.rows.item(i).kcal,
              fat: data.rows.item(i).fat
            });
          }
          subject.next(products);
        } else {
          subject.next(false);
        }
      },
      reject => {
        subject.next(false);
      }
    );
    return subject;
  }

  public setMeal(mealData: Meal) {
    let subject = new Subject<any>();
    let data = Object.values(mealData);

    if (mealData.userId) {
      this.database
        .executeSql(
          `INSERT INTO meal(userId,mealName,carbs,protein,fat,kcal,picture,date) VALUES (?,?,?,?,?,?,?,?)`,
          data
        )
        .then(
          data => {
          if(data.rowsAffected>=1) {
            this.getMealData.next(true);
            this.getHistoryData.next(true);
            subject.next(true);
          }else {
            subject.next(false);
          }

          },
          reject => {
            console.log(reject);
            subject.next(false);
          }
        );
    } else {
      console.log('Brak userId');
      subject.next(false);
    }

    return subject;
  }

  public setHistory(historyData: History) {
    let subject = new Subject<any>();
    let data = Object.values(historyData);
    if (historyData.userId) {
      this.database
        .executeSql(
          `INSERT INTO calculateHistory(userId,calculateName,BMI,userWeight,userHeight,age,carbs,protein,fat,kcal,historyDate) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
          data
        )
        .then(
          data => {
            if(data.rowsAffected>=1) {
              this.getHistoryData.next(true);
              subject.next(true);
            } else {
              subject.next(false);
            }
            
          },
          reject => {
            console.log(reject);
            subject.next(false);
          }
        );
    } else {
      subject.next(false);
    }

    return subject;
  }

  public deleteMeal(mealId: number,userId:number) {
    let subject = new Subject<any>();
    this.database.executeSql('DELETE FROM meal WHERE mealId = ? AND userId = ?', [mealId,userId]).then((data) => {
      this.getMealData.next(true);
      if(data.rowsAffected>=1) {
        subject.next(true);
      } else {
        subject.next(false);
      }
    },error=>{
      subject.next(false);
    });
    return subject;
  }

  public deleteHistory(calculateHistoryId: number,userId:number) {
    let subject = new Subject<any>();
    this.database.executeSql('DELETE FROM calculateHistory WHERE calculateId = ? AND userId = ?', [calculateHistoryId,userId]).then((data) => {
      this.getHistoryData.next(true);
      if(data.rowsAffected>=1) {
        subject.next(true);
      } else {
        subject.next(false);
      }
    },error=>{
      subject.next(false);
    });
    return subject;
  }

  public getDatabaseState() {
    return this.dbReady;
  }
}
