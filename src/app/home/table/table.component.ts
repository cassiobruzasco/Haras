import { SearchPipe } from './filter.pipe';
import { CustomerUpdateComponent } from './../../customer/customer-update/customer-update.component';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { CustomerService } from './../../customer/customer.service';
import { Http } from '@angular/http';
import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
  editButton = 'EDITAR';
  customers = [
    {name: 'Jose'}
  ];
  customer = {};
  @Input() isEditing = false;

  constructor(private http: Http, private customerService: CustomerService, private route: Router) { }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe(
      res => this.customers = res,
      error => console.log(error)
    );
  }

  deleteCustomer(customer) {
    this.customerService.deleteCustomer(customer).subscribe(
      res => {
        const pos = this.customers.map(cat => customer._id).indexOf(customer._id);
        this.customers.splice(pos, 1);
        this.getCustomers();
      },
      error => console.log(error)
    );
  }

  updateCustomer(customer) {
    this.route.navigate(['atualizar', customer]);
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
}
