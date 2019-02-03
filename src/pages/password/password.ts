import { Component } from '@angular/core';
import { ViewController,ModalController,IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the PasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class PasswordPage {
  signup = {currentpassword: '', password: '', comfirmpassword: '',token:''};
  constructor(public storage:Storage,public toastCtrl: ToastController,public events:Events,public viewCtrl: ViewController, public userData: UserDataProvider, public loadingCtrl: LoadingController,public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams) {
    this.storage.get('token').then((value) => {
      this.signup.token=value;
    });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordPage');
  }
  onChangePassword(signupForm){
    
    let loader = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading",
      duration: 2000
    })
    loader.present();
    this.userData.updatepassword(this.signup).subscribe((data: any) => {
      loader.dismiss(); 
      if(data.status){
        this.userData.logout();
        this.navCtrl.setRoot('AuthPage')
      }else{
        this.presentToast(data.message)
      }
      
      
      
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
