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
 * Generated class for the WallettransactionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallettransactions',
  templateUrl: 'wallettransactions.html',
})
export class WallettransactionsPage {
  public token: any;  
  public transactions:any = [];
  private start:number=0;
  signup = {start: 0,token:''};
  constructor(public transaService:TransactionsProvider,public viewCtrl:ViewController,public storage:Storage,public events:Events,public modalCtrl: ModalController, public constant: ConstantsProvider, public userData: UserDataProvider, public navCtrl: NavController, public navParams: NavParams, 
    public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
    this.storage.get('user').then((value) => {
      this.token=value.id;
      this.signup.token = value.id;
      this.loadTransactions(); 
    });
    
  }
  loadTransactions(){
    // return new Promise(resolve => {
      
    //   this.transaService.load(this.start,this.token)
    //   .then(data => {
        
    //     // for(let person of data) {
    //     //   this.people.push(person);
    //     // }
    //     this.transactions = data;
    //     resolve(true);
        
    //   });
            
    // });
    this.transaService.load(this.signup).subscribe((data: any) => {
      if(data.status=='1'){
        for (let i = 0; i < data.message.length; i++) {
          this.transactions.push( data.message[i] );
        }
        console.log(this.transactions)
      }
      
    });
  }
  doInfinite(infiniteScroll:any) {
     
    this.signup.start+=50;
    
    // this.loadTransactions().then(()=>{
    //   infiniteScroll.complete();
    // });
    
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WallettransactionsPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
