import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading,Events } from 'ionic-angular';
import { ConstantsProvider } from '../../providers/constants/constants';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { TransactionsProvider } from '../../providers/transactions/transactions';
import { ProductDataProvider } from '../../providers/product-data/product-data'; 
import { ModalController,ViewController } from 'ionic-angular';
import { FundwalletPage } from '../../pages/fundwallet/fundwallet';
import { Storage } from '@ionic/storage';
import { MomentModule } from 'angular2-moment';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  public products:any = [];
  private start:number=0;
  public images_url: string;
  public searching=false;
  public searchTerm="";
   constructor(public productsService:ProductDataProvider,public viewCtrl:ViewController,public storage:Storage,public events:Events,public modalCtrl: ModalController,  public constant: ConstantsProvider, public userData: UserDataProvider, public navCtrl: NavController, public navParams: NavParams, 
    public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
    this.loadProducts(); 
    this.images_url = this.constant.read('images_url_azure');
  }
  loadProducts(){
  	// this.productsService.load(this.start).subscribe((data: any) => {
   //    if(data.status=='1'){
   //      for (let i = 0; i < data.message.length; i++) {
   //        this.products.push( data.message[i] );
   //      }
   //      console.log(this.products)
   //    }
      
   //  });
   return new Promise(resolve => {
      
      this.productsService.load(this.start)
      .then(data => {
        // for(let i = 0; i < data.message.length; i++) {
        //     this.products.push( data.message[i] );
        //   }
        this.products=data
        resolve(true);
        
      });
            
    });
  }
  doInfinite(infiniteScroll:any) {
     
    this.start+=50;
    
    this.loadProducts().then(()=>{
      infiniteScroll.complete();
    });
    
 }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }
openProduct(product){
  this.navCtrl.push('ProductdetailsPage',{product:product})
}
}
