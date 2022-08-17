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
  carts: Cart[];
  msg: string;
  employee: Employee;
  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.msg = '';
    this.cart.total = this.carts[0].point_value + this.carts[1].point_value + this.carts[2].point_value;
    this.redeemForm = new FormGroup({
      name: new FormControl(''),
      ptValue: new FormControl('')
    })
  }

  onFormSubmit(){
    this.cart = this.redeemForm.value;
    this.cartService.redeemItems(this.cart).subscribe({
      next: ()=>{
        this.employee.total_points = this.employee.current_points - this.cart.total;
        let cartArr = this.cartService.cart$.getValue();
        cartArr.push(this.cart);
        this.cartService.cart$.next(cartArr);
        this.msg = 'Item(s) redeemed';
        this.router.navigateByUrl('/dashboard');
      },
      error: (e)=>{
        this.msg = 'Error performing transaction';
      }
    });
  }

}
