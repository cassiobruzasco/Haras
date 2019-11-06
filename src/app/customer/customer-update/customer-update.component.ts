import { Customer } from './../customer.model';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { CustomerService } from './../customer.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'app-customer-update',
    templateUrl: './customer-update.component.html',
    styleUrls: ['./customer-update.component.scss']
})

export class CustomerUpdateComponent implements OnInit, OnDestroy {

    /**
     * list of form control properties
     */
    addCustomerForm: FormGroup;
    private _id = new FormControl('');
    private name = new FormControl('');
    private birth = new FormControl('');
    private registerAge = new FormControl('');
    private currentAge = new FormControl('');
    private sponsor = new FormControl('');
    private sponsorId = new FormControl('');
    private relationship = new FormControl('');
    private address = new FormControl('');
    private addressNumber = new FormControl('');
    private addressExtra = new FormControl('');
    private addressBlock = new FormControl('');
    private zipCode = new FormControl('');
    private mainContact = new FormControl('');
    private extraContact = new FormControl('');
    private paymentType = new FormControl('');
    private paymentAmount = new FormControl('');
    private covenant = new FormControl('');
    private notes = new FormControl('');

    // list of customers
    private customers = [];
    // params from table page
    private sub;
    // current customer
    customer;
    // if the information of this page can be edited
    isEditing = false;
    // label of edit button
    editButton = 'EDITAR';

    constructor(
        private customerService: CustomerService,
        private formBuilder: FormBuilder,
        private http: Http,
        private router: ActivatedRoute,
        private route: Router
    ) { }

