import { Component, ChangeDetectorRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading, Events } from 'ionic-angular';
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
 * Generated class for the StocksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stocks',
  templateUrl: 'stocks.html',
})
export class StocksPage {
  public products: any = [];
  private start: number = 0;
  public images_url: string;
  public searching = false;
  public searchTerm = "";
  public status = "1";
  public cartObj: any;
  // cartBadgeState: string = 'idle';
  itemsInCart: Object[] = [];
  constructor(private cart: CartProvider, private alertCtrl: AlertController, private changeDetector: ChangeDetectorRef, public productsService: ProductDataProvider, public viewCtrl: ViewController, public storage: Storage, public events: Events, public modalCtrl: ModalController, public constant: ConstantsProvider, public userData: UserDataProvider, public navCtrl: NavController, public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
    this.loadStocks(0);
    this.images_url = this.constant.read('images_url_azure');
    this.cartObj = this.cart.cartObj;
  }

  ionViewDidLoad() {
    this.loadStocks(0);
  }
  loadStocks(filter) {
    this.productsService.loadStockss(filter).subscribe((data: any) => {
      this.products = data
    });
  }

  presentPrompt(product, i) {
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
              // this.products[i]=product;
              // product.addButtonState = 'adding';
              // this.cartBadgeState = 'adding';
              // this.changeDetector.detectChanges();
              // this.addToCartFinished(product);
              // console.log(this.products)
              this.addItem(product);
              this.presentToast("Product Added")
            }
          }
        }
      ]
    });
    alert.present();
  }
  itemAlreadyAdded(product) {

    return this.cart.find(product);

  }
  addItem(product) {
    this.cart.addItem(product);

  }
  presentAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
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
  openShoppingCart() {
    this.navCtrl.setRoot('StockdetailPage')
  }
  openFilter() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Filter Product');

    alert.addInput({
      type: 'radio',
      label: 'Quantity Remaining',
      value: '1',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: 'Margin',
      value: '2',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: 'Time Remaining',
      value: '3',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: 'Price',
      value: '4',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: 'Turn Over',
      value: '5',
      checked: false
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.handleFilter(data)
      }
    });
    alert.present();
  }
  handleFilter(data){
    this.loadStocks(data);
  }
}
