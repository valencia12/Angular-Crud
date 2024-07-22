import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  list: any;
  constructor(private register: RegisterService) {}

  ngOnInit(): void {
    this.list = this.register.getRegisters();
  }
}
