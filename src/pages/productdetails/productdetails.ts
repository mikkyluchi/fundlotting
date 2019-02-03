import { Component } from '@angular/core';
import { AlertController,IonicPage, NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading,Events } from 'ionic-angular';
import { ConstantsProvider } from '../../providers/constants/constants';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { TransactionsProvider } from '../../providers/transactions/transactions';
import { ProductDataProvider } from '../../providers/product-data/product-data'; 
import { ModalController,ViewController } from 'ionic-angular';
import { FundwalletPage } from '../../pages/fundwallet/fundwallet';
import { Storage } from '@ionic/storage';
import { MomentModule } from 'angular2-moment';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

import { CartProvider } from '../../providers/cart/cart'
/**
 * Generated class for the ProductdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productdetails',
  templateUrl: 'productdetails.html',
})
export class ProductdetailsPage {
  public product:any;
  public images_url: string;
  public image:any;
  public is_invest = false;
  constructor(private cart: CartProvider,private alertCtrl: AlertController,private sanitization: DomSanitizer,public productsService:ProductDataProvider,public viewCtrl:ViewController,public storage:Storage,public events:Events,public modalCtrl: ModalController, public constant: ConstantsProvider, public userData: UserDataProvider, public navCtrl: NavController, public navParams: NavParams, 
    public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
    this.product = navParams.get('product');
    this.is_invest = navParams.get('is_invest');
  	this.images_url = this.constant.read('images_url_azure');
    this.image = this.sanitization.bypassSecurityTrustStyle('url(this.images_url + this.product.image_url)');
    this.image = 'assets/imgs/FUNDLOT-LOGO.PNG'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductdetailsPage');
  }
  
  presentPrompt(product) { 
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      subTitle: 'Enter Quantity',
      inputs: [
        {
          name: 'Quantity',
          placeholder: 'Quantity',
          type: 'text'
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
            } else if (this.itemAlreadyAdded(product) != -1) {
              this.presentAlert("Product Added", "The product is already added.Please open your cart to change the quantity")
            } else {
              product.quantityInCart += parseInt(data.Quantity); 
              this.addItem(product);
              this.presentToast("Product Added")
            }
          }
        }
      ]
    });
    alert.present();
  }
  presentAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }
  itemAlreadyAdded(product) {

    return this.cart.find(product);

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
  addItem(product) {
    this.cart.addItem(product);
    this.navCtrl.setRoot('StockdetailPage')
  }
}
