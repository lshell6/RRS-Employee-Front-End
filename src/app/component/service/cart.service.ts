import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../model/cart.model';
import { Items } from '../model/items.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart[];
  addApi: string;
  redeemApi: string;
  cart$ = new BehaviorSubject<Items[]>([]);

  constructor(private http: HttpClient) { 
    this.addApi = 'http://localhost:4801/item/cart';
    this.redeemApi = 'http://localhost:4801/redeem';
  }

  public addItemToCart(items: Cart) : Observable<Cart>{
    return this.http.post<Cart>(this.addApi, items);
  }

  redeemItems(cart) : Observable<Cart[]>{
    return this.http.put<Cart[]>(this.redeemApi, cart);
  }
}
