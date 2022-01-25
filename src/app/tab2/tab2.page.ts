import { Component } from '@angular/core';
import { CryptocompareService } from '../api/cryptocompare.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  OBcryptos: Observable<any>;

  crypto: Object[];
  cryptos: any;

  CryptoCompareUrl:string = "https://www.cryptocompare.com/";

  constructor(private cryptocompareService: CryptocompareService) {

    this.OBcryptos = this.cryptocompareService.getMarketInfo();
    this.OBcryptos.subscribe((data) => {
    this.crypto = data.Data;

      this.cryptos = Object.keys(this.crypto).map(key => ({ coinInfo: this.crypto[key].CoinInfo, value: this.crypto[key].RAW , display: this.crypto[key].DISPLAY}));
      // console.log(this.cryptos[0].type);
      console.log(this.cryptos);
      console.log(this.cryptos[0].coinInfo.Name);

    });
  }

}
