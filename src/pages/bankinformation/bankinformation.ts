import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,Events, ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
/**
 * Generated class for the BankinformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bankinformation',
  templateUrl: 'bankinformation.html',
})
export class BankinformationPage {
  credit: any;
  bankcode: any;
  user: any;
  random_string: any;
  token:any;
  trans_type:any;
  source = 'online';
  paystack_key="pk_live_1025562fde8dcba6bab1eff8291e46e992d57769";
  constructor(public toastCtrl:ToastController, public navCtrl: NavController,
    public navParams: NavParams, public viewCtrl: ViewController,public storage: Storage,
    public events:Events,) {

    this.credit = navParams.get('credit');
    this.bankcode = navParams.get('bankcode');
    this.source = navParams.get('source');
    this.random_string = this.randomString(16, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');
    this.storage.get('user').then((value) => {
      this.user = value;
    });
    this.storage.get('token').then((value) => {
      this.token=value;
    });
    this.trans_type = '2';
    this.events.subscribe('finalizingfunding:done', (result) => {
      this.dismiss();
    });
  }
  randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BankinformationPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  doCredit() {

    let funding = {
      amount: this.credit,
      reference: this.random_string,
      transaction_reference: '',
      user_id: this.user.id,
      token: this.token,
      trans_type: this.trans_type
    }
    this.events.publish('fundwallet:done', funding);
    this.dismiss();
  }
  paymentDone(event){
    let funding = {
      amount:this.credit,
      reference:event.reference,
      transaction_reference:event.trxref,
      user_id:this.user.id,
      token:this.token,
      trans_type:this.trans_type
    }
    this.events.publish('fundwallet:done',funding);
    this.dismiss();
  }
  paymentCancel() {
    this.presentToast("Payment Cancelled")
    this.dismiss();
  }
  presentToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
}
