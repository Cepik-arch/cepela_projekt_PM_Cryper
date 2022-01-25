import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class CryptocompareService {

  private api:string="d29be25e031c74b4dcc98284407a958ba361a43f69d3e4c3e47baf646df5fce7";
  constructor(private http: HttpClient) {}

  public getAllCoins()
  {
  return this.http.get('https://min-api.cryptocompare.com/data/blockchain/list?&api_key=' + this.api);
  }
  
  public getCoinInfo(symbol1:string,symbol2:string)
  {
  return this.http.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms='+ symbol1 +',' + symbol2 + '&tsyms='+ symbol2 +',' + symbol1 + ',USD');
  }

  public getMarketInfo()
  {
  return this.http.get('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD');
  }
}
