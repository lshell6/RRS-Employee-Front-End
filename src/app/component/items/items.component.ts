import { Component, Input, OnInit } from '@angular/core';
import { Cart } from '../model/cart.model';
import { Items } from '../model/items.model';
import { CartService } from '../service/cart.service';
import { ItemsService } from '../service/items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  @Input("data")
  items: Items[];
  item: Items;
  cart: Cart[];
  page: number;
  msg: string;
  constructor(private itemsService: ItemsService, private cartService: CartService) {
    this.items = [];
    this.cart = [];
    this.page = 0;
    this.msg = '';
  } 
    
  ngOnInit(): void {
      this.itemsService.getAllItems().subscribe(data=>{
        this.items = data;
      });
    }

  prev(){
    let page = this.itemsService.page$.getValue();
    if(page > 0){
      this.page = page - 1;
      this.itemsService.page$.next(this.page);
    }
  }

  next(){
    let page = this.itemsService.page$.getValue();
    this.page = page + 1;
    this.itemsService.page$.next(this.page);
  }

  addToCart(){
    this.cartService.addItemToCart(this.item).subscribe({
      next: (data)=>{
        this.item = data;
        this.msg = 'Item added to cart';
        this.cart = this.itemsService.item$.getValue();
        this.cart.push(this.item);
        this.cartService.cart$.next(this.cart);
      },
      error: (e)=>{
        this.msg = 'Item could not be added'
      }
    })


  }
  
}

