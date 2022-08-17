import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from '../model/cart.model';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  redeemForm: FormGroup;
  cart: Cart;
  msg: string;
  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.msg = '';
    this.redeemForm = new FormGroup({
      name: new FormControl(''),
      ptValue: new FormControl('')
    })
  }

  onFormSubmit(){
    this.cart = this.redeemForm.value;
    this.cartService.redeemItems(this.cart).subscribe({
      next: ()=>{
        this.msg = 'Item(s) redeemed'
        let cartArr = this.cartService.cart$.getValue();
        cartArr.push(this.cart);
        this.cartService.cart$.next(cartArr);
        this.router.navigateByUrl('/dashboard');
      },
      error: (e)=>{
        this.msg = 'Error performing transaction';
      }
    });
  }

}
