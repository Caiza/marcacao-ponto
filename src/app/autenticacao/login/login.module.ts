import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent, LogarComponent } from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {   MatSnackBarModule } from '@angular/material/snack-bar';

import {  MatInputModule } from '@angular/material/input';
import {  MatListModule } from '@angular/material/list';
import {  MatButtonModule } from '@angular/material/button';
import {  MatTooltipModule } from '@angular/material/tooltip';
import {  MatIconModule } from '@angular/material/icon';

import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginService } from './services';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    MatInputModule,
    MatSnackBarModule,
    FlexLayoutModule
  ],
  declarations: [
    LoginComponent,
    LogarComponent
  ],
  providers:[
    LoginService
  ]

})
export class LoginModule { }
