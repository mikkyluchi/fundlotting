import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController, Events, LoadingController,Platform } from 'ionic-angular';

import { ViewChild, OnInit } from '@angular/core';
import { IonDigitKeyboardCmp, IonDigitKeyboardOptions } from '../../components/ion-digit-keyboard'; 
import { UserDataProvider } from '../../providers/user-data/user-data';
import { Storage } from '@ionic/storage';
import { AlertController,IonicPage } from 'ionic-angular';

/**
 * Generated class for the PinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pin',
  templateUrl: 'pin.html',
})
export class PinPage {
  @ViewChild(IonDigitKeyboardCmp) keyboard;
  passcode = "";
  public keyboardSettings: IonDigitKeyboardOptions = {
    align: 'center',
    //width: '85%',
    visible: true,
    leftActionOptions: {
      iconName: 'ios-backspace-outline',
      fontSize: '1.4em',
      hidden: false
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
  user: any;
  constructor(private loadingCtrl:LoadingController,platform: Platform,private alertCtrl: AlertController, public events: Events, public storage: Storage, public toastCtrl: ToastController, public userData: UserDataProvider, public navCtrl: NavController, public viewCtrl: ViewController,  public navParams: NavParams) {

    this.storage.get('user').then((value) => {
      this.user = value;
    });
    let backAction =  platform.registerBackButtonAction(() => {
      //this.navCtrl.setRoot('HomePage'); 
      this.presentToast("Please set your pin to continue");
      backAction();
    },2)
  }

  
  ngOnInit(): void {
    // Subscriber way     
    this.keyboard.onClick.subscribe((key) => {
      console.log('From subscriber: ', key);
    });
  }
  public showKeyboard() {
    this.keyboard.show();
  }
  // Event way
  public numberClick(key: number) {
    if (this.passcode.length < 4) {
      this.passcode = this.passcode + key;
      if (this.passcode.length == 4) {
        // $timeout(function () {
        //   console.log("The four digit code was entered");
        // }, 500);
      }
    }
  }
  doSetNewPin(){
    let loader = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading",
      duration: 2000
    })
    loader.present();
    this.userData.doSetNewPin(this.passcode,this.user).subscribe((data: any) => {
      loader.dismiss(); 
      if(data.status===true){
        this.storage.set('hasSetPin', true);
        this.viewCtrl.dismiss();
        this.presentToast("Pin set");
      }else{
        this.presentToast("Unable to perform request.");
        this.navCtrl.setRoot('HomePage');
      }
     
      
    });
  }
  public hideKeyboard() {
    // this.keyboard.hide();
    this.passcode = "0";

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
