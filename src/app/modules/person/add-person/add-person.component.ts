import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Person } from 'src/app/core/models/person';
import { PersonService } from 'src/app/core/services/person.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {
  person: Person | undefined;
  showProgressBar: boolean | undefined;
  personForm = this.fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    birthDay: ['', Validators.required],
    passport: ['', Validators.required],
    address: ['', Validators.required],
    gender: ['', Validators.required],
    photo: ['', Validators.required],
  });

  get name() {
    return this.personForm.get('name');
  }
  get lastName() {
    return this.personForm.get('lastName');
  }
  get birthDay() {
    return this.personForm.get('birthDay');
  }
  get passport() {
    return this.personForm.get('passport');
  }
  get address() {
    return this.personForm.get('address');
  }
  get gender() {
    return this.personForm.get('gender');
  }
  get photo() {
    return this.personForm.get('photo');
  }
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddPersonComponent>,
    private personService: PersonService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  createPerson() {
    this.showProgressBar = true;
    this.person = {
      name: this.name?.value,
      lastName: this.lastName?.value,
      birthDay: this.birthDay?.value,
      passport: this.passport?.value,
      address: this.address?.value,
      gender: this.gender?.value,
      photo: this.photo?.value
    }
    this.personService.create(this.person).subscribe(response => {
      if (response.status) {
        this.toastr.success('', 'Persona creada', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });
        this.dialogRef.close(true);
      } else {
        this.toastr.error('Persona no pudo ser creada, intente de nuevo por favor.', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });
      }
      this.showProgressBar = false;
    }, err => {
      this.showProgressBar = false;
      console.log(err);
      this.toastr.error('Ha ocurrido un error inesperado, intente de nuevo por favor.', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-right'
      });
    });
  }

}
