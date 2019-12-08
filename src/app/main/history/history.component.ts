import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { History } from '../calculators/calculators.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  public historyList:History[] = [];
  constructor(private db:DatabaseService) { }

  ngOnInit() {
    this.getHistoryData();
  }

  public getHistoryData() {
    this.db.getHistory().subscribe(response=>{
      console.log(response);
      if(response) {
        this.historyList = response;
      }else {
        alert('Brak historii');
      }
    })
  }
}
