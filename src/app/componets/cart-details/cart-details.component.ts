import { CartItem } from 'src/app/common/cart-item';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
})
export class CartDetailsComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private CartService: CartService) {}

  ngOnInit(): void {
    this.lastCartDetails();
  }
  lastCartDetails() {
    // get a handle to the cart items
    this.cartItems = this.CartService.cartItems;

    // subscribe to the cart totalPrice
    this.CartService.totalPrice.subscribe((data) => (this.totalPrice = data));
    // subscribe to the cart totalQuantity
    this.CartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );
    // compute cart total price and quantity

    this.CartService.computeCartTotals();
  }

  incrementQuantity(theCartItem: CartItem) {
    this.CartService.addToCart(theCartItem);
  }
  decrementQuantity(theCartItem: CartItem) {
    this.CartService.decrementQuantity(theCartItem);
  }
  remove(theCartItem: CartItem) {
    this.CartService.remove(theCartItem);
  }
}
