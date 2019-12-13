import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { History } from '../calculators/calculators.component';
import { ToastsService } from 'src/app/services/toasts.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  public historyList:History[] = [];
  constructor(private db:DatabaseService,private toastCtrl:ToastsService,private platform:Platform) { }

  ngOnInit() {

    this.platform.ready().then(()=>{
      this.getHistoryData();
      this.db.getHistoryData.subscribe(response=>{
        if(response) {
          this.getHistoryData();
        }
      });
    });
  }

  // ionViewWillEnter() {
  //   if(!this.historyList.length) {
  //     this.getHistoryData();
  //   }
  // }

  public deleteHistory(historyId:any) {
    let userId = this.db.getUser().userId;
    if (userId) {

      this.db.deleteHistory(historyId,userId).subscribe(response=>{
        if(response) {
          this.toastCtrl.showToast('Usunięcie się powiodło');
        } else {
          this.toastCtrl.showToast('Usunięcie się niepowiodło');
        }
      });

    }else {
      this.toastCtrl.showToast('Użytkownik nie jest zalogowany!');
    }
  }

  public getHistoryData() {
    this.db.getHistory().subscribe(response=>{
      console.log(response)
      if(response) {
        this.historyList = response;
      } else {
        this.toastCtrl.showToast('Brak historii');
        this.historyList = [];
      }
    })
  }
}
