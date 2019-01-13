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
    isActed : boolean = false;
    selectedCustomer : Customer = {
        customerId : parseInt((Math.random()*1000000/1).toString()),
        name : "",
        profession : "",
        image : "../../assets/img_avatar.png"
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
        //TODO: Put the spinner, close the spinner when the response is received from backend
        this.isActed = true;
        if (this.isAdd) {
            this.customerDataService.addCustomer(this.selectedCustomer)
            .subscribe(returnedItem=>console.log(returnedItem.n))
            this.isAdd = false;
            this.isEdit = true;
            this.operation = "Edit";
        } else {
            this.customerDataService.updateCustomer(this.selectedCustomer)
            .subscribe(returnedItem=>{
                console.log(returnedItem.n)
                alert("Saved");
            })
        }
    }

    deleteCustomer(id:number) {
        this.isActed = true;
        this.customerDataService.deleteCustomer(id)
        .subscribe(returnedItem=>console.log(returnedItem.n));
        this.closeModal();
    }
}
