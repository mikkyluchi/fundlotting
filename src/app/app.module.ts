import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule,NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HttpClientModule } from '@angular/common/http';

import { HttpModule } from '@angular/http'
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component'; 
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CartProvider } from '../providers/cart/cart';
import { ConstantsProvider } from '../providers/constants/constants';
import { ProductDataProvider } from '../providers/product-data/product-data';
import { TransactionsProvider } from '../providers/transactions/transactions';
import { UserDataProvider } from '../providers/user-data/user-data';
import { OneSignal } from '@ionic-native/onesignal';
import { Angular4PaystackModule } from 'angular4-paystack';
import { MomentModule } from 'angular2-moment'; 

import { AppVersion } from '@ionic-native/app-version/ngx';
@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp), 
    BrowserAnimationsModule,
    NoopAnimationsModule,
    HttpModule,
    IonicStorageModule.forRoot(), 
    MomentModule,
    HttpClientModule,
    Angular4PaystackModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CartProvider,
    ConstantsProvider,
    ProductDataProvider,
    TransactionsProvider,
    UserDataProvider,
    OneSignal,
    AppVersion
  ]
})
export class AppModule {}
