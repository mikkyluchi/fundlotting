import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, AlertController,IonicPage } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserDataProvider } from '../providers/user-data/user-data';
import { ConstantsProvider } from '../providers/constants/constants'; 

import { HomePage } from '../pages/home/home'; 
import { OneSignal } from '@ionic-native/onesignal';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  public images_url: string;
  rootPage: any = 'HomePage';
  public user: any;
  pages: Array<{ title: string, component: any }>;
  confirmAlert:any;

  constructor(private _notification: OneSignal,public alertCtrl: AlertController,
    public constant: ConstantsProvider, public userData: UserDataProvider, 
    public events: Events, public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, private appAversion:AppVersion, public storage: Storage) {
    this.initializeApp();
    this.images_url = this.constant.read('images_url_azure');
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage } 
    ];
    this.listenToLoginEvents();
   
  }
  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.userData.hasBeenOnBoarded();
      this.userData.getUserProfile().then((data) => {
        if (data) {
          this.user = data;
          console.log(this.user)
        }
      });
    });
    this.userData.getUserProfile().then((data) => {
      if (data) {
        this.user = data;
        console.log(this.user)
      }
    });
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.platform.registerBackButtonAction(() => { 
      },1);
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.storage.get('hasLoggedIn').then((value) => {
        if(value != true){
          this.nav.setRoot('AuthoptionPage');
        }else{
          this.nav.setRoot('HomePage'); 
        }
      }); 
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  openProfile(){
    this.nav.setRoot('ProfilePage')
  }
  openSettings() {
    this.nav.push('SettingsPage')
  }
  openWallet() {
    this.nav.setRoot('WalletPage')
  }
  openProducts() {
    this.nav.setRoot('InventoryPage')
  }
  openInvestments(){
    this.nav.setRoot('StocksPage')
  }
  orderHistory(){
    this.nav.setRoot('OrdersPage')
  }
  salesHistory(){
    this.nav.setRoot('SalesPage')
  }
  myStock(){
    this.nav.setRoot('MystockPage')
  }
  myDashboard(){
    this.nav.setRoot('HomePage')
  }
}
