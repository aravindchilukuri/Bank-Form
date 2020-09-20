import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-bank-view',
  templateUrl: './bank-view.component.html',
  styleUrls: ['./bank-view.component.less']
})
export class BankViewComponent implements OnInit {
  submitted = false;
  district: any = ['Hyderabad', 'Mumbai'];
  bank: any = ['SBI', 'HDFC'];
  branchname: any = ['NalgondaSBI', 'ThaneHDFC'];
  state: any = ['Telangana', 'Maharastra'];
  formValue: string;
  private formArray: Array<any> = [];
  onGetValues: any;
  bankView: any;
  inputvalue: any;
  popup = false;
  noResults: string;
  constructor(public fb: FormBuilder) { }

  oppoSuitsForm = this.fb.group({
    branchname: ['', [Validators.required]],
    bank: ['', [Validators.required]],
    district: ['', [Validators.required]],
    state: ['', [Validators.required]],
    ifsc: ['', [Validators.required]]
  });

  ngOnInit() {
    this.onGetLocalValues();
  }

  onSubmit() {
    this.submitted = true;
    this.formValue = this.oppoSuitsForm.value;
    // this.formArray.push(this.formValue);
    console.log('form value', this.formValue['branchname'])
    this.bankView = this.onGetValues.filter(ele => {
      return ele.bank === this.formValue['bank'] && ele.branchname === this.formValue['branchname'];
    })[0];
    console.log(this.bankView);
    if (this.bankView) {
      this.popup = true;
    }else if(!this.bankView) {
      this.noResults = "No Results found"
    }
  }
  onGetLocalValues() {
    this.onGetValues = JSON.parse(localStorage.getItem('bankform'));
  }

  inputSubmit(event: any) {
    this.inputvalue = event.target.player.value;
    this.bankView = this.onGetValues.filter(ele => {
      return ele.ifsc === this.inputvalue;
    })[0];
    if (this.bankView) {
      this.popup = true;
    } else if(!this.bankView) {
      this.noResults = "No Results found"
    }
  }
}