    ngOnInit() {
        this.addCustomerForm = this.formBuilder.group({
            name: this.name,
            birth: this.birth,
            registerAge: this.registerAge,
            sponsor: this.sponsor,
            sponsorId: this.sponsorId,
            relationship: this.relationship,
            address: this.address,
            addressNumber: this.addressNumber,
            addressExtra: this.addressExtra,
            addressBlock: this.addressBlock,
            zipCode: this.zipCode,
            mainContact: this.mainContact,
            extraContact: this.extraContact,
            paymentType: this.paymentType,
            paymentAmount: this.paymentAmount,
            covenant: this.covenant,
            notes: this.notes,
            _id: this._id
        });

        this.sub = this.router.params.subscribe(params => {
            this.customer = params;
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    updateCustomer(customer) {
        customer = this.fillCustomerUnchangedValues(customer);
        this.customerService.deleteCustomer(customer).subscribe(
            res => {
                const pos = this.customers.map(cat => customer._id).indexOf(customer._id);
                this.customers.splice(pos, 1);
            },
            error => console.log(error)
        );

        this.customerService.addCustomer(customer).subscribe(
            res => {
                customer = res.json();
                this.customers.push(customer);
                this.route.navigate(['lista']);
            }
        );
    }

    editInfo() {
        if (this.isEditing) {
            this.isEditing = false;
            this.editButton = 'EDITAR';
        } else {
            this.isEditing = true;
            this.editButton = 'CANCELAR';
        }
    }

    // tslint:disable:max-line-length
    fillCustomerUnchangedValues(customer) {
        const auxCustomer = this.addCustomerForm.value;
        const tempCustomer = {
            _id: customer._id,
            name: '',
            birth: '',
            registerAge: '',
            sponsor: '',
            sponsorId: '',
            relationship: '',
            address: '',
            addressNumber: '',
            addressExtra: '',
            addressBlock: '',
            zipCode: '',
            mainContact: '',
            extraContact: '',
            paymentType: '',
            paymentAmount: '',
            covenant: '',
            notes: ''
        };

        // Update name
        if (auxCustomer.name !== '' || auxCustomer.name === null || auxCustomer.name === undefined) {
            tempCustomer.name = auxCustomer.name;
        } else {
            tempCustomer.name = this.customer.name;
        }

        // update birth
        if (auxCustomer.birth !== '' || auxCustomer.birth === null || auxCustomer.birth === undefined) {
            tempCustomer.birth = auxCustomer.birth;
        } else {
            tempCustomer.birth = this.customer.birth;
        }

        // update age
        if (auxCustomer.registerAge !== '' || auxCustomer.registerAge === null || auxCustomer.registerAge === undefined) {
            tempCustomer.registerAge = auxCustomer.registerAge;
        } else {
            tempCustomer.registerAge = this.customer.registerAge;
        }

        // update sponsor
        if (auxCustomer.sponsor !== '' || auxCustomer.sponsor === null || auxCustomer.sponsor === undefined) {
            tempCustomer.sponsor = auxCustomer.sponsor;
        } else {
            tempCustomer.sponsor = this.customer.sponsor;
        }

        // update sponsor id
        if (auxCustomer.sponsorId !== '' || auxCustomer.sponsorId === null || auxCustomer.sponsorId === undefined) {
            tempCustomer.sponsorId = auxCustomer.sponsorId;
        } else {
            tempCustomer.sponsorId = this.customer.sponsorId;
        }

        // update relationship
        if (auxCustomer.relationship !== '' || auxCustomer.relationship === null || auxCustomer.relationship === undefined) {
            tempCustomer.relationship = auxCustomer.relationship;
        } else {
            tempCustomer.relationship = this.customer.relationship;
        }

        // update address
        if (auxCustomer.address !== '' || auxCustomer.address === null || auxCustomer.address === undefined) {
            tempCustomer.address = auxCustomer.address;
        } else {
            tempCustomer.addressBlock = this.customer.address;
        }

        // update address number
        if (auxCustomer.addressNumber !== '' || auxCustomer.addressNumber === null || auxCustomer.addressNumber === undefined) {
            tempCustomer.addressNumber = auxCustomer.addressNumber;
        } else {
            tempCustomer.addressNumber = this.customer.addressNumber;
        }

        // update address extra
        if (auxCustomer.addressExtra !== '' || auxCustomer.addressExtra === null || auxCustomer.addressExtra === undefined) {
            tempCustomer.addressExtra = auxCustomer.addressExtra;
        } else {
            tempCustomer.addressExtra = this.customer.addressExtra;
        }

        // update address block
        if (auxCustomer.addressBlock !== '' || auxCustomer.addressBlock === null || auxCustomer.addressBlock === undefined) {
            tempCustomer.addressBlock = auxCustomer.addressBlock;
        } else {
            tempCustomer.addressBlock = this.customer.addressBlock;
        }

        // update zip
        if (auxCustomer.zipCode !== '' || auxCustomer.zipCode === null || auxCustomer.zipCode === undefined) {
            tempCustomer.zipCode = auxCustomer.zipCode;
        } else {
            tempCustomer.zipCode = this.customer.zipCode;
        }

        // update main contact
        if (auxCustomer.mainContact !== '' || auxCustomer.mainContact === null || auxCustomer.mainContact === undefined) {
            tempCustomer.mainContact = auxCustomer.mainContact;
        } else {
            tempCustomer.mainContact = this.customer.mainContact;
        }

        // update extra contact
        if (auxCustomer.extraContact !== '' || auxCustomer.extraContact === null || auxCustomer.extraContact === undefined) {
            tempCustomer.extraContact = auxCustomer.extraContact;
        } else {
            tempCustomer.extraContact = this.customer.extraContact;
        }

        // update payment type
        if (auxCustomer.paymentType !== '' || auxCustomer.paymentType === null || auxCustomer.paymentType === undefined) {
            tempCustomer.paymentType = auxCustomer.paymentType;
        } else {
            tempCustomer.paymentType = this.customer.paymentType;
        }

        // update payment amount
        if (auxCustomer.paymentAmount !== '' || auxCustomer.paymentAmount === null || auxCustomer.paymentAmount === undefined) {
            tempCustomer.paymentAmount = auxCustomer.paymentAmount;
        } else {
            tempCustomer.paymentAmount = this.customer.paymentAmount;
        }

        // update covenant
        if (auxCustomer.covenant !== '' || auxCustomer.covenant === null || auxCustomer.covenant === undefined) {
            tempCustomer.covenant = auxCustomer.covenant;
        } else {
            tempCustomer.covenant = this.customer.covenant;
        }

        // update notes
        if (auxCustomer.notes !== '' || auxCustomer.notes === null || auxCustomer.notes === undefined) {
            tempCustomer.notes = auxCustomer.notes;
        } else {
            tempCustomer.notes = this.customer.notes;
        }

        customer = tempCustomer;
        // return updated customer
        return customer;
    }
}
