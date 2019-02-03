import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, MenuController, ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { UserOptions } from '../../interfaces/user-options';
import { NgForm } from '@angular/forms';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { Storage } from '@ionic/storage'; 
import { HomePage } from '../../pages/home/home'
/**
 * Generated class for the AddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {

  signup = {
    address: '', city: '', state: '',token:''
  };
  submitted = false;
  constructor(public events: Events,
    public storage: Storage, public menu: MenuController, public loadingCtrl: LoadingController, 
    public userData: UserDataProvider, public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController) {
      this.storage.get('token').then((value) => {
        this.signup.token=value;
      });
  }
  ionViewWillLeave() {
    
     
    
    }
  onSuccess(){

  }
  onError(){

  }
  onSignup(form: NgForm) {
    this.submitted = true;
    let loader = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading",
      duration: 1000
    })
    loader.present(); 
    this.storage.get('user').then((value) => {
      value.address = this.signup.address;
      value.city = this.signup.city;
      value.state = this.signup.state;
      this.storage.set('user', value); 
      this.userData.saveAddress(value).subscribe((data: any) => {
        if (data.status == true) {
          this.events.publish('onboarding:completed');
          this.navCtrl.setRoot('HomePage');
        } else {
           this.presentToast(data.message)
        }
  
      });
      
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
