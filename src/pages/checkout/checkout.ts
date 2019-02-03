import { Component, ChangeDetectorRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { IonicPage,App, NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading, Events } from 'ionic-angular';
import { ConstantsProvider } from '../../providers/constants/constants';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { TransactionsProvider } from '../../providers/transactions/transactions';
import { ProductDataProvider } from '../../providers/product-data/product-data'; 
import { ModalController, ViewController } from 'ionic-angular';
import { FundwalletPage } from '../../pages/fundwallet/fundwallet';
import { Storage } from '@ionic/storage';
import { MomentModule } from 'angular2-moment';
import { AlertController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart'

/**
 * Generated class for the CheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

  public products: any = [];
  private start: number = 0;
  public images_url: string;
  public searching = false;
  public searchTerm = "";
  public status = "1";
  public cartObj: any;
  public update_action = "0";
  public product_to_update:any;
  trans_pin="";
  public user:any;
  // cartBadgeState: string = 'idle';
  itemsInCart: Object[] = [];
  public wallet_balance = "0"
  constructor(public app:App,private cart: CartProvider, private alertCtrl: AlertController, private changeDetector: ChangeDetectorRef, public productsService: ProductDataProvider, public viewCtrl: ViewController, public storage: Storage, public events: Events, public modalCtrl: ModalController, public constant: ConstantsProvider, public userData: UserDataProvider, public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
    
    this.images_url = this.constant.read('images_url_azure');
    this.cartObj = this.cart.cartObj;
    this.storage.get('wallet_summary').then((value) => {
      this.wallet_balance = value.wallet_balance.balance
   });
   this.storage.get('user').then((value) => {
    this.user = value.id;
 });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }
  payForOrder(){
    //check if total amount in wallet can support the order
    if(this.wallet_balance > this.cartObj.total_amount){
      this.presentPrompt();
    }else{
      this.presentAlert("Insufficient Balance","You cannot fund this order.Please fund your wallet.");
    }
  }
  presentAlert(title,message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }
  cancelOrder(){
    //cancel order
    this.cart.cancelOrder();
    this.app.getRootNav().setRoot('MystockPage');
  }
  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      subTitle: 'Enter your pin to confirm transaction',
      inputs: [
        {
          name: 'password',
          placeholder: 'Pin',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: data => {
           
           if(data.password==""){
             this.presentToast("Please enter your pin to confirm order.")
           }else{ 
             this.trans_pin=data.password;
             this.placeOrder();
           }
          }
        }
      ]
    });
    alert.present();
  }
  placeOrder(){

    let loader = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading",
      duration: 2000
    })
    loader.present();
    this.userData.placeOrder(this.trans_pin,this.cartObj,this.user).subscribe((data: any) => {
      //this.events.publish('profile:update');
      loader.dismiss();
      this.presentToast("Order placed successful");
      this.cart.cancelOrder();
      this.app.getRootNav().setRoot('MystockPage');
      //this.userData.setSession(data);
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
