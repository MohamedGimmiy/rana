import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginCredential } from '../types';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginFormGroup : FormGroup;
  constructor(formBuilder : FormBuilder,
              private _router : Router,
              private _loginService : LoginService) { 
    // adding reactive forms builder
    this.loginFormGroup = formBuilder.group({
      email:["",[Validators.required]],
      password: ["", [Validators.required]]
    });

  }

  ngOnInit() {
  }

  login(){
    const loginCredentials : LoginCredential = this.loginFormGroup.value;
    this._loginService.login(loginCredentials)
    .then(data=>{
      this._router.navigate(["/tabs"]);
    })
    .catch(err=>{
      console.log("Auth error =>  ",err);
    });
  }
}
