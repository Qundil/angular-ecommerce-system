import { ProductService } from './services/product.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './componets/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductCategoryMenuComponent } from './componets/product-category-menu/product-category-menu.component';
import { SearchComponent } from './componets/search/search.component';
import { ProductDetailsComponent } from './componets/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatesComponent } from './componets/cart-states/cart-states.component';
import { CartDetailsComponent } from './componets/cart-details/cart-details.component';
import { CheckoutComponent } from './componets/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatesComponent,
    CartDetailsComponent,
    CheckoutComponent,

  ],
  imports: [BrowserModule,
            AppRoutingModule,
            HttpClientModule,
            NgbModule,
            ReactiveFormsModule
          ],

  providers: [ProductService],
  bootstrap: [AppComponent],
})
export class AppModule {}
