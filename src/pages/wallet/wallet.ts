import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading,Events } from 'ionic-angular';
import { ConstantsProvider } from '../../providers/constants/constants';
import { UserDataProvider } from '../../providers/user-data/user-data'; 
import { ModalController } from 'ionic-angular';
import { FundwalletPage } from '../../pages/fundwallet/fundwallet';
import { Storage } from '@ionic/storage';
import { MomentModule } from 'angular2-moment'; 
/**
 * Generated class for the WalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {

  public images_url: string;
  public user: any;
  lastImage: string = null;
  loading: Loading;
  wallet_summary:any;
  public api_base: any;
  constructor(public storage:Storage,public events:Events,public modalCtrl: ModalController, public constant: ConstantsProvider, public userData: UserDataProvider, public navCtrl: NavController, public navParams: NavParams, 
    public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
    
      this.events.subscribe('finalizingfunding:done', (result) => {
        this.presentToast(result.message)
        this.wallet_summary = result.t
     });
    
  }
  doRefresh(event){
    setTimeout(() => {
      this.userData.doRefresh(this.user).subscribe((data: any) => {
        this.wallet_summary=data
      });
      event.complete();
    }, 2000);
    
  }
  ionViewDidLoad() {
    
    this.userData.hasUserSetPin().then((hasSetPin) => {
      
      if (hasSetPin === false) {
        this.openSetPin();
      }else{
        this.images_url = this.constant.read('images_url');
        this.userData.getUserProfile().then((data) => {
          if (data) {
            this.user = data;
            this.api_base = this.constant.read('azure_root');
            this.images_url = this.constant.read('images_url_azure');
            this.userData.doRefresh(this.user).subscribe((data: any) => {
              this.wallet_summary=data
            });
          }
        });
        
        
      }
    });
  }
  fundWallet(){
    let modal = this.modalCtrl.create('FundwalletPage',{trans_type:'2',trans_detail:'FUND YOUR WALLET',para:'Amount to fund'});
    modal.present();
  }
  openSetPin(){
    let modal = this.modalCtrl.create('PinPage');
    modal.present();
  }
  withdrawFunds(){
    let modal = this.modalCtrl.create('FundwalletPage',{trans_type:'1',trans_detail:'REQUEST WITHDRAWAL',para:'Amount to withdraw'});
    modal.present();
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
  viewAllTransactions(){
    let modal = this.modalCtrl.create('WallettransactionsPage');
    modal.present();
  }
}
