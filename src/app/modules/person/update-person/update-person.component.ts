import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Person } from 'src/app/core/models/person';
import { PersonService } from 'src/app/core/services/person.service';
import { AddPersonComponent } from '../add-person/add-person.component';

@Component({
  selector: 'app-update-person',
  templateUrl: './update-person.component.html',
  styleUrls: ['./update-person.component.css']
})
export class UpdatePersonComponent implements OnInit {
  person: Person | undefined;
  showProgressBar: boolean | undefined;
  personForm = this.fb.group({
    id: [this.data.id, Validators.required],
    name: [this.data.name, Validators.required],
    lastName: [this.data.lastName, Validators.required],
    birthDay: [this.data.birthDay, Validators.required],
    passport: [this.data.passport, Validators.required],
    address: [this.data.address, Validators.required],
    gender: [this.data.gender, Validators.required],
    photo: [this.data.photo, Validators.required],
  });
  get id() {
    return this.personForm.get('id');
  }
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
    private personService: PersonService, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: Person) { }

  ngOnInit(): void {
  }
  updatePerson() {
    this.showProgressBar = true;
    this.person = {
      id: this.id?.value,
      name: this.name?.value,
      lastName: this.lastName?.value,
      birthDay: this.birthDay?.value,
      passport: this.passport?.value,
      address: this.address?.value,
      gender: this.gender?.value,
      photo: this.photo?.value
    }
    this.personService.update(this.person).subscribe(response => {
      if (response) {
        this.toastr.success('', 'Persona actualizada', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });
        this.dialogRef.close(true);
      } else {
        this.toastr.error('Persona no pudo ser actualizada, intente de nuevo por favor.', 'Error', {
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
