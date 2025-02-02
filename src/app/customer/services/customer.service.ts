import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../services/storage/user-storage.service';

const BASIC_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

    getAllDishes(): Observable<any> {
      return this.http.get(BASIC_URL + 'api/customer/dishes', {
        headers: this.createAuthorizationHeader(),
      });
    }
  
    getAllDishesByName(name:any): Observable<any> {
      return this.http.get(BASIC_URL + `api/customer/search/${name}`, {
        headers: this.createAuthorizationHeader(),
      });
    }
    
    addToCart(dishId:any): Observable<any> {
      const cartDto = {
        dishId: dishId,
        userId: UserStorageService.getUserId()
      }
      return this.http.post(BASIC_URL + 'api/customer/cart', cartDto, {
        headers: this.createAuthorizationHeader(),
      });
    }

    getCartByUserId(): Observable<any> {
      const userId = UserStorageService.getUserId();
      return this.http.get(BASIC_URL + `api/customer/cart/${userId}`, {
        headers: this.createAuthorizationHeader(),
      });
    }

    placeOrder(orderDto: any): Observable<any> {
      return this.http.post(BASIC_URL + 'api/customer/placeOrder', orderDto, {
        headers: this.createAuthorizationHeader(),
      });
    }

    private createAuthorizationHeader(): HttpHeaders {
        return new HttpHeaders().set(
          'Authorization', 'Bearer ' + UserStorageService.getToken()
        )
      }
}
