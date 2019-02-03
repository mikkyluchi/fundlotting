import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the AnnouncementsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-announcements',
  templateUrl: 'announcements.html',
})
export class AnnouncementsPage {

  public user: any; 
  public announcements:any;
  constructor(public loadingCtrl:LoadingController,public userData: UserDataProvider, public storage: Storage, public menu: MenuController, public navCtrl: NavController, public navParams: NavParams) {
   
    this.storage.get('user').then((value) => {
      this.user = value;
      this.loadDashboarddata();
    });
  }
  viewAnnounce(announce){

  }
  loadDashboarddata(){
    let loader = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading",
      duration: 2000
    })
    loader.present();
     
    this.userData.getDashboardData(this.user).subscribe((data: any) => {

      this.announcements = data.announcements;
    });
  }
  ionViewDidLoad() {
    
  } 

}
