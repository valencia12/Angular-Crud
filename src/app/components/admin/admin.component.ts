import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Customer } from 'src/app/interfaces/customer';
import { CustomerListService } from 'src/app/services/customer-list.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  editFlag = false;
  list: Customer[] = [];
  addForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerList: CustomerListService
  ) {
    this.addForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthday: ['', Validators.required],
      costumerId: [{ value: '', disabled: true }, Validators.required],
      country: ['', Validators.required],
      cellphone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      homePhone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      profession: ['', Validators.required],
      incomes: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.list = this.customerList.getCustomers();
    this.addForm.patchValue({
      costumerId: this.customerList.getNewId(),
    });
  }

  get f() {
    return this.addForm.controls;
  }

  onSubmit() {
    if (this.addForm.invalid) {
      return; // Prevent submission
    }

    const customer: Customer = {
      firstName: this.f['firstName'].value,
      lastName: this.f['lastName'].value,
      birthday: this.f['birthday'].value,
      customerId: this.f['costumerId'].value,
      country: this.f['country'].value,
      cellphone: this.f['cellphone'].value,
      homePhone: this.f['homePhone'].value,
      profession: this.f['profession'].value,
      incomes: this.f['incomes'].value,
      address: this.f['address'].value,
    };

    if (this.editFlag) {
      this.customerList.editCustomer(customer);
    } else {
      this.customerList.addCustomer(customer);
    }

    this.list = this.customerList.getCustomers();
    this.clearForm();
  }

  populateEditForm(id: string) {
    this.editFlag = true;
    const customer = this.customerList.getCustomer(id);
    if (customer) {
      this.addForm.patchValue({
        firstName: customer.firstName,
        lastName: customer.lastName,
        birthday: customer.birthday,
        costumerId: customer.customerId,
        country: customer.country,
        cellphone: customer.cellphone,
        homePhone: customer.homePhone,
        profession: customer.profession,
        incomes: customer.incomes,
        address: customer.address,
      });
    }
  }

  onEdit() {
    if (this.addForm.invalid) {
      return; // Prevent submission
    }

    const customer: Customer = {
      firstName: this.f['firstName'].value,
      lastName: this.f['lastName'].value,
      birthday: this.f['birthday'].value,
      customerId: this.f['costumerId'].value,
      country: this.f['country'].value,
      cellphone: this.f['cellphone'].value,
      homePhone: this.f['homePhone'].value,
      profession: this.f['profession'].value,
      incomes: this.f['incomes'].value,
      address: this.f['address'].value,
    };

    this.customerList.editCustomer(customer);
    this.list = this.customerList.getCustomers();
    this.cancelEdit();
  }

  cancelEdit() {
    this.editFlag = false;
    this.clearForm();
  }

  clearForm() {
    this.addForm.reset();
    this.addForm.patchValue({
      costumerId: this.customerList.getNewId(),
    });
  }

  deleteCustomer(id: string) {
    this.customerList.deleteCustomer(id);
    this.list = this.customerList.getCustomers();
  }

  formatPhoneNumber(controlName: string) {
    let phoneNumber = this.f[controlName].value;
    if (phoneNumber && phoneNumber.length === 8 && !phoneNumber.includes('-')) {
      phoneNumber = phoneNumber.slice(0, 4) + '-' + phoneNumber.slice(4);
      this.f[controlName].setValue(phoneNumber);
    }
  }
}
