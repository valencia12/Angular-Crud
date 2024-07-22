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
  addForm: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private costumerList: CustomerListService
  ) {}

  ngOnInit(): void {
    this.list = this.costumerList.getCustomers();
    this.addForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      costumerId: [`${this.costumerList.getNewId()}`, [Validators.required]],
      country: ['', [Validators.required]],
      cellphone: ['', [Validators.required]],
      homePhone: ['', [Validators.required]],
      profession: ['', [Validators.required]],
      incomes: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
    this.f['costumerId'].disable();
  }

  get f() {
    return this.addForm.controls;
  }

  onSubmit() {
    if (this.addForm.invalid) {
      alert('Please fill in all the fields');
      return;
    }

    const firstName = this.f['firstName'].value;
    const lastName = this.f['lastName'].value;
    const birthday = this.f['birthday'].value;
    const costumerId = this.f['costumerId'].value;
    const country = this.f['country'].value;
    const cellphone = this.f['cellphone'].value;
    const homePhone = this.f['homePhone'].value;
    const profession = this.f['profession'].value;
    const incomes = this.f['incomes'].value;
    const address = this.f['address'].value;
    let costumer: Customer = {
      firstName: firstName,
      lastName: lastName,
      birthday: birthday,
      customerId: costumerId,
      country: country,
      cellphone: cellphone,
      homePhone: homePhone,
      profession: profession,
      incomes: incomes,
      address: address,
    };

    this.costumerList.addCustomer(costumer);
    this.list = this.costumerList.getCustomers();
    this.clearForm();
  }

  populateEditForm(id: string) {
    this.editFlag = true;
    const customer = this.costumerList.getCustomer(id);
    this.f['firstName'].setValue(customer?.firstName);
    this.f['lastName'].setValue(customer?.lastName);
    this.f['birthday'].setValue(customer?.birthday);
    this.f['costumerId'].setValue(customer?.customerId);
    this.f['costumerId'].disable();
    this.f['country'].setValue(customer?.country);
    this.f['cellphone'].setValue(customer?.cellphone);
    this.f['homePhone'].setValue(customer?.homePhone);
    this.f['profession'].setValue(customer?.profession);
    this.f['incomes'].setValue(customer?.incomes);
    this.f['address'].setValue(customer?.address);
  }

  onEdit() {
    if (this.addForm.invalid) {
      alert('Please fill in all the fields');
      return;
    }
    const firstName = this.f['firstName'].value;
    const lastName = this.f['lastName'].value;
    const birthday = this.f['birthday'].value;
    const costumerId = this.f['costumerId'].value;
    const country = this.f['country'].value;
    const cellphone = this.f['cellphone'].value;
    const homePhone = this.f['homePhone'].value;
    const profession = this.f['profession'].value;
    const incomes = this.f['incomes'].value;
    const address = this.f['address'].value;
    let costumer: Customer = {
      firstName: firstName,
      lastName: lastName,
      birthday: birthday,
      customerId: costumerId,
      country: country,
      cellphone: cellphone,
      homePhone: homePhone,
      profession: profession,
      incomes: incomes,
      address: address,
    };

    this.costumerList.editCustomer(costumer);
    this.list = this.costumerList.getCustomers();
    this.cancelEdit();
  }

  cancelEdit() {
    this.editFlag = false;
    this.clearForm();
  }

  clearForm() {
    this.addForm.reset();
    this.f['costumerId'].setValue(this.costumerList.getNewId());
  }

  deleteCustomer(id: string) {
    this.costumerList.deleteCustomer(id);
    this.list = this.costumerList.getCustomers();
  }
}
