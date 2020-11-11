import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/servides/cart.service';
import { ProductService } from 'src/app/servides/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();

  constructor(private productServise: ProductService, 
              private route: ActivatedRoute, 
              private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>{
      this.handleProductDetails();
    })
  }
  handleProductDetails() {
    // get the "id" param string. convert to a number using the "+" symbol
    const theProductId: number = +this.route.snapshot.paramMap.get('id');
    this.productServise.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )
  }

  addToCart(){
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }

}
