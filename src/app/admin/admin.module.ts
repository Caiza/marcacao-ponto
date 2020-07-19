import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { PtBrMatPaginatorIntl } from './../shared/pt-br-mat-paginator-intl';
import { FuncionarioService } from './../shared/services/funcionario.service';
import { HttpUtilService } from './../shared/services/http-util.service';
import { LancamentoService } from './../shared/services/lancamento.service';
import { SharedModule } from './../shared/shared.module';
import { AdminComponent } from './components/admin.component';
import { AtualizacaoComponent } from './components/atualizacao/atualizacao.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { ConfirmarDialog, ListagemComponent } from './components/listagem/listagem.component';
import { AdminGuard } from './services/admin-guard.service';




@NgModule({
  declarations: [ListagemComponent,
    CadastroComponent,
    AtualizacaoComponent,
    AdminComponent,
    ConfirmarDialog
  ],

  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBar,
    MatTableModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatPaginatorModule,
    MatPaginatorIntl,
    MatSortModule

  ],
  providers:[
    LancamentoService,
    HttpUtilService,
    PtBrMatPaginatorIntl,
    FuncionarioService,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    { provide: MatPaginatorIntl, useClass: PtBrMatPaginatorIntl},
    AdminGuard
  ],
  entryComponents: [ ConfirmarDialog ]
})
export class AdminModule { }
