import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Contact } from '../Contact';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  myForm!: FormGroup;
  closeResult: string = '';

  constructor(private contactSer: ContactsService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      pNo: new FormControl('', Validators.required)
    });
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public onSubmit() {
    const formValue = this.myForm.value;
    const c = new Contact(formValue.fname + ' ' + formValue.lname, formValue.pNo);
    this.contactSer.addContact(c);
    this.clear();
  }

  public clear() {
    this.myForm.setValue({
      fname: '',
      lname: '',
      pNo: ''
    });
  }

}
