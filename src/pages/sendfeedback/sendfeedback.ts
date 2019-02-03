import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home'
/**
 * Generated class for the SendfeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sendfeedback',
  templateUrl: 'sendfeedback.html',
})
export class SendfeedbackPage {
  private feedback : FormGroup;
  public user: any;
  constructor(public loadingCtrl:LoadingController, public toastCtrl: ToastController,public userData: UserDataProvider, public storage: Storage,public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.feedback = this.formBuilder.group({
      category: ['', Validators.required],
      subject: ['', Validators.required],
      description: [''],
    });
    this.storage.get('user').then((value) => {
      this.user = value;
       
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendfeedbackPage');
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
  logForm(){
    console.log(1)
    let loader = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading",
      duration: 2000
    })
    loader.present();
     
    this.userData.sendFeedback(this.user,this.feedback.value).subscribe((data: any) => {
      this.presentToast("Thank your for sending your feedback")
      this.navCtrl.setRoot(HomePage)
    });
  }
}
