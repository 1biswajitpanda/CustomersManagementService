import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from "./customers/customers.component";
import { OrdersComponent } from "./orders/orders.component";
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { ModalComponent } from "./modal/modal.component";

const routes : Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'customers', component: CustomersComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'modal', component: ModalComponent }
] 


@NgModule({
  exports: [ RouterModule ],
  imports : [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}