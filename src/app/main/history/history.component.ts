import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { History } from '../calculators/calculators.component';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  public historyList:History[] = [];
  constructor(private db:DatabaseService,private toastCtr:ToastsService) { }

  ngOnInit() {
    this.getHistoryData();

    this.db.getHistoryData.subscribe(response=>{
      if(response) {
        this.getHistoryData();
      }
    });
  }

  ionViewWillEnter() {
    //this.getHistoryData();
  }

  public getHistoryData() {
    this.db.getHistory().subscribe(response=>{
      console.log(response);
      if(response) {
        this.historyList = response;
      }else {
        this.toastCtr.showToast('Brak historii');
      }
    })
  }
}
