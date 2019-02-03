import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ConstantsProvider } from '../constants/constants';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserDataProvider {

  constructor(public http: HttpClient, public events: Events,
    public storage: Storage, public constant: ConstantsProvider) {
    this.api_base = this.constant.read('azure');
    this.listenToLoginEvents();
  }
  public api_base: string;
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_USER_ONBOARDED = 'hasUserOnboarded';
  HAS_SET_PIN = 'hasSetPin';
   
   
  getUserProfile(): Promise<string> {
    return this.storage.get('user').then((value) => {
      return value;
    });
  };
  listenToLoginEvents() {

    this.events.subscribe('onboarding:skipped', () => {
      this.storage.set(this.HAS_USER_ONBOARDED, true);
    });
    this.events.subscribe('logout:user', () => {
      this.storage.remove(this.HAS_LOGGED_IN);
      this.storage.remove('user');
      this.storage.remove('token');
      this.events.publish('user:logout');
    });
    this.events.subscribe('onboarding:completed', () => {
      this.storage.set(this.HAS_USER_ONBOARDED, true);
      this.storage.get('user').then((value) => {

        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); 
        return this.http.post(this.api_base + 'auth/update_user', this.serializeParams(value), { headers: headers });
      });
    });
    this.events.subscribe('fundwallet:done', (funding) => {
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); 
      this.http.post(this.api_base + 'wallet/fundwallet', this.serializeParams(funding),  { headers: headers }).subscribe(data => {
         this.events.publish('finalizingfunding:done',data);
      });
    });
    this.events.subscribe('onboarding:completed', () => {
      this.storage.set(this.HAS_USER_ONBOARDED, true);
      this.storage.get('user').then((value) => {

        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); 
        return this.http.post(this.api_base + 'auth/update_user', this.serializeParams(value),  { headers: headers });
      });
    });
  }
  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('user');
    this.storage.remove('token');
    this.storage.remove('wallet_summary');
    this.events.publish('user:logout');
  };
  login(login: any) { 
    // let headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/x-www-form-urlencoded'); 
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); 
    
    return this.http.post(this.api_base + 'auth/login', this.serializeParams(login), { headers: headers });
  };
  doRefresh(login: any) {
    
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); 
    return this.http.post(this.api_base + 'wallet/doRefresh', this.serializeParams(login),  { headers: headers });
  };
  getDashboardData(login: any) {
    
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); 
    return this.http.post(this.api_base + 'wallet/getDashboardData', this.serializeParams(login),  { headers: headers });
  };
  updatepassword(login: any) {
    
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); 
    return this.http.post(this.api_base + 'auth/update_password', this.serializeParams(login),   { headers: headers });
  };
  sendFeedback(user:any,feedback:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); 
    return this.http.post(this.api_base + 'user/sendFeedback', this.serializeParams({user:JSON.stringify(user),feedback:JSON.stringify(feedback)}), { headers: headers });
  }
  fundwallet(transaction: any) {

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); 
    return this.http.post(this.api_base + 'wallet/fundwallet', this.serializeParams(transaction),   { headers: headers });
    
  };
  update(login: any) {
    
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); 
    return this.http.post(this.api_base + 'auth/update_user', this.serializeParams(login),   { headers: headers });
  };
  onBankUpdate(login: any) {
    
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); 
    return this.http.post(this.api_base + 'auth/update_bank', this.serializeParams(login),   { headers: headers });
  };
  updateToggles(login: any) {
    
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); 
    return this.http.post(this.api_base + 'auth/updateToggles', this.serializeParams(login),   { headers: headers });
  };
  hasBeenOnBoarded(): void {
    this.storage.set(this.HAS_USER_ONBOARDED, true);
  };
  signup(signup: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); 
    return this.http.post(this.api_base + 'auth/create_user', this.serializeParams(signup),   { headers: headers });
  };
  savePhoneNumber(phonenumber: any) {
    //get the user from the local storage
    
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); 
    return this.http.post(this.api_base + 'auth/save_phone', this.serializeParams(phonenumber),   { headers: headers });
  };
  saveAddress(address: any) {
    //get the user from the local storage
   
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); 
    return this.http.post(this.api_base + 'auth/save_address', this.serializeParams(address),   { headers: headers });
  };
  
  setSession(data: any): void {
    this.storage.set('token', data.token);
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.storage.set('user', data.user);
    this.storage.set('wallet_summary', data.wallet_summary);
    this.storage.set('hasSetPin', data.user.pin_set==='1'?true:false);
  };
  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };
  hasUserSetPin(): Promise<boolean> {
    return this.storage.get(this.HAS_SET_PIN).then((value) => {
      return value === true;
    });
  };
  hasUserOnboarded(): Promise<boolean> {
    return this.storage.get(this.HAS_USER_ONBOARDED).then((value) => {
      return value === true;
    });
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
  doSetNewPin(passcode:any,user:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); 
    return this.http.post(this.api_base + 'auth/doSetNewPin', this.serializeParams({passcode:passcode,id:user.id}),    { headers: headers });
  }
  placeOrder(pin:any,cart:any,user_id:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); 
    return this.http.post(this.api_base + 'products/placeOrder', this.serializeParams({pin:pin,cart:JSON.stringify(cart),user_id:user_id}),    { headers: headers });
  }
  getOrders(user_id:any,order_type:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); 
    return this.http.post(this.api_base + 'user/getOrders', this.serializeParams({user_id:user_id,order_type:order_type}),    { headers: headers });
  }
  getSales(user_id:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); 
    return this.http.post(this.api_base + 'user/getSales', this.serializeParams({user_id:user_id}),    { headers: headers });
  }
  loadMyStock(user_id:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); 
    return this.http.post(this.api_base + 'user/myStock', this.serializeParams({user_id:user_id}),    { headers: headers });
  }
  loadMySingleStock(user_id:any,product_id:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');  
    return this.http.post(this.api_base + 'user/loadMySingleStock', this.serializeParams({user_id:user_id,product_id:product_id}),    { headers: headers });
  }
}
