import { Component } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { CryptocompareService } from '../api/cryptocompare.service';
import { Observable } from 'rxjs';
import { IonicSelectableComponent } from 'ionic-selectable';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  OBcryptos: Observable<any>;
  OBprices: Observable<any>;

  crypto: Object[];
  cryptos: any;
  Cryptos:any;

  CryptoPrice: Object[];
  CryptoPrices: any;

  Crypto1:any;
  Crypto2:any;

  SelectedSymbol1:string = null;
  SelectedSymbol2:string = null;

  fromCryptoNum:number = null;
  toCryptoNum:number = null;

  Transaction:any;
  Transactions = [];



  constructor(private cryptocompareService: CryptocompareService,private storage: StorageService) {

    this.OBcryptos = this.cryptocompareService.getAllCoins();
    this.OBcryptos.subscribe((data) => {
    this.crypto = data.Data;

      this.cryptos = Object.keys(this.crypto).map(key => ({ name: key }));
      // console.log(this.cryptos[0].type);
      console.log(this.cryptos);
      this.Cryptos = this.cryptos;

    });


 }

  onChange1(SelectedValue:any) {
    this.SelectedSymbol1 = SelectedValue.value.name;
    console.log(this.SelectedSymbol1);
    if(this.SelectedSymbol1!=null && this.SelectedSymbol2!=null)
    {
      this.getCrypto(this.SelectedSymbol1,this.SelectedSymbol2);
    }
  }
  onChange2(SelectedValue:any) {
    this.SelectedSymbol2 = SelectedValue.value.name;
    console.log(this.SelectedSymbol2);
    if(this.SelectedSymbol1!=null && this.SelectedSymbol2!=null)
    {
      this.getCrypto(this.SelectedSymbol1,this.SelectedSymbol2);
    }
  }

  getCrypto(Symbol1,Symbol2) {

    this.OBprices = this.cryptocompareService.getCoinInfo(Symbol1, Symbol2);
    this.OBprices.subscribe((data) => {
    this.CryptoPrice = data; 
    this.CryptoPrices = Object.keys(this.CryptoPrice ).map(key => ({ name: key, value: this.CryptoPrice[key] }));
    
    this.Crypto1 = this.CryptoPrices[0];
    this.Crypto2 = this.CryptoPrices[1];

    this.CalculateExchange()
    console.log(this.CryptoPrices);
    });

  }

  CalculateExchange()
  {
    console.log(this.Crypto1.value.USD);
    console.log(this.fromCryptoNum);
    console.log(this.Crypto2.value.USD);
    this.toCryptoNum = (this.Crypto1.value.USD * this.fromCryptoNum) / this.Crypto2.value.USD;
    console.log(this.toCryptoNum);
    return this.toCryptoNum;
  }


  createTransaction(){

    this.Transaction = JSON.stringify([{

      crypto1:this.Crypto1.name,
      crypto1Num: this.fromCryptoNum,
      crypto2:this.Crypto2.name,
      crypto2Num:this.toCryptoNum

    }]);
    this.setStorage(this.Crypto1.name + " + " + this.Crypto2.name);
  }


  setStorage(name:string) {
    localStorage.setItem(name, this.Transaction);
    console.log("saved");
  }


}
