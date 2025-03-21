import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'cart-modal',
  imports: [CartComponent],
  templateUrl: './cart-modal.component.html'
})
export class CartModalComponent {

  @Input() items: CartItem[] = [];
  // @Input() total: number = 0;

  @Output() idProductEventEmitter: EventEmitter<number> = new EventEmitter();

  @Output() closeEventEmitter = new EventEmitter();

  closeCart(): void {
    this.closeEventEmitter.emit();
  }

  onDeleteCart(id: number) {
    this.idProductEventEmitter.emit(id);
  }
}
