import { CartDetailsComponent } from './componets/cart-details/cart-details.component';
import { ProductDetailsComponent } from './componets/product-details/product-details.component';
import { ProductListComponent } from './componets/product-list/product-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './componets/checkout/checkout.component';

const routes: Routes = [
  {path: 'checkout', component:CheckoutComponent},
  {path: 'cart-details', component:CartDetailsComponent},
  {path: 'products/:id', component:ProductDetailsComponent},
  {path: 'search/:keyword', component:ProductListComponent},
  {path: 'category/:id/:name', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo:'/products', pathMatch: 'full'},
  {path: '**', redirectTo:'/products', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
