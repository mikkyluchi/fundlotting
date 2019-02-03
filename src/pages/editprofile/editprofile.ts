import { Component } from '@angular/core';
import { ViewController,ModalController,IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the EditprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {
  signup = {account_name: '', address: '', city: '', state:'',phone:'',token:''};
  constructor(public storage:Storage,public toastCtrl: ToastController,public events:Events,public viewCtrl: ViewController, public userData: UserDataProvider, public loadingCtrl: LoadingController,public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams) {
 
    this.signup.account_name = navParams.get('account_name');
    this.signup.address = navParams.get('address');
    this.signup.city = navParams.get('city');
    this.signup.phone = navParams.get('phone');
    this.signup.state = navParams.get('state');
    this.storage.get('token').then((value) => {
      this.signup.token=value;
    });
  }
  onSignupd(signupForm){
    
    let loader = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading",
      duration: 2000
    })
    loader.present();
    this.userData.update(this.signup).subscribe((data: any) => {
      this.events.publish('profile:update');
      loader.dismiss();
      this.presentToast("Profile update successful");
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
  }

  dismiss() { 
    this.viewCtrl.dismiss();
  }

}
