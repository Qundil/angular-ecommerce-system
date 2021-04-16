import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-states',
  templateUrl: './cart-states.component.html',
  styleUrls: ['./cart-states.component.scss']
})
export class CartStatesComponent implements OnInit {

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private CartService: CartService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }
  updateCartStatus() {

    // subscribe to the cart totalPrice
    this.CartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // subscribe to the cart totalQuantity
    this.CartService.totalQuantity.subscribe(
    data => this.totalQuantity = data
      );
  }

}
