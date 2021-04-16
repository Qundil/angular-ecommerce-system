import { ProductService } from './../../services/product.service';
import { ProductCategory } from './../../common/product-category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.scss']
})
export class ProductCategoryMenuComponent implements OnInit {

 productCategories: ProductCategory[];

  constructor(private ProductService: ProductService) { }

  ngOnInit(): void {
    this.listProductCategories();
  }
  listProductCategories() {
   this.ProductService.getProductCategories().subscribe(
     data => {
       console.log('Product Categories' + JSON.stringify(data));
       this.productCategories = data;
     }
   );
  }

}
