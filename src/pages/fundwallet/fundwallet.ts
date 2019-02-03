import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,ToastController,Events, ModalController, Modal } from 'ionic-angular';

import { ViewChild, OnInit } from '@angular/core';
import { IonDigitKeyboardCmp, IonDigitKeyboardOptions } from '../../components/ion-digit-keyboard';
 
import {UserDataProvider} from '../../providers/user-data/user-data';
import { Storage } from '@ionic/storage';
import { AlertController,IonicPage } from 'ionic-angular';
/**
 * Generated class for the FundwalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fundwallet',
  templateUrl: 'fundwallet.html',
})
export class FundwalletPage {
  @ViewChild(IonDigitKeyboardCmp) keyboard;
  how_much_much = "0";
  finalizingPayment = false;
  paystack_key="pk_live_1025562fde8dcba6bab1eff8291e46e992d57769";
  public keyboardSettings: IonDigitKeyboardOptions = {
    align: 'center',
    //width: '85%',
    visible: true,
    leftActionOptions: {
      iconName: 'ios-backspace-outline',
      fontSize: '1.4em',
      hidden: true
    },
    rightActionOptions: {
      //iconName: 'ios-checkmark-circle-outline',
      text: '.',
      fontSize: '1.3em'
    },
    roundButtons: false,
    showLetters: true,
    swipeToHide: true,
    // Available themes: IonDigitKeyboard.themes
    theme: 'ionic'
  };
  random_string:any;
  user:any;
  token:any;
  trans_type:any;
  trans_detail:any;
  trans_pin:any;
  para:any;
  constructor( private alertCtrl: AlertController,
    public events:Events,public storage: Storage,
    public toastCtrl: ToastController,public userData: UserDataProvider,
    public navCtrl: NavController, public viewCtrl: ViewController, 
    public navParams: NavParams, public modalCtrl: ModalController) {
    this.random_string = this.randomString(16,'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');
    this.storage.get('user').then((value) => {
      this.user = value;
    });
    this.storage.get('token').then((value) => {
      this.token=value;
    });
    this.events.subscribe('finalizingfunding:done', (result) => {
      this.dismiss();
    });
    this.trans_type = navParams.get('trans_type');
    this.trans_detail = navParams.get('trans_detail')
    this.para = navParams.get('para');
  }
  displayNetworkUpdate(connectionState: string) {


  }
  ngOnInit(): void {
    // Subscriber way     
    this.keyboard.onClick.subscribe((key) => {
      console.log('From subscriber: ', key);
    });
  }
  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      subTitle: 'Enter your pin to confirm transaction',
      inputs: [
        {
          name: 'password',
          placeholder: 'Pin',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: data => {
           
           if(this.how_much_much=="0"){
             this.presentToast("Please enter amount greater than zero.")
           }else{ 
             this.trans_pin=data.password;
             this.doWithdrawal();
           }
          }
        }
      ]
    });
    alert.present();
  }
  randomString(len, charSet) {
      charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var randomString = '';
      for (var i = 0; i < len; i++) {
          var randomPoz = Math.floor(Math.random() * charSet.length);
          randomString += charSet.substring(randomPoz,randomPoz+1);
      }
      return randomString;
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  public showKeyboard() {
    this.keyboard.show();
  }
  asNumber(value){
    return parseInt(value);
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
  doWithdrawal(){
    this.finalizingPayment = true; 
    this.keyboard.show = false;
    let funding = {
      amount:this.how_much_much,
      reference:this.random_string,
      transaction_reference:"",
      user_id:this.user.id,
      token:this.token,
      trans_type:this.trans_type,
      trans_pin:this.trans_pin
    }
    this.events.publish('fundwallet:done',funding);
    this.dismiss();
  }
  paymentDone(event){
    this.finalizingPayment = true; 
    this.keyboard.show = false;
    let funding = {
      amount:this.how_much_much,
      reference:event.reference,
      transaction_reference:event.trxref,
      user_id:this.user.id,
      token:this.token,
      trans_type:this.trans_type
    }
    this.events.publish('fundwallet:done',funding);
    this.dismiss();
  }
  // Event way
  public numberClick(key: number) { 
    if (this.how_much_much == '0') {
      this.how_much_much = "";

    }
    this.how_much_much += key;
  }
  public hideKeyboard() {
    // this.keyboard.hide();
    this.how_much_much = "0";

  }
  finalizeCredit(){
    this.storage.get('user').then((value) => { 
      let modal = this.modalCtrl.create('BankinformationPage',{credit:this.how_much_much,bankcode:value.bankcode,source:'deposit'});
      modal.present();
    });
    
  }
  finishingCredit(){
    this.storage.get('user').then((value) => { 
      let modal = this.modalCtrl.create('BankinformationPage',{credit:this.how_much_much,bankcode:value.bankcode,source:'online'});
      modal.present();
    });
    
  }
}
