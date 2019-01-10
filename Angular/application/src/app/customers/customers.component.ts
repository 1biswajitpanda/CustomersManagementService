import { Component, OnInit } from '@angular/core';
import { Customer } from "../customer";
import { CustomersGetService } from "../services/customers-get.service";


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  isOpen : boolean = false;
  selectedCustomer : Customer;
  customers : Customer[];

  openModal (customer : Customer) {
    this.selectedCustomer = customer;
    this.isOpen = true;
  }

  closeModal () {
    this.isOpen = false;
  }

  constructor(private customerGetService: CustomersGetService) {

  }

  ngOnInit() {
      this.customerGetService.getCustomers().subscribe(customers=>{
          this.customers=customers
          console.log(this.customers)
        })
  }
}
