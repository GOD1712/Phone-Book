import { Injectable } from '@angular/core';
import { Contact } from '../Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  contacts: Contact[] = [
    new Contact("Bill Gates", "765-234-5267"),
    new Contact("Eric Elliot", "746-759-3564"),
    new Contact("Fred Allen", "657-843-8792"),
    new Contact("Steve Jobs", "754-983-2351"),
    new Contact("Steve Wozniack", "654-987-9081")
  ];

  constructor() { }

  private cmp(c1: Contact, c2: Contact) {
    if (c1.name < c2.name) {
      return -1;
    }
    else if (c1.name > c2.name) {
      return 1;
    }
    return 0;
  }

  public getContacts(): Contact[] {
    return this.contacts;
  }

  public deleteContact(idx: number) {
    this.contacts.splice(idx, 1);
  }

  public addContact(c: Contact) {
    this.contacts.push(c);
    this.contacts.sort(this.cmp);
  }

  public findByLastName(lname: string): Contact[] {
    let c: Contact[] = [];
    this.contacts.forEach((contact) => {
      let lastName = contact.name.split(" ")[1];
      if (lastName.toLowerCase() === lname.toLowerCase()) {
        c.push(contact);
      }
    });
    return c;
  }

}
