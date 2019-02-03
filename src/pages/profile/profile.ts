import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { ConstantsProvider } from '../../providers/constants/constants';
import { UserDataProvider } from '../../providers/user-data/user-data'; 
import { ModalController } from 'ionic-angular';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {
  public images_url: string;
  public user: any;
  lastImage: string = null;
  loading: Loading;
  public api_base: any;
  constructor(public modalCtrl: ModalController, public constant: ConstantsProvider, public userData: UserDataProvider, public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
    this.images_url = this.constant.read('images_url');
    this.userData.getUserProfile().then((data) => {
      if (data) {
        this.user = data;
      }
    });
    this.api_base = this.constant.read('azure_root');
    this.images_url = this.constant.read('images_url_azure');
  }
  editProfile() {
    let modal = this.modalCtrl.create('EditprofilePage', this.user);
    modal.present();
  }


  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
 
}
