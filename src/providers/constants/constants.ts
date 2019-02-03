import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ConstantsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConstantsProvider {

  public obj = {
		// api_base : 'http://13.92.97.192/creditclan_demo/p2p_admin/',
		local_ci_base: 'http://localhost/ciiis/api/v1/',
		local_laravel_base: 'http://localhost:8100/',
		azure:'http://api.fundlotng.com/index.php/api/v1/',
		images_url:'http://api.fundlotng.com/index.php/pub/images/',
		images_url_azure:'http://api.fundlotng.com/index.php/pub/images/',
		azure_root:'http://api.fundlotng.com/'
	};

  	constructor() { }

  	// Reads a value from the defined constants
	read(key: string){
		if (this.obj.hasOwnProperty(key)) {
			return this.obj[key];
		}
	}

}
