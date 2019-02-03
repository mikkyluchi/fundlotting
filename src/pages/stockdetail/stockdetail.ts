import { Component, ChangeDetectorRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { IonicPage, NavController,App, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading, Events } from 'ionic-angular';
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
 * Generated class for the StockdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stockdetail',
  templateUrl: 'stockdetail.html',
})
export class StockdetailPage {

  public products: any = [];
  private start: number = 0;
  public images_url: string;
  public searching = false;
  public searchTerm = "";
  public status = "1";
  public cartObj: any;
  public update_action = "0";
  public product_to_update:any;
  // cartBadgeState: string = 'idle';
  itemsInCart: Object[] = [];
  constructor(public app:App,private cart: CartProvider, private alertCtrl: AlertController, private changeDetector: ChangeDetectorRef, public productsService: ProductDataProvider, public viewCtrl: ViewController, public storage: Storage, public events: Events, public modalCtrl: ModalController, public constant: ConstantsProvider, public userData: UserDataProvider, public navCtrl: NavController, public navParams: NavParams, 
    public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
    
    this.images_url = this.constant.read('images_url_azure');
    this.cartObj = this.cart.cartObj;
  }
 
  ionViewDidLoad() {
     
  }
  removeFromCart(product_id){ 
    this.cart.drop(product_id);

  }
  inc(product){
    this.update_action = "1";
    this.product_to_update = product;
    this.presentPrompt(product);
  }
  dec(product){
    this.update_action = '2';
    this.product_to_update = product;
    this.presentPrompt(product);
  }
  presentPrompt(product) {
    
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      subTitle: 'Enter Quantity',
      inputs: [
        {
          name: 'Quantity',
          placeholder: 'Quantity',
          type: 'text',
          value:product.quantityInCart
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

            if (data.Quantity == "0" || data.Quantity == "") {
              this.presentToast("Please enter amount greater than zero.")
            }else {
              product.quantityInCart = parseInt(data.Quantity);
              this.updateProductQuantity(product,product.product_id,data.Quantity);
              this.presentToast("Product Updated")
            }
          }
        }
      ]
    });
    alert.present();
  }
  clearCat(){
    this.cart.clearCat();
  }
  updateProductQuantity(product,product_id,value){
    this.cart.updateItem(product,product_id,value);
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
  checkOut(){
    this.app.getRootNav().setRoot('CheckoutPage');
  }
  gotoproducts(){
    this.app.getRootNav().setRoot('StocksPage');
  }
}
