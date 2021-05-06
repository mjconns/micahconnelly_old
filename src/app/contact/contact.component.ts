import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../services/contact-service';
import { ContactRequest } from '../services/models/contactRequest';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public sendingInfo = false;
  public recentContact: ContactRequest;
  constructor(private contactService: ContactService) { }

  ngOnInit(): void { }

  public contactForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl(''),
  });

  getErrorMessage() {
    if (this.contactForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.contactForm.controls.email.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  sendInfo(event) {
    this.sendingInfo = true;
    let contact: ContactRequest = new ContactRequest();
    contact.email = this.contactForm.get('email').value;
    contact.name = this.contactForm.get('name').value;
    contact.message = this.contactForm.get('message').value;
    contact.timeStamp = Date().toLocaleString();
    this.contactService.createContact(contact).subscribe(
      (data) => {
        this.recentContact = data;
        this.sendingInfo = false;
        this.contactForm.reset();
      },
      (err) => {
        this.sendingInfo = false;
      }
    );
  }
}
