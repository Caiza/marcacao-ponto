import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {   MatSnackBarModule } from '@angular/material/snack-bar';

import {  MatInputModule } from '@angular/material/input';
import {  MatListModule } from '@angular/material/list';
import {  MatButtonModule } from '@angular/material/button';
import {  MatTooltipModule } from '@angular/material/tooltip';
import {  MatIconModule } from '@angular/material/icon';

import { CadastrarPjComponent, CadastroPjComponent } from './components';
import { SharedModule } from './../../shared/shared.module';
import { CadastroPjService } from './service';



@NgModule({
  declarations: [
    CadastrarPjComponent,
    CadastroPjComponent
  ],
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
    FlexLayoutModule,
    SharedModule
  ],
  providers:[
    CadastroPjService
  ]
})
export class CadastroPjModule { }
