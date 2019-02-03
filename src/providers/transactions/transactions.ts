import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ConstantsProvider } from '../constants/constants';
import 'rxjs/add/operator/map';
/*
  Generated class for the TransactionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TransactionsProvider {

  constructor(public http: HttpClient, public events: Events,
    public storage: Storage, public constant: ConstantsProvider) {
    this.api_base = this.constant.read('azure');
    
  }
  perpage:number = 50;
  public api_base: string;  
  
  load(login) {
    
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); 
    return this.http.post(this.api_base + 'wallet/transactions', this.serializeParams(login),   { headers: headers });
  };
  loadOrderItems(login) {
    
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); 
    return this.http.post(this.api_base + 'products/loadOrderItems', this.serializeParams(login),   { headers: headers });
  };
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
