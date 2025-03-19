import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from "./navbar/navbar.component";
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';

@Component({
  selector: 'cart-app',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit{

  products: Product[] = [];

  items: CartItem[] = [];

  total!: number;

  constructor(
    private sharingDataService: SharingDataService,
    private service: ProductService,
    private router: Router) {
    
  }

  onAddCart(): void {
    this.sharingDataService.productEventEmitter.subscribe(product => {
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
  
      this.calculateTotal();
      this.saveSession();
      this.router.navigate(['/cart'], {
        state: {items: this.items, total: this.total}
      });
    })
  }

  
  //Se ejecuta solo al inicio
  ngOnInit(): void {
    this.products = this.service.findAll();
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    this.calculateTotal();
    //Tenemos que poner aqui estos métodos para que la informacion pueda ser enviada cuando se ejecuten esos métodos
    this.onDeleteCart();
    this.onAddCart();
  }

  onDeleteCart(): void {
    this.sharingDataService.idProductEventEmitter.subscribe( id => {
      
      this.items = this.items.filter(item => item.product.id !== id);
  
      if (this.items.length === 0) {
        sessionStorage.clear();
      }
      this.calculateTotal();
      this.saveSession();
      
      //Refrescar el carro
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/cart'], {
          state: {items: this.items, total: this.total}
        })
      })
    })

  }

  calculateTotal(): void {
    //Primer argumento, que se va a acumular, segundo desde donde parte
    this.total = this.items.reduce((accumulator, item) => accumulator + item.quantity * item.product.price,0);
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}
