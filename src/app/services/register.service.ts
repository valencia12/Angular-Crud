import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  register: { msg: string; date: Date }[] = this.getRegisters();
  constructor() {}

  addRegister(msg: string) {
    this.register.push({ msg: msg, date: new Date() });
    this.persistData();
  }

  persistData() {
    localStorage.setItem('register', JSON.stringify(this.register));
  }
  getRegisters() {
    if (localStorage.getItem('register') === null) {
      localStorage.setItem('register', JSON.stringify([]));
    }
    return JSON.parse(localStorage.getItem('register')!);
  }
}
