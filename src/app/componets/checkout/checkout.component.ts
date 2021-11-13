import { State } from './../../common/state';
import { Country } from './../../common/country';
import { Luv2ShopFormService } from './../../services/luv2-shop-form.service';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { CartService } from './../../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnChanges {
  chechoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private luv2ShopFormService: Luv2ShopFormService,
    private CartService: CartService
  ) {}
  ngOnInit(): void {
    this.chechoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',[Validators.required, Validators.minLength(2)]),
        lastName: new FormControl('',[Validators.required, Validators.minLength(2)]),
        email: new FormControl('',[Validators.required, Validators.email]),
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });

    const startMonth: number = new Date().getMonth() + 1;
    // console.log("startMonth:" + startMonth);

    this.luv2ShopFormService
      .getCreditCardMonths(startMonth)
      .subscribe((data) => {
        //  console.log("Retrieved credit card months" + JSON.stringify(data));
        this.creditCardMonths = data;
      });
    this.luv2ShopFormService.getCreditCardYears().subscribe((data) => {
      this.creditCardYears = data;
    });

    // populate countries

    this.luv2ShopFormService.getCountries().subscribe((data) => {
      this.countries = data;
    });

    // populate states

    this.updatePurchaseStates();

  } // ngOnInit ends here

  get firstName() {return this.chechoutFormGroup.get('customer.firstName');}
  get lastName() {return this.chechoutFormGroup.get('customer.lastName');}
  get email() {return this.chechoutFormGroup.get('customer.email')}


  updatePurchaseStates() {
    this.CartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );

    this.CartService.totalPrice.subscribe((data) => (this.totalPrice = data));
    this.CartService.computeCartTotals();
  }

  onSubmit() {
    if (this.chechoutFormGroup.invalid) {
      this.chechoutFormGroup.markAllAsTouched();
    }
    console.log('Handling the submit button ');
    console.log("the email address is" + this.chechoutFormGroup.get('customer').value.email);
    console.log("the country address is" + this.chechoutFormGroup.get('shippingAddress').value.country.name);
  }

  copyShippingAddressToBillingAdress(event) {
    if (event.target.checked) {
      this.chechoutFormGroup.controls.billingAddress.setValue(
        this.chechoutFormGroup.controls.shippingAddress.value
        );
        //big fix for states
        this.billingAddressStates = this.shippingAddressStates;

    } else {
      this.chechoutFormGroup.controls.billingAddress.reset();
    }
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.chechoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(
      creditCardFormGroup.value.expirationYear
    );
    //const select: = creditCardFormGroup.value.expirationYear;

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }
    this.luv2ShopFormService
      .getCreditCardMonths(startMonth)
      .subscribe((data) => {
        //  console.log("Retrieved credit card months" + JSON.stringify(data));
        this.creditCardMonths = data;
      });
  }

  getStates(formGroupName: string) {
    // give me shipping or blling address
    const formGroup = this.chechoutFormGroup.get(formGroupName);
    const countryCode = formGroup.value.country.code;
    const CountryName = formGroup.value.country.name;
    console.log(CountryName);
    this.luv2ShopFormService.getStates(countryCode).subscribe((data) => {
      if (formGroupName === 'shippingAddress') {
        this.shippingAddressStates = data;
      }
      else {
        this.billingAddressStates = data;
      }
      // select first item by default
      formGroup.get('state').setValue(data[0]);
    });

  }

  ngOnChanges(changes: SimpleChanges) {}
}
