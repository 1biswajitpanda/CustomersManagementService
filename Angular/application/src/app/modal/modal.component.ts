import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Customer } from "../customer";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  operation : string;
  selectedCustomer : Customer = {
    customerId : 0,
    name : "",
    profession : "",
    image : "../../assets/img_avatar.png"
  }

  constructor() { }

  ngOnInit() {
    this.selectedCustomer = this.customer || this.selectedCustomer;
    this.operation = this.customer ? "Edit" : "Add";
  }



  @Input() customer : Customer;
  @Output() modalActionClose = new EventEmitter<boolean>()

  closeModal(){
    this.modalActionClose.emit(true)
  }

}
