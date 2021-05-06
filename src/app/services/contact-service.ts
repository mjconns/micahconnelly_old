import { Injectable } from '@angular/core';
import { ContactRequest} from './models/contactRequest';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  createContact(contact: ContactRequest) {
    return this.http.post<ContactRequest>('/api/Contact', contact);
  }

  getContactItem(id: string): Observable<ContactRequest> {
    return this.http.get<ContactRequest>('/api/Contact/' + id);
  }
}
