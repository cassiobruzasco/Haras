import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CustomerService {

    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }

    getCustomers() {
        return this.http.get('/customers').map(res => res.json());
    }

    addCustomer(customer) {
        return this.http.post('/customers', JSON.stringify(customer), this.options);
    }

    editCustomer(customer) {
        return this.http.put('/customers/' + customer._id, JSON.stringify(customer), this.options);
    }

    deleteCustomer(customer) {
        return this.http.delete('/customers/' + customer._id, this.options);
    }

}
