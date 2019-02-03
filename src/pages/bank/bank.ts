import { Component } from '@angular/core';
import { ViewController,ModalController,IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the BankPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bank',
  templateUrl: 'bank.html',
})
export class BankPage {
  banks=[{"BANK_ID":"1","BANK_NAME":"First City Monument Bank Plc","BANK_CODE":"214"},{"BANK_ID":"2","BANK_NAME":"Union Bank Plc","BANK_CODE":"032"},{"BANK_ID":"3","BANK_NAME":"Stanbic IBTC Bank Plc","BANK_CODE":"221"},{"BANK_ID":"4","BANK_NAME":"Sterling Bank Plc","BANK_CODE":"232"},{"BANK_ID":"6","BANK_NAME":"Paycom","BANK_CODE":"305"},{"BANK_ID":"8","BANK_NAME":"First Bank Nigeria Mobile","BANK_CODE":"309"},{"BANK_ID":"9","BANK_NAME":"Parkway","BANK_CODE":"311"},{"BANK_ID":"11","BANK_NAME":"Zenith Bank Mobile","BANK_CODE":"322"},{"BANK_ID":"13","BANK_NAME":"Aso Savings and Loans","BANK_CODE":"401"},{"BANK_ID":"14","BANK_NAME":"Access Bank Plc","BANK_CODE":"044"},{"BANK_ID":"15","BANK_NAME":"Afribank Nigeria Plc","BANK_CODE":"014"},{"BANK_ID":"16","BANK_NAME":"Diamond Bank Plc","BANK_CODE":"063"},{"BANK_ID":"17","BANK_NAME":"Ecobank Nigeria Plc","BANK_CODE":"050"},{"BANK_ID":"18","BANK_NAME":"Enterprise Bank Plc","BANK_CODE":"084"},{"BANK_ID":"19","BANK_NAME":"Fidelity Bank Plc","BANK_CODE":"070"},{"BANK_ID":"20","BANK_NAME":"First Bank Plc","BANK_CODE":"011"},{"BANK_ID":"21","BANK_NAME":"Guaranty Trust Bank Plc","BANK_CODE":"058"},{"BANK_ID":"22","BANK_NAME":"Heritage Bank","BANK_CODE":"030"},{"BANK_ID":"23","BANK_NAME":"Keystone Bank Plc","BANK_CODE":"082"},{"BANK_ID":"24","BANK_NAME":"Skye Bank Plc","BANK_CODE":"076"},{"BANK_ID":"25","BANK_NAME":"Standard Chartered Bank Nigeria Limited","BANK_CODE":"068"},{"BANK_ID":"26","BANK_NAME":"Union Bank Of Nigeria Plc","BANK_CODE":"032"},{"BANK_ID":"27","BANK_NAME":"United Bank for Africa Plc (UBA)","BANK_CODE":"033"},{"BANK_ID":"28","BANK_NAME":"Wema Bank Plc","BANK_CODE":"035"},{"BANK_ID":"29","BANK_NAME":"Zenith Bank Plc","BANK_CODE":"057"},{"BANK_ID":"30","BANK_NAME":"Jaiz Bank Plc","BANK_CODE":"301"},{"BANK_ID":"31","BANK_NAME":"Providus Bank","BANK_CODE":"101"},{"BANK_ID":"32","BANK_NAME":"Citibank Nigeria","BANK_CODE":"023"},{"BANK_ID":"33","BANK_NAME":"MainStreet Bank","BANK_CODE":"014"},{"BANK_ID":"34","BANK_NAME":"SunTrust Bank","BANK_CODE":"100"},{"BANK_ID":"35","BANK_NAME":"Unity Bank","BANK_CODE":"215"},{"BANK_ID":"36","BANK_NAME":"Eartholeum","BANK_CODE":"302"},{"BANK_ID":"37","BANK_NAME":"Chams Mobile","BANK_CODE":"303"},{"BANK_ID":"38","BANK_NAME":"Cellulant","BANK_CODE":"317"}];
  public user: any;
  signup = {bank_account_number: '', bank_account_name: '', bank_id: '',token:''};
  constructor(public storage:Storage,public toastCtrl: ToastController,public events:Events,public viewCtrl: ViewController, public userData: UserDataProvider, public loadingCtrl: LoadingController,public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams) {
    this.storage.get('token').then((value) => {
      this.signup.token=value;
    });
    this.storage.get('user').then((value) => {
      this.signup.bank_account_name=value.bank_account_name;
      this.signup.bank_id=value.bank_id;
      this.signup.bank_account_number=value.bank_account_number;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BankPage');
  }
  onBankUpdate(signupForm){
    
    let loader = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading",
      duration: 2000
    })
    loader.present();
    this.userData.onBankUpdate(this.signup).subscribe((data: any) => {
       this.events.publish('bank:update');
      loader.dismiss();
      this.presentToast("Bank details update successful");
      this.userData.setSession(data);
      
    });
     
    
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
