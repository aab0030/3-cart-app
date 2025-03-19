import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { CatalogComponent } from "./catalog/catalog.component";
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from "./navbar/navbar.component";
import { CartModalComponent } from './cart-modal/cart-modal.component';

@Component({
  selector: 'cart-app',
  imports: [CatalogComponent, NavbarComponent, CartModalComponent],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit{

  products: Product[] = [];

  items: CartItem[] = [];

  // total!: number;

  showCart: boolean= false;

  onAddCart(product: Product): void {
    const hasItem = this.items.find(item => {
      return item.product.id === product.id;
    })

    if (hasItem) {
      //El map devuelve una nueva instancia de los items con la cantidad modificada
      this.items = this.items.map(item => {
        if (item.product.id === product.id) {
          return {
            ... item,
            quantity: item.quantity + 1
          }
        }
        return item;
      })
    } else{
      //Inmutabilidad, clonamos el producto para que no cambie si se cambia el otro
      this.items = [... this.items,{product: {... product}, quantity: 1}];
      sessionStorage.setItem('cart',JSON.stringify(this.items));
    }

    // this.calculateTotal();
    // this.saveSession();
  }

  constructor(private service: ProductService) {
    
  }
  //Se ejecuta solo al inicio
  ngOnInit(): void {
    this.products = this.service.findAll();
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    // this.calculateTotal();
  }

  onDeleteCart(id: number): void {
    this.items = this.items.filter(item => item.product.id !== id);

    if (this.items.length === 0) {
      sessionStorage.clear();
    }
    // this.calculateTotal();
    // this.saveSession();
  }

  // calculateTotal(): void {
  //   //Primer argumento, que se va a acumular, segundo desde donde parte
  //   this.total = this.items.reduce((accumulator, item) => accumulator + item.quantity * item.product.price,0);
  // }

  // saveSession(): void {
  //   sessionStorage.setItem('cart', JSON.stringify(this.items));
  // }

  openCloseCart(): void{
    this.showCart = !this.showCart;
  }
}
