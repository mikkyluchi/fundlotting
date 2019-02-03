import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { Storage } from '@ionic/storage';
import { PinPage } from '../../pages/pin/pin';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export interface PageInterface {
  title: string;
  name: string;
  logsOut?: boolean;
  index?: number;
  sub?:string;
  model?:string;
}

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  promotional=false;
  transactional=false;
  signup = {transactional: false, promotional: false, token:''};
  general: PageInterface[] = [
    { title: 'Profile', name: 'ProfilePage', index: 1 },
    { title: 'Bank Details', name: 'BankPage', index: 1 },
    { title: 'Password', name: 'PasswordPage', index: 2 }, 
    { title: 'Logout', name: 'WelcomePage', logsOut: true }
  ];
  notification: PageInterface[] = [
    { title: 'Promotions', name: 'SupportPage', sub: 'Get notified of promotions',model:'promotional' },
    { title: 'Transactional', name: 'TabsPage', sub: 'Get notified when activity happens on your stock', model:'transactional'  }
  ];
  constructor(public storage:Storage,public userData:UserDataProvider,public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.storage.get('user').then((value) => {
      this.promotional=value.promotional=='1'?true:false;
      this.transactional = value.transactional=='1'?true:false;
    });
    this.storage.get('token').then((value) => {
      this.signup.token=value
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  changeToggle(event){
    this.signup.transactional=event
    this.updateToggles()
  }
  changeToggle_(event){
    this.signup.promotional=true;
    this.updateToggles()
  }
  updateToggles(){
    
    let loader = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading",
      duration: 2000
    })
    //loader.present();
    this.userData.updateToggles(this.signup).subscribe((data: any) => {
      loader.dismiss(); 
      if(data.status){
        
        //loader.dismiss();
        this.presentToast("Profile update successful");
        this.userData.setSession(data);
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
  pinPage(){
    this.navCtrl.push(PinPage).catch((err: any) => {
      console.log(`Didn't set nav root: ${err}`);
     });  
  }
  openPage(page: PageInterface) {
    
    

    if (page.logsOut === true) {
       
      // Give the menu time to close before changing to logged out
      this.userData.logout();
      this.navCtrl.setRoot('AuthoptionPage')
    }else{
      // Set the root of the nav with params if it's a tab index
    this.navCtrl.push(page.name).catch((err: any) => {
      console.log(`Didn't set nav root: ${err}`);
     });
    }
  }
}
