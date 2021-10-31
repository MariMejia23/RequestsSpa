import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Person } from 'src/app/core/models/person';
import { PersonService } from 'src/app/core/services/person.service';
import { AddPersonComponent } from './add-person/add-person.component';
import { UpdatePersonComponent } from './update-person/update-person.component';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  persons: Person[] | undefined;
  dataSource = new MatTableDataSource<Person>();
  showBarProgress: boolean = true;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'lastName', 'birthDay', 'passport', 'address', 'gender', 'photo', 'update', 'delete'];
  constructor(private matDialog: MatDialog, private personService: PersonService,
    private toastr: ToastrService) {

  }
  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getPersons();
  }

  getPersons() {
    this.personService.getAll().subscribe(data => {
      this.dataSource.data = data as Person[];
      this.showBarProgress = false;
    }, err => {
      console.log(err);
      this.showBarProgress = false;
      this.toastr.error('Ha ocurrido un error cargando los datos de las personas, favor de refrescar la pagina', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-right'
      });
    });
  }


  deletePerson(personId: number, templateRef: any) {
    let dialogRef = this.matDialog.open(templateRef, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showBarProgress = true;
        this.personService.delete(personId).subscribe(response => {
          if (response) {
            this.toastr.success('', 'Persona eliminado', {
              timeOut: 3000,
              positionClass: 'toast-top-right'
            });
            this.showBarProgress = false;
            this.getPersons();
          } else {
            this.showBarProgress = false;
            this.toastr.error('Persona no pudo ser eliminada, intente de nuevo por favor.', 'Error', {
              timeOut: 3000,
              positionClass: 'toast-top-right'
            });
          }
        }, err => {
          console.log(err);
          this.showBarProgress = false;
          this.toastr.error('Ha ocurrido un error inesperado, intente de nuevo por favor.', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-right'
          });
        });
      }
    });
  }

  updatePerson(person: Person) {
    const dialogRef = this.matDialog.open(UpdatePersonComponent, {
      width: '100%',
      disableClose: true,
      data: person
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPersons();
    });
  }


  openCreatePersonDialog() {
    const dialogRef = this.matDialog.open(AddPersonComponent, {
      width: '100%',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPersons();
    });
  }
}
