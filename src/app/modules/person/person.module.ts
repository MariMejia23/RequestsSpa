import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonComponent } from './person.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddPersonComponent } from './add-person/add-person.component';
import { UpdatePersonComponent } from './update-person/update-person.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '', component: PersonComponent
  }
];
 
@NgModule({
  declarations: [
    PersonComponent,
    AddPersonComponent,
    UpdatePersonComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class PersonModule { }
