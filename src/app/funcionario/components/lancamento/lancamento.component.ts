import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { Lancamento } from './../../../shared/models/lancamento.model';
import { Tipo } from './../../../shared/models/tipo.enum';
import { HttpUtilService } from './../../../shared/services/http-util.service';
import { LancamentoService } from './../../../shared/services/lancamento.service';

declare var navigator: any;

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent implements OnInit {

  @ViewChild(MatSelect, { static: true }) matSelect: MatSelect;

  private dataAtualEn: string;
  dataAtual: string;
  geoLocation: string;
  ultimoTipoLancado: string;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private httpUtil: HttpUtilService,
    private LancamentoService: LancamentoService
  ) { }

  ngOnInit(): void {

    this.dataAtual = moment().format('DD/MM/YYYY HH:mm:ss');
    this.dataAtualEn = moment().format('YYY-MM-DD HH:mm:ss');
    this.obterGeoLocation();
    this.ultimoTipoLancado = '';
    this.obterUltimoLancamento();

  }

  obterGeoLocation(): string {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position =>
        this.geoLocation = `${position.coords.latitude}, ${position.coords.longitude}`);
    }
    return '';
  }

  iniciarTrabalho() {
    this.cadastrar(Tipo.INICIO_TRABALHO);
  }

  terminarTrabalho() {
    this.cadastrar(Tipo.TERMINO_TRABALHO);
  }

  iniciarAlmoco() {
    this.cadastrar(Tipo.INICIO_ALMOCO);
  }

  terminarAlmoco() {
    this.cadastrar(Tipo.TERMINO_ALMOCO);
  }

  obterUltimoLancamento() {
    this.LancamentoService.buscarUltimoTipoLancamento().subscribe(
      data => {
        this.ultimoTipoLancado = data.data ? data.data.tipo : '';
      },
      err => {
        const msg: string = "Erro ao obter ultimo lancamento."
        this.snackBar.open(msg, "Erro", { duration: 5000 });
      }
    );
  }

  cadastrar(tipo: Tipo) {
    const lancamento: Lancamento = new Lancamento(
      this.dataAtualEn,
      tipo,
      this.geoLocation,
      this.httpUtil.obterIdUsuario()
    );

    this.LancamentoService.cadastrar(lancamento).subscribe(
      data => {
        const msg: string = "Lançamento realizado com sucesso!";
        this.snackBar.open(msg, "Sucesso", { duration: 5000 });
        this.router.navigate(['/funcionario/listagem']);
      },
      err => {
        let msg: string = "Tente novamentes em instantes."
        if (err.status == 400) {
          msg = err.error.error.join('')
        }
        this.snackBar.open(msg, "Erro", {duration: 5000})
      }
    );
  }

  obterUrlMapa(): string {
    return "https://www.google.com/maps/search/?api=1&query="
      + this.geoLocation;
  }

  exibirInicioTrabalho(): boolean {
    return this.ultimoTipoLancado == '' ||
      this.ultimoTipoLancado == Tipo.TERMINO_TRABALHO;
  }

  exibirTerminoTrabalho(): boolean {
    return this.ultimoTipoLancado == Tipo.INICIO_TRABALHO ||
      this.ultimoTipoLancado == Tipo.TERMINO_TRABALHO;
  }

  exibirInicioAlmoco(): boolean {
    return this.ultimoTipoLancado == Tipo.INICIO_ALMOCO;
  }

  exibirTerminoAlmoco(): boolean {
    return this.ultimoTipoLancado == Tipo.TERMINO_ALMOCO;
  }

}
