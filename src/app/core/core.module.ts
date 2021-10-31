import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './authentication/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { NavComponent } from '../layouts/nav/nav.component';



@NgModule({
  declarations: [
    LoginComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
