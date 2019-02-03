import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading,Events } from 'ionic-angular';
import { ConstantsProvider } from '../../providers/constants/constants';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { TransactionsProvider } from '../../providers/transactions/transactions' 
import { ModalController,ViewController } from 'ionic-angular';
import { FundwalletPage } from '../../pages/fundwallet/fundwallet';
import { Storage } from '@ionic/storage';
import { MomentModule } from 'angular2-moment';

/**
 * Generated class for the OrderdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orderdetails',
  templateUrl: 'orderdetails.html',
})
export class OrderdetailsPage {

  public token: any;  
  public order:any = [];
  private start:number=0;
  signup = {start: 0,token:'',order_id:''};
  constructor(public transaService:TransactionsProvider,public viewCtrl:ViewController,public storage:Storage,public events:Events,public modalCtrl: ModalController, public constant: ConstantsProvider, public userData: UserDataProvider, public navCtrl: NavController, public navParams: NavParams, 
    public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
    this.storage.get('user').then((value) => {
      this.token=value.id;
      this.signup.token = value.id;
      this.signup.order_id = navParams.get('order_id');
      this.loadOrderItems(); 
    });
    
  }
  loadOrderItems(){ 
    this.transaService.loadOrderItems(this.signup).subscribe((data: any) => {
      this.order=data
      
    });
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad WallettransactionsPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
