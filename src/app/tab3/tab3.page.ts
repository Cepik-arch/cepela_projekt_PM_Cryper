import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import {  NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})


export class Tab3Page {


  Crypto:any;

  Transactions:any[] = [];

  result: any;

  constructor(private storage: StorageService) {
    this.getStorage()

  }

  getStorage() {
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
      this.result = localStorage.getItem(localStorage.key(i)).toString();
      this.Transactions.push(JSON.parse(this.result));
    }
    this.Transactions = Object.keys(this.Transactions).map(key => ({ name: key, value: this.Transactions[key] }));
  }

  delete() {
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
      localStorage.removeItem(localStorage.key(i));
    }
  }
  refresh() {
    window.location.reload();
  }

}