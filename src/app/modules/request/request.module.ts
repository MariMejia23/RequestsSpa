import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestComponent } from './request.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { UpdateRequestComponent } from './update-request/update-request.component';
import { AddRequestComponent } from './add-request/add-request.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '', component: RequestComponent
  }
];

@NgModule({
  declarations: [
    RequestComponent,
    UpdateRequestComponent,
    AddRequestComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class RequestModule { }
