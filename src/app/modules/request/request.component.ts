import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Request } from 'src/app/core/models/request';
import { RequestService } from 'src/app/core/services/request.service';
import { AddRequestComponent } from './add-request/add-request.component';
import { UpdateRequestComponent } from './update-request/update-request.component';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  requests: Request[] | undefined;
  dataSource = new MatTableDataSource<Request>();
  showBarProgress: boolean = true;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'status', 'person', 'update', 'delete'];
  constructor(private matDialog: MatDialog, private requestService: RequestService,
    private toastr: ToastrService) {

  }
  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getRequest();
  }

  getRequest() {
    this.requestService.getAll().subscribe(data => {
      this.dataSource.data = data as Request[];
      this.showBarProgress = false;
    }, err => {
      console.log(err);
      this.showBarProgress = false;
      this.toastr.error('Ha ocurrido un error cargando los datos de las solicitudes, favor de refrescar la pagina', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-right'
      });
    });
  }


  deleteRequest(requestId: number, templateRef: any) {
    let dialogRef = this.matDialog.open(templateRef, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showBarProgress = true;
        this.requestService.delete(requestId).subscribe(response => {
          if (response) {
            this.toastr.success('', 'Solicitud eliminada', {
              timeOut: 3000,
              positionClass: 'toast-top-right'
            });
            this.showBarProgress = false;
            this.getRequest();
          } else {
            this.showBarProgress = false;
            this.toastr.error('Solicitud no pudo ser eliminada, intente de nuevo por favor.', 'Error', {
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

  updateRequest(request: Request) {
    const dialogRef = this.matDialog.open(UpdateRequestComponent, {
      width: '100%',
      disableClose: true,
      data: request
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getRequest();
    });
  }


  openCreateRequestDialog() {
    const dialogRef = this.matDialog.open(AddRequestComponent, {
      width: '100%',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getRequest();
    });
  }

}
