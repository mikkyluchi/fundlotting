import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, MenuController } from 'ionic-angular';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/**
 * Generated class for the OnboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-onboard',
  styles: [`
    .toggle-container {
      background-color:white;
      border:10px solid black;
      width:200px;
      text-align:center;
      line-height:100px;
      font-size:50px;
      box-sizing:border-box;
      overflow:hidden;
    }
  `],
  animations: [
    trigger(
      'onLoadCollapse',
      [
        state('collapsed, void', style({ height: '50%', 'background-color': '#fff', width: '100%', 'transition-timing-function': 'ease', 'transition-duration': '500ms', 'transition-property': 'height, visibility' })),
        state('expanded', style({ height: '*', 'background-color': '#fff' })),
        transition(
          'expanded <=> collapsed', [animate(500, style({ height: '50%' })), animate(500)])
      ]),
    trigger(
      'homeSignatureState',
      [
        state('collapsed, void', style({ 'padding-top': '5%', 'background-color': '#fff', width: '100%', 'transition-timing-function': 'ease', 'transition-duration': '800ms', 'transition-property': 'padding-top' })),
        state('expanded', style({ 'padding-top': '*', 'background-color': '#fff' })),
        transition(
          'expanded <=> collapsed', [animate(800, style({ 'padding-top': '5%' })), animate(800)])
      ]),
    trigger(
      'imgState',
      [
        state('collapsed, void', style({ 'top': '5%', 'transition-timing-function': 'ease', 'transition-duration': '500ms', 'transition-property': 'top' })),
        state('expanded', style({ 'top': '*' })),
        transition(
          'expanded <=> collapsed', [animate(500, style({ 'top': '0' })), animate(500)])
      ])
    ,
    trigger(
      'footerState',
      [
        state('collapsed, void', style({ 'bottom': '0', 'transition-timing-function': 'ease', 'transition-duration': '100ms', 'transition-property': 'bottom' })),
        state('expanded', style({ 'bottom': '*' })),
        transition(
          'expanded <=> collapsed', [animate(1500, style({ 'bottom': '0' })), animate(1500)])
      ])
  ],
  templateUrl: 'onboard.html',
})
export class OnboardPage {
  stateExpression: string;


  constructor(public events: Events, public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {

    this.expand();
    //setTimeout(this.collapse(), 3000)

  }
  expand() { this.stateExpression = 'expanded'; }
  collapse() { this.stateExpression = 'collapsed'; }

  ionViewDidEnter() {
    this.menu.enable(false);
    this.collapse()
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
  skipOnboarding() {
    this.events.publish('onboarding:skipped');
    this.navCtrl.setRoot('HomePage');
  }
  askForPhoneNumber() {
    this.events.publish('onboarding:phonenumber');
    this.navCtrl.setRoot('PhonenumberPage');
  }
}
