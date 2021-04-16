import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartStatesComponent } from './cart-states.component';

describe('CartStatesComponent', () => {
  let component: CartStatesComponent;
  let fixture: ComponentFixture<CartStatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartStatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
