import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { CustomerListService } from 'src/app/services/customer-list.service';
import { of } from 'rxjs';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let mockCustomerListService: jasmine.SpyObj<CustomerListService>;

  beforeEach(async () => {
   
    const customerListServiceSpy = jasmine.createSpyObj('CustomerListService', ['getCustomers', 'getNewId', 'addCustomer', 'editCustomer', 'deleteCustomer', 'getCustomer']);
    customerListServiceSpy.getCustomers.and.returnValue([]);
    customerListServiceSpy.getNewId.and.returnValue('123');
    customerListServiceSpy.getCustomer.and.returnValue({});

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule], 
      declarations: [AdminComponent],
      providers: [
        { provide: CustomerListService, useValue: customerListServiceSpy } 
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    mockCustomerListService = TestBed.inject(CustomerListService) as jasmine.SpyObj<CustomerListService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an empty form initially', () => {
    expect(component.addForm.valid).toBeFalsy();
  });

  describe('AdminComponent', () => {
    let component: AdminComponent;
    let fixture: ComponentFixture<AdminComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ AdminComponent ],
        imports: [ ReactiveFormsModule ] 
      })
      .compileComponents();
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(AdminComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
   
  });
  
 
  
});
