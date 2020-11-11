import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = "http://localhost:8080/api/product-category";

  constructor( private httpClient: HttpClient ) { 

   }

   // get products with pagination
  getProductListPaginate(thePage: number, theSize:number, theCategoryId: number): Observable<GetResponseProducts> {
    // need to build URL based on category id, page and size
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                      + `&page=${thePage}&size=${theSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  // get products by product category
  getProductList(theCategoryId: number): Observable<Product[]> {
    // need to build URL based on category id 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }

  // get one product by id
  getProduct(theProductId: number): Observable<Product> {
    // need to build URL based on product id 
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  // search products by keyword
  searchProducts(theKeyword: string): Observable<Product[]> {
    // need to build URL based on keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl);
  }

   // search products with pagination
  searchProductsPaginate(thePage: number, theSize:number, theKeyword: string): Observable<GetResponseProducts> {
    // need to build URL based on search keyword, page and size
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                      + `&page=${thePage}&size=${theSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories():  Observable<ProductCategory[]>{
      return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
        map(response => response._embedded.productCategory)
      );
  }

}


interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  Page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}