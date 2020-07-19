import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Lancamento } from './../../../shared/models/lancamento.model';
import { LancamentoService } from './../../../shared/services/lancamento.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  dataSource: MatTableDataSource<Lancamento>;
  colunas: string[] = ['data', 'tipo', 'localizacao'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private LancamentoService: LancamentoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.LancamentoService.listarTodosLancamentos()
    .subscribe(
      data => {
        const lancamentos = data['data'] as Lancamento[];
        this.dataSource = new MatTableDataSource<Lancamento>(lancamentos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      err => {
        const msg: string = "Erro obtendo";
        this.snackBar.open(msg, "Erro", { duration: 5000});
      }
    );
  }

}
