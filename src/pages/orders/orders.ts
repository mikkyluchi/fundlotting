import { Component, ChangeDetectorRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { IonicPage,PopoverController , App, NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading, Events } from 'ionic-angular';
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
import { OrdermenuPage } from '../../pages/ordermenu/ordermenu';
/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  public orders: any;
  public order_type = '0';
  public order_description = "Pending Orders";
  public user_id: any; 
  public desc = [
    {
      "description":"Pending Orders"
    },
    {
      "description":"Completed Orders"
    },
    {
      "description":"Cancelled Orders"
    }
  ]
  constructor(public popoverCtrl: PopoverController,public app: App, private cart: CartProvider, private alertCtrl: AlertController, private changeDetector: ChangeDetectorRef, public productsService: ProductDataProvider, public viewCtrl: ViewController, public storage: Storage, public events: Events, public modalCtrl: ModalController, public constant: ConstantsProvider, public userData: UserDataProvider, public navCtrl: NavController, public navParams: NavParams, 
    public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
  
    this.storage.get('user').then((value) => {
      this.user_id = value.id;
      this.loadOrders();
    });
  }
  ionViewDidLoad() {
    
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create('OrdermenuPage');
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(data => {
       this.order_type=data;
       this.loadOrders();
       this.order_description = this.desc[data].description;
    })
  }
  loadOrders(){
    let loader = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading",
      duration: 2000
    })
    loader.present();
    this.userData.getOrders(this.user_id,this.order_type).subscribe((data: any) => {
      //this.events.publish('profile:update');
      loader.dismiss();
      this.orders = data;
    });
  }
  viewOrderDetails(order_id){
    let modal = this.modalCtrl.create('OrderdetailsPage',{order_id:order_id});
    modal.present();
  }
}
