import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    password: ['', Validators.required],
    userName: ['', Validators.required]

  });
  get userName() {
    return this.loginForm.get('userName');
  }
  get password() {
    return this.loginForm.get('password');
  }

  constructor(private fb: FormBuilder, private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {

  }

  onSubmit() {
    this.router.navigate(['/request']);
    this.toastr.success('Usuario correcto', 'Usuario Logeado', {
      timeOut: 3000,
      positionClass: 'toast-top-right'
    });
  }

}
