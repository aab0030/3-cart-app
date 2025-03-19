import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartAppComponent } from './components/cart-app.component';

@Component({
  selector: 'app-root',
  imports: [CartAppComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '3-cart-app';
}
