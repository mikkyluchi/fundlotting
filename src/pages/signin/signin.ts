import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ToastController,MenuController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { UserOptions } from '../../interfaces/user-options';
import { trigger, state, style, transition, animate } from '@angular/animations' 
import { NgForm } from '@angular/forms';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { Storage } from '@ionic/storage';
import { HomePage } from '../../pages/home/home'

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
 
  login: UserOptions = {
    email: '', password: '', account_name: '', address: '', city: '', state: '', phone: '', user_id: 0, username: ''
  }; 
  submitted = false;
  constructor(public toastCtrl:ToastController,public events: Events,
    public storage: Storage, public menu: MenuController, public loadingCtrl: LoadingController, public userData: UserDataProvider, public navCtrl: NavController, public navParams: NavParams) {
  }
  onLogin(form: NgForm) {
    this.submitted = true;
    let loader = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading",
      duration: 3000
    })
    loader.present();
    if (form.valid) {
      this.userData.login(this.login).subscribe((data: any) => {
        if (data.status == true) {
          //success
          //this.storage.set('justRegisted', true);
          this.userData.setSession(data);
          this.events.publish('user:login',data);
          this.navCtrl.setRoot('HomePage');
        } else {
          this.presentToast(data.message);
        }

      });

    }
    
  }
  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page 
    this.menu.enable(false);
  }
  ngOnInit() {
    this.login = {email: '', password: '', account_name: '', address: '', city: '', state: '', phone: '', user_id: 0, username: ''
    }
    
  }
  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
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
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthPage');
  }
  openSignUpForm(){
    this.navCtrl.setRoot('SignupPage');
  }
}
