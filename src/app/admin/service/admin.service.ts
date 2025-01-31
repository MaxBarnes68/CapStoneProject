import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../services/storage/user-storage.service';

const BASIC_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  addCategory(categoryDto: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/admin/category', categoryDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllCategories(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/admin/categories', {
      headers: this.createAuthorizationHeader(),
    });
  }

  addDish(dishDto: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/admin/dish', dishDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllDishes(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/admin/dishes', {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllDishesByName(name:any): Observable<any> {
    return this.http.get(BASIC_URL + `api/admin/search/${name}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  deleteDish(dishId: any): Observable<any> {
    return this.http.delete(BASIC_URL + `api/admin/dish/${dishId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    )
  }


}
