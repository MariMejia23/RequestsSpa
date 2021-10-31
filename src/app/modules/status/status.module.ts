import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusComponent } from './status.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';



@NgModule({
  declarations: [
    StatusComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule
  ]
})
export class StatusModule { }
