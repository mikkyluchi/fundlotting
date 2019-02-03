import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { Storage } from '@ionic/storage'; 

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  current = '1';
  public user: any;
  public dashboardata:any;
  public announcements:any;
  constructor(public loadingCtrl:LoadingController,public userData: UserDataProvider, public storage: Storage, public menu: MenuController, public navCtrl: NavController, public navParams: NavParams) {
    
  }
  loadDashboarddata(){
    let loader = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading",
      duration: 2000
    })
    loader.present();
    this.storage.get('user').then((value) => {

      this.userData.getDashboardData(value).subscribe((data: any) => {
        this.dashboardata=data
        this.announcements = data.announcements;
      });
    }); 
    
  }
  ionViewDidLoad() {
    this.loadDashboarddata();
     
  }
  openProfile(){
    this.navCtrl.setRoot('ProfilePage')
  }
  openSettings() {
    this.navCtrl.push('SettingsPage')
  }
  openWallet() {
    this.navCtrl.setRoot('WalletPage')
  }
  openProducts() {
    this.navCtrl.setRoot('InventoryPage')
  }
  orderHistory(){
    this.navCtrl.setRoot('OrdersPage')
  }
  myStock(){
    this.navCtrl.setRoot('MystockPage')
  }
  sendFeedback(){
    this.navCtrl.push('SendfeedbackPage')
  }
  helpCenter(){
    this.navCtrl.setRoot('HelpcenterPage')
  }
  aboutFundlot(){
    this.navCtrl.push('AboutfundlotPage')
  }
  openAnnouncements(){
    this.navCtrl.push('AnnouncementsPage')
  }
  availableProducts(){
    this.navCtrl.push('StocksPage')
  }
  openProduct(product){
    this.navCtrl.push('ProductdetailsPage',{product:product,is_invest:true})
  }
}
