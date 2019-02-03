import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CartProvider {
  cartObj = {
    "cart":[],
    "total_amount":0,
    "total_qty":0
  }; 
  constructor(public http: HttpClient) {
    console.log('Hello CartProvider Provider');
  }
  
  find(product){
    var result=-1; 
		for( var i = 0, len = this.cartObj.cart.length; i < len; i++ ) {
      
			if( this.cartObj.cart[i].product_id === product.product_id ) {
				result = i;
				break;
			}
		}
		return result;
  }
  find_(product_id){
    var result=-1; 
		for( var i = 0, len = this.cartObj.cart.length; i < len; i++ ) {
      
			if( this.cartObj.cart[i].product_id === product_id ) {
				result = i;
				break;
			}
		}
		return result;
  }
  
  addItem(product){
    this.cartObj.cart.push(product);
    this.cartObj.total_qty += 1;
    //this.cartObj.total_amount += parseInt(product.quantityInCart)*parseInt(product.cost_price);
    this.calculateTotalCartAmount();
  } 
  clearCat(){
    this.cartObj = {
      "cart":[],
      "total_amount":0,
      "total_qty":0
    };
  }
  updateItem(product,product_id,value){
    //this.cartObj.total_amount += parseInt(product.quantityInCart)*parseInt(product.cost_price);
    this.calculateTotalCartAmount();
  }
  cancelOrder(){
    this.cartObj.cart=[];
    this.cartObj.total_amount=0;
    this.cartObj.total_qty=0;
  }
  drop(product_id){ 
    let temp=this.cartObj.cart[this.find_(product_id)]; 
    this.cartObj.total_qty-=1;
    //this.cartObj.total_amount-=( parseInt(temp.quantityInCart) * parseInt(temp.cost_price) );
    this.cartObj.cart.splice(this.find_(product_id), 1);
    this.calculateTotalCartAmount();
  }
  calculateTotalCartAmount(){
    let total=0;
    for( var i = 0, len = this.cartObj.cart.length; i < len; i++ ) {
       total+=parseInt(this.cartObj.cart[i].quantityInCart)*parseInt(this.cartObj.cart[i].cost_price);
    }
    this.cartObj.total_amount = total;
  }
}
