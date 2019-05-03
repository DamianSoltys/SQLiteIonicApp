import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';


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
    private dbReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    telephones = new BehaviorSubject([]);


  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.plt.ready().then(() => {

      this.sqlite.create({
        name: 'telephones.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.seedDatabase();
      });
    });

  }

  seedDatabase() {

    this.http.get('assets/seed.sql', {responseType: 'text'}).subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql).then(() => {
        this.loadTelephones();
        this.dbReady.next(true);
      }).catch(e => console.error(e));
    });
  }

  getDatabaseState() {

    return this.dbReady.asObservable();
  }

  getTelephones(): Observable<TelInfo[]> {

    return this.telephones.asObservable();
  }

  loadTelephones() {
      return this.database.executeSql('SELECT * FROM telephone', []).then(data => {
        // tslint:disable-next-line:prefer-const
        let telephones: TelInfo[] = [];

        if (data.rows.length > 0) {
         for (let i = 0 ; i < data.rows.length; i++) {
            telephones.push({
              telId: data.rows.item(i).telId,
              manufacturer: data.rows.item(i).manufacturer,
              model: data.rows.item(i).model,
              url: data.rows.item(i).url,
              android: data.rows.item(i).android
            });

         }
       }
        this.telephones.next(telephones);
        });

  }

  addTelephone(manufacturer, model, url, android) {
     // tslint:disable-next-line:prefer-const
     let data = [manufacturer, model, url, android];
     return this.database.executeSql('INSERT INTO telephone(manufacturer,model,url,android) VALUES(?,?,?,?)', data).then(data => {
        this.loadTelephones();
        console.log('telephone added');
        console.log(this.telephones);

     });
  }
  getTelephone(telId): Promise<TelInfo> {
    return this.database.executeSql('SELECT * FROM telephone WHERE telId = ?', [telId]).then(data => {
      return {
        telId: data.rows.item(0).telId,
        manufacturer: data.rows.item(0).manufacturer,
        model: data.rows.item(0).model,
        url: data.rows.item(0).url,
        android: data.rows.item(0).android
      };
    });
  }
  deleteTelephone(telId) {
return this.database.executeSql('DELETE FROM telephone WHERE telId = ?', [telId]).then(() => {
  this.loadTelephones();
  console.log(this.telephones);
});
  }
  updateTelephone(tel: TelInfo) {

    // tslint:disable-next-line:prefer-const
    let data = [tel.telId, tel.manufacturer, tel.model, tel.url, tel.android];
    return this.database.executeSql
    (`UPDATE telephone SET telId = ?,manufacturer = ?,model = ?,url = ?,android = ? WHERE telId = ${tel.telId}`, data).
    then(data => {
      this.loadTelephones();
      console.log('telephone updated');
    });
  }

}
