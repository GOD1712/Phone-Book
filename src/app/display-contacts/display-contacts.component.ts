import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Contact } from '../Contact';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-display-contacts',
  templateUrl: './display-contacts.component.html',
  styleUrls: ['./display-contacts.component.css']
})
export class DisplayContactsComponent implements OnInit {

  contacts: Contact[] = [];
  myForm!: FormGroup;

  constructor(private contactsSer: ContactsService) { }

  ngOnInit(): void {
    this.contacts = this.contactsSer.getContacts();
    this.myForm = new FormGroup({
      lname: new FormControl('')
    });
  }

  deleteContact(idx: number) {
    this.contactsSer.deleteContact(idx);
  }

  onSubmit() {
    const c: Contact[] = this.contactsSer.findByLastName(this.myForm.value.lname);

    this.contacts = c;
  }

  cancel() {
    this.myForm.setValue({
      lname: ''
    });
    this.contacts = this.contactsSer.getContacts();
  }

}
