import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AuthoptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-authoption',
  templateUrl: 'authoption.html',
})
export class AuthoptionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthoptionPage');
  }

  signup(){
    this.navCtrl.setRoot('SignupPage');
  }

  signin(){
    this.navCtrl.setRoot('SigninPage');
  }

}
