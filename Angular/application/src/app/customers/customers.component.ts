// How to refresh the customers page when the modal is closed?
//      Though window.location.reload() will work but it is not the correct solution.
//      Because it will reload the page(not the view), thus violating Single Page Application concept.
//      So the solution is, when the modal is closed, subscribe to the http getCustomers()
// Communication from parent to child
//      modal.component.ts          --> @Input() customer : Customer;
//      customers.component.html    --> [customer]="selectedCustomer"
// Communication from child to parent
//      modal.component.ts          --> @Output() modalActionClose = new EventEmitter<boolean>()
//                                      closeModal(){
//                                          this.modalActionClose.emit(this.isActed)
//                                      }
//      customers.component.html    --> (modalActionClose)="closeModal($event)
//                                      /* Whatever data has been passed in this.isActed, the same will be received in $event
//                                      closeModal (isActed:boolean) { .... }


//TODO : Limit the number of records shown in *ngFor
//TODO : User should be able to see customers page only if he is logged in
//TODO : Form Validation
//TODO : Only One user with one perticular username should be allowed
//TODO : How to get the last key value from the index in mongodb
//TODO : Password must be encrypted while stored at node
//TODO : Change the authorization logic in node
//TODO : Set the status code for each response
//TODO : How to read the header from the http subscribe

import { Component, OnInit } from '@angular/core';
import { Customer } from "../customer";
import { CustomersDataService } from "../services/customers-data.service";


@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

    isOpen : boolean = false;
    isNotLoaded : boolean = true;
    isAdd : boolean = false;
    isEdit : boolean = false;
    isDelete : boolean = false;
    isZeroCustomers = false;
    selectedCustomer : Customer;
    customers : Customer[];

    openModal (action: string, customer?: Customer) {
        this.isZeroCustomers = false;
        if (action === "add") { this.isAdd = true }
        if (action === "delete") { this.isDelete = true }
        if (action === "edit") { this.isEdit = true }
        this.isOpen = true;
        this.selectedCustomer = customer;
    }

    closeModal (isActed:boolean) {
        this.isOpen = false;
        this.isEdit = false;
        this.isDelete = false;
        this.isAdd = false;
        if (isActed){
            this.isNotLoaded = true;
            this.customers=[];
            this.customerDataService.getCustomers().subscribe(customers=>{
                this.customers=customers;
                this.isNotLoaded = false;
            })
        }
    }

    constructor(private customerDataService: CustomersDataService) {
    }

    ngOnInit() {
        this.customerDataService.getCustomers().subscribe(customers=>{
            this.customers=customers;
            this.isNotLoaded = false;
            this.isZeroCustomers = this.customers.length == 0 ? true : false;
        })
    }
}
