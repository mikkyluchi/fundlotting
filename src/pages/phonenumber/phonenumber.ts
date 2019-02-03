import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, MenuController, ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { UserOptions } from '../../interfaces/user-options';
import { NgForm } from '@angular/forms';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { Storage } from '@ionic/storage'; 

/**
 * Generated class for the PhonenumberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-phonenumber',
  templateUrl: 'phonenumber.html',
})
export class PhonenumberPage {
  phone = {
    phonenumber: '', token: ''
  };
  submitted = false;
  constructor( public events: Events,
    public storage: Storage, public menu: MenuController, 
    public loadingCtrl: LoadingController, public userData: UserDataProvider, 
    public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl:ToastController) {


    this.storage.get('token')
      .then((token) => {
        this.phone.token = token;
      });
  }
  adjustFormHeight() {

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
  onSavePhoneNumber() {
    this.submitted = true;
    let loader = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading",
      duration: 1000
    })
    loader.present();
    this.storage.get('user').then((value) => {

      
      this.userData.savePhoneNumber(this.phone).subscribe((data: any) => {
        if (data.status == true) {
          value.phone = this.phone;
          this.storage.set('user', value);
          this.navCtrl.setRoot('AddressPage');
        } else {
           this.presentToast(data.message)
        }
  
      });
      
    });
   
    
  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PhonenumberPage');
  }
  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
}
