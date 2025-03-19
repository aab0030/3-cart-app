import { Component, EventEmitter} from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent{

  items: CartItem[] = [];

  total: number = 0;
  

  //obtenemos los items con el estado de la ruta
  constructor(private sharingDataService: SharingDataService,private router: Router) {
    this.items = this.router.getCurrentNavigation()?.extras.state!['items'];
    this.total = this.router.getCurrentNavigation()?.extras.state!['total'];
  }

  onDeleteCart(id: number) {
     this.sharingDataService.idProductEventEmitter.emit(id);
  }
}
