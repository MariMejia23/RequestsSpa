import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Person } from 'src/app/core/models/person';
import { Request } from 'src/app/core/models/request';
import { Status } from 'src/app/core/models/status';
import { PersonService } from 'src/app/core/services/person.service';
import { RequestService } from 'src/app/core/services/request.service';
import { StatusService } from 'src/app/core/services/status.service';
import { AddRequestComponent } from '../add-request/add-request.component';

@Component({
  selector: 'app-update-request',
  templateUrl: './update-request.component.html',
  styleUrls: ['./update-request.component.css']
})
export class UpdateRequestComponent implements OnInit {

  request: Request | undefined;
  persons: Person[] | undefined;
  status: Status[] | undefined;
  showProgressBar: boolean | undefined;
  requestForm = this.fb.group({
    statusId: [this.data.statusId, Validators.required],
    personId: [this.data.personId, Validators.required]
  });

  get statusId() {
    return this.requestForm.get('statusId');
  }
  get personId() {
    return this.requestForm.get('personId');
  }
 
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddRequestComponent>,
    private requestService: RequestService, private toastr: ToastrService, private personService: PersonService,
    private statusService: StatusService, @Inject(MAT_DIALOG_DATA) public data: Request) { }

  ngOnInit(): void {
    this.getPersons();
    this.getStatus();
    console.log(this.requestForm);
  }
  getPersons() {
    this.showProgressBar = true;
    this.personService.getAll().subscribe(data => {
      this.persons = data.body as Person[];
      this.showProgressBar = false;
    }, err => {
      this.showProgressBar = false;
      console.log(err);
      this.toastr.error('Ha ocurrido un error cargando los datos de las personas, favor de refrescar la pagina', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-right'
      });
    });
  }
  getStatus() { 
    this.showProgressBar = true;
    this.statusService.getAll().subscribe(data => {
      this.status = data.body as Status[];
      this.showProgressBar = false;
    }, err => {
      this.showProgressBar = false;
      console.log(err);
      this.toastr.error('Ha ocurrido un error cargando los estatus, favor de refrescar la pagina', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-right'
      });
    });
  }
  updateRequest() { 
    this.showProgressBar = true;
    this.request = {
      id: this.data.id,
      statusId: this.statusId?.value,
      personId: this.personId?.value,
      createdAt: this.data.createdAt
    }
    this.requestService.update(this.request).subscribe(response => {
      if (response.status == 204) {
        this.toastr.success('', 'Solicitud actualizada', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });
        this.dialogRef.close(true);
      } else {
        this.toastr.error('Solicitud no pudo ser actualizada, intente de nuevo por favor.', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });
      }
      this.showProgressBar = false;
    }, err => {
      console.log(err);
      this.toastr.error('Ha ocurrido un error inesperado, intente de nuevo por favor.', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-right'
      });
    });
  }

}
