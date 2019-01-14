import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Customer } from "../customer";
import { CustomersDataService } from '../services/customers-data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

    constructor(private customerDataService: CustomersDataService) { }

    @Input() customer : Customer;
    @Input() isEdit : boolean;
    @Input() isDelete : boolean;
    @Input() isAdd : boolean;
    @Output() modalActionClose = new EventEmitter<boolean>()

    operation : string;
    isActed = false;
    isSaved = false;
    selectedCustomer : Customer = {
        customerId  : 0,
        name        : "",
        profession  : "",
        address     : "",
        phone       : "",
        image       : "../../assets/img_avatar.png"
    }

    ngOnInit() {
        this.selectedCustomer = this.customer || this.selectedCustomer;
        if (this.isAdd) this.operation = "Add";
        if (this.isEdit) this.operation = "Edit";
        if (this.isDelete) this.operation = "Delete";
    }

    closeModal(){
        this.modalActionClose.emit(this.isActed)
    }

    saveCustomer() {
        this.isActed = true;
        if (this.isAdd) {
            this.customerDataService.addCustomer(this.selectedCustomer)
            .subscribe(returnedItem => {
                this.selectedCustomer.customerId = returnedItem.customerId
                if (this.selectedCustomer.customerId > 0) {
                    this.isAdd = false;
                    this.isEdit = true;
                    this.operation = "Edit";
                    this.isSaved = true;
                }
            })
        } else {
            this.customerDataService.updateCustomer(this.selectedCustomer)
            .subscribe(returnedItem => {
                console.log(returnedItem.n)
                this.isSaved = true;
            })
        }
    }

    deleteCustomer(id:number) {
        this.isActed = true;
        this.customerDataService.deleteCustomer(id)
        .subscribe(returnedItem => {
            console.log(returnedItem)
            if (returnedItem.ok == 1 ) {
                this.closeModal();
            }
        })
    }
}
