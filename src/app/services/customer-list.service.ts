import { Injectable } from '@angular/core';
import { Customer } from '../interfaces/customer';
import { RegisterService } from './register.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerListService {
  constructor(private register: RegisterService) {}
  customers: Customer[] = this.getCustomers();

  persistData() {
    localStorage.setItem('customers', JSON.stringify(this.customers));
  }
  getCustomers(): Customer[] {
    if (localStorage.getItem('customers') === null) {
      localStorage.setItem('customers', JSON.stringify([]));
    }
    return JSON.parse(localStorage.getItem('customers')!);
  }

  getCustomer(id: string) {
    const customer = this.customers.find((user) => user.customerId === id);
    return customer;
  }

  returnAll() {
    return this.getCustomers();
  }

  getNewId() {
    let newId: string = '0';
    if (this.customers.length > 0) {
      newId = `${
        Number(this.customers[this.customers.length - 1].customerId) + 1
      }`;
    }

    return newId;
  }

  addCustomer(customer: Customer) {
    const customerIndex = this.customers.findIndex(
      (user) => user.customerId === customer.customerId
    );
    if (customerIndex === -1) {
      this.customers.push(customer);
      this.register.addRegister(
        `${customer.firstName} ${customer.lastName} has been registered`
      );
      this.persistData();
    } else {
      alert('Customer with that id already exists');
    }
  }

  editCustomer(customer: Customer) {
    const costumerIndex = this.customers.findIndex(
      (user) => user.customerId === customer.customerId
    );
    this.customers[costumerIndex] = customer;
    this.register.addRegister(
      `${customer.customerId}-${customer.firstName} ${customer.lastName} - has been edited`
    );
    this.persistData();
  }

  deleteCustomer(id: string) {
    this.customers = this.customers.filter(
      (customer) => customer.customerId !== id
    );
    console.log(this.customers);
    this.register.addRegister(id + ' has been deleted');
    this.persistData();
  }
}
