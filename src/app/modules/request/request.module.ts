import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestComponent } from './request.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { UpdateRequestComponent } from './update-request/update-request.component';
import { AddRequestComponent } from './add-request/add-request.component';



@NgModule({
  declarations: [
    RequestComponent,
    UpdateRequestComponent,
    AddRequestComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule
  ]
})
export class RequestModule { }
