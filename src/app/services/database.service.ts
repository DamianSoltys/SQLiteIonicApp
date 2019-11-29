import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { User } from '../register/register.component';

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
    private dbReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );

    telephones = new BehaviorSubject([]);

    constructor(
        private plt: Platform,
        private sqlitePorter: SQLitePorter,
        private sqlite: SQLite,
        private http: HttpClient
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
        this.http
            .get('assets/seed.sql', { responseType: 'text' })
            .subscribe(sql => {
                this.sqlitePorter
                    .importSqlToDb(this.database, sql)
                    .then(() => {
                        //this.loadTelephones();
                        this.dbReady.next(true);
                    })
                    .catch(e => console.error(e));
            });
    }

    public registerUser(userData:User) {
        let subject = new Subject<any>();
        let data = [userData.userName,userData.password,userData.email];
        
        this.database
            .executeSql(
                `INSERT INTO user(userName,password,email) VALUES(?,?,?)`,
                data
            )
            .then(data => {
                if(data) {
                    this.getUsers();
                    subject.next(true);
                } else {
                    subject.next(false);
                }
            });

        return subject;
    }

    public loginUser(userData:User) {
        let subject = new Subject<any>();
        let userName = userData.userName;
    
        this.database
            .executeSql(`SELECT * FROM user WHERE userName= ?`, [userName])
            .then(data => {
                if (data) {
                    let user:User = {
                        userName:data.rows.item(0).userName,
                        email:data.rows.item(0).email,
                        password:data.rows.item(0).password,
                    }

                    if(user.password == userData.password) {
                        subject.next(user);
                    } else {
                        subject.next(false);
                    }
                    
                } else {
                   subject.next(false);
                }
            });

            return subject;
    }

    public getProducts() {
        return this.database
            .executeSql(`SELECT * FROM product`, [])
            .then(products => {
                if (products.rows.length > 0) {
                    for (let i = 0; i < products.rows.length; i++) {
                        //ladowanko ehhe
                    }
                }
            });
    }

    public deleteTableData(tableName) {
        return this.database.executeSql(`DELETE FROM ${tableName}`);
    }

    public getUsers() {
        return this.database.executeSql(`SELECT * FROM user`,[]).then(users=>{
            if(users.rows.length > 0) {
                for(let i = 0; i < users.rows.length; i++) {
                    alert(users.rows.item(i).userName);
                }
            }
        });
    }

    public setProduct(productData) {
        let data = [];
        return this.database
            .executeSql(
                `INSERT INTO product(productName,wegle,bialko,tluszcze,kcal) VALUES (?,?,?,?,?)`,
                data
            )
            .then(data => {
                //costam loadproducts
            });
    }

    public getDatabaseState() {
        return this.dbReady;
    }

    public getTelephones(): Observable<TelInfo[]> {
        return this.telephones.asObservable();
    }

    public loadTelephones() {
        return this.database
            .executeSql('SELECT * FROM telephone', [])
            .then(data => {
                // tslint:disable-next-line:prefer-const
                let telephones: TelInfo[] = [];

                if (data.rows.length > 0) {
                    for (let i = 0; i < data.rows.length; i++) {
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

    public addTelephone(manufacturer, model, url, android) {
        // tslint:disable-next-line:prefer-const
        let data = [manufacturer, model, url, android];
        return this.database
            .executeSql(
                'INSERT INTO telephone(manufacturer,model,url,android) VALUES(?,?,?,?)',
                data
            )
            .then(data => {
                this.loadTelephones();
                console.log('telephone added');
                console.log(this.telephones);
            });
    }

    public getTelephone(telId): Promise<TelInfo> {
        return this.database
            .executeSql('SELECT * FROM telephone WHERE telId = ?', [telId])
            .then(data => {
                return {
                    telId: data.rows.item(0).telId,
                    manufacturer: data.rows.item(0).manufacturer,
                    model: data.rows.item(0).model,
                    url: data.rows.item(0).url,
                    android: data.rows.item(0).android
                };
            });
    }

    public deleteTelephone(telId) {
        return this.database
            .executeSql('DELETE FROM telephone WHERE telId = ?', [telId])
            .then(() => {
                this.loadTelephones();
                console.log(this.telephones);
            });
    }

    public updateTelephone(tel: TelInfo) {
        // tslint:disable-next-line:prefer-const
        let data = [
            tel.telId,
            tel.manufacturer,
            tel.model,
            tel.url,
            tel.android
        ];
        return this.database
            .executeSql(
                `UPDATE telephone SET telId = ?,manufacturer = ?,model = ?,url = ?,android = ? WHERE telId = ${tel.telId}`,
                data
            )
            .then(data => {
                this.loadTelephones();
                console.log('telephone updated');
            });
    }
}
