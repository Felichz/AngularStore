import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  emailInput: FormControl;

  constructor() {

    this.emailInput = new FormControl('', [
      Validators.required,
      Validators.email
    ]);

    // this.emailInput.valueChanges.subscribe( changes => {
    //   console.log(changes);
    // });
  }

  ngOnInit() {
  }

  sendMail() {
    console.log( this.emailInput.value );
  }

}
