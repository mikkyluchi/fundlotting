import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ConstantsProvider } from '../constants/constants';
import 'rxjs/add/operator/map';
/*
  Generated class for the ProductDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductDataProvider {

  constructor(public http: HttpClient, public events: Events,
    public storage: Storage, public constant: ConstantsProvider) {
      this.api_base = this.constant.read('azure');
  }
  perpage: number = 50;
  public api_base: string;
   
  load(start: number = 0) {

    return new Promise(resolve => {
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); 
      this.http.post(this.api_base + 'products/products', this.serializeParams({ start: start }),{ headers: headers })
        .subscribe(data => {

          resolve(data);

        });
    });
  }
  loadStock() {
 
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded'); 
    return this.http.post(this.api_base + 'products/stock', this.serializeParams({ start: 0 }),{ headers: headers });
  }
  loadStocks(filter:any) {
 
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded'); 
    return this.http.post(this.api_base + 'products/stock', this.serializeParams({ start: 0,filter:filter }),{ headers: headers });
  }
  loadStockss(filter:any) {
 
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json'); 
    return this.http.post(this.api_base + 'products/stock', { start: 0,filter:filter },{ headers: headers });
  }
  serializeParams(obj) {
    let str = "";
    for (var key in obj) {
      if (str != "") {
        str += "&";
      }
      str += key + "=" + obj[key];
    }
    return str;
  }
}
