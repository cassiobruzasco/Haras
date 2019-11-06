import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { CustomerService } from './customer.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss']
})

export class CustomerComponent implements OnInit {
    @Input() currentAgeForCalculation;
    addCustomerForm: FormGroup;

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

    private customers = [];
    private customer = {};

    // boolean to validate form data
    isValid = true;
    // current empty field
    emptyField: string;

    constructor(private customerService: CustomerService, private formBuilder: FormBuilder, private http: Http, private route: Router) { }

    ngOnInit() {
        this.addCustomerForm = this.formBuilder.group({
            name: this.name,
            birth: this.birth,
            registerAge: this.registerAge,
            currentAge: this.currentAge,
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
            notes: this.notes
        });
    }

    calculateAge(birth) {
        const date = Date.parse(birth);
        const timeDiff = Math.abs(Date.now() - date);
        this.currentAgeForCalculation = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    }

    addCustomer() {
        if (this.checkFormValidation(this.addCustomerForm.value)) {
            this.isValid = true;
            this.customerService.addCustomer(this.addCustomerForm.value).subscribe(
                res => {
                    const newCustomer = res.json();
                    this.customers.push(newCustomer);
                    this.addCustomerForm.reset();
                    this.route.navigate(['lista']);
                }
            );
        } else {
            this.isValid = false;
        }
    }

    checkFormValidation(customer): boolean {
        if (customer.name === '' || customer.name === undefined) {
            this.emptyField = 'Nome';
            return false;
        } else if (customer.birth === undefined || customer.birth === '') {
            this.emptyField = 'Data de nascimento';
            return false;
        } else if (customer.registerAge === '' || customer.registerAge === undefined) {
            this.emptyField = 'Idade';
            return false;
        } else if (customer.sponsor === '' || customer.sponsor === undefined) {
            this.emptyField = 'Responsável';
            return false;
        } else if (customer.sponsorId === '' || customer.sponsorId === undefined) {
            this.emptyField = 'CPF';
            return false;
        } else if (customer.relationship === '' || customer.relationship === undefined) {
            this.emptyField = 'Parentesco';
            return false;
        } else if (customer.address === '' || customer.address === undefined) {
            this.emptyField = 'Endereço';
            return false;
        } else if (customer.addressNumber === '' || customer.addressNumber === undefined) {
            this.emptyField = 'Número';
            return false;
        } else if (customer.addressBlock === '' || customer.addressBlock === undefined) {
            this.emptyField = 'Bairro';
            return false;
        } else if (customer.zipCode === '' || customer.zipCode === undefined) {
            this.emptyField = 'CEP';
            return false;
        } else if (customer.mainContact === '' || customer.mainContact === undefined) {
            this.emptyField = 'Contato 1';
            return false;
        } else if (customer.paymentType === '' || customer.paymentType === undefined) {
            this.emptyField = 'Tipo de Pagamento';
            return false;
        } else if (customer.paymentAmount === '' || customer.paymentAmount === undefined) {
            this.emptyField = 'Valor do Pagamento';
            return false;
        } else if (customer.covenant === '' || customer.covenant === undefined) {
            this.emptyField = 'Convênio';
            return false;
        }
        return true;
    }
}
