import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AdminRoutingModule } from './admin/admin-routing.module';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  CadastroPfModule,
  CadastroPjModule,
  CadastroPjRoutingModule,
  LoginModule,
  LoginRoutingModule,
} from './autenticacao';
import { CadastroPfRoutingModule } from './autenticacao/cadastro-pf/cadastro-pf-routing.module';
import { FuncionarioRoutingModule } from './funcionario/funcionario-routing.module';
import { FuncionarioModule } from './funcionario/funcionario.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LoginModule,
    LoginRoutingModule,
    CadastroPjModule,
    CadastroPjRoutingModule,
    CadastroPfModule,
    CadastroPfRoutingModule,   
    FlexLayoutModule,
    MatTooltipModule,
    MatIconModule,
    MatToolbarModule, 
    FuncionarioModule,   
    FuncionarioRoutingModule,
    AdminModule,
    AdminRoutingModule, 
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
