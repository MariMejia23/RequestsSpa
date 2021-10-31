import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Person } from 'src/app/core/models/person';
import { Request } from 'src/app/core/models/request';
import { Status } from 'src/app/core/models/status';
import { PersonService } from 'src/app/core/services/person.service';
import { RequestService } from 'src/app/core/services/request.service';
import { StatusService } from 'src/app/core/services/status.service';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css']
})
export class AddRequestComponent implements OnInit {

  request: Request | undefined;
  persons: Person[] | undefined;
  status: Status[] | undefined;
  showProgressBar: boolean | undefined;
  requestForm = this.fb.group({
    statusId: ['', Validators.required],
    personId: ['', Validators.required]    
  });

  get statusId() {
    return this.requestForm.get('statusId');
  }
  get personId() {
    return this.requestForm.get('personId');
  }
 
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddRequestComponent>,
    private requestService: RequestService, private toastr: ToastrService, private personService: PersonService,
    private statusService: StatusService) { }

  ngOnInit(): void {
    this.getPersons();
    this.getStatus();
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
    this.statusService.getAll().subscribe(data => {
      this.status = data.body as Status[];
    }, err => {
      console.log(err);
      this.toastr.error('Ha ocurrido un error cargando los estatus, favor de refrescar la pagina', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-right'
      });
    });
  }
  createRequest() {
    this.showProgressBar = true;
    this.request = {
      statusId: this.statusId?.value,
      personId: this.personId?.value
    }
    console.log(this.request);
    this.requestService.create(this.request).subscribe(response => {
      console.log(response);
      if (response.status == 204) {
        this.toastr.success('', 'Solicitud creada', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });
        this.dialogRef.close(true);
      } else {
        this.toastr.error('Solicitud no pudo ser creada, intente de nuevo por favor.', 'Error', {
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
