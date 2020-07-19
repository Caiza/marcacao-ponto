import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import { Lancamento } from './../../../shared/models/lancamento.model';
import { Tipo } from './../../../shared/models/tipo.enum';
import { LancamentoService } from './../../../shared/services/lancamento.service';


@Component({
  selector: 'app-atualizacao',
  templateUrl: './atualizacao.component.html',
  styleUrls: ['./atualizacao.component.css']
})
export class AtualizacaoComponent implements OnInit {

  form: FormGroup;
  horas: string[];
  minutos: string[];
  tipos: string[];
  lancamentoId: string;
  localizacao: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private sncakBar: MatSnackBar,
    private router: Router,
    private lancamentoService: LancamentoService

  ) { }

  ngOnInit(): void {
    this.lancamentoId = this.route.snapshot.paramMap.get('lancamentoId');
    this.horas = this.gerarListaNumeros(0, 23);
    this.minutos = this.gerarListaNumeros(0, 59);
    this.tipos = [
      Tipo.INICIO_TRABALHO,
      Tipo.INICIO_ALMOCO,
      Tipo.TERMINO_ALMOCO,
      Tipo.TERMINO_TRABALHO
    ];
    this.gerarForm();
    this.obterDadosLancamento();
  }

  obterDadosLancamento() {
    this.lancamentoService.buscarPorId(this.lancamentoId)
      .subscribe(
        dados => {
          const data = dados.data.data;
          this.form.get('data').setValue(data.substr(0, 10));
          this.form.get('horas').setValue(data.substr(11, 2));
          this.form.get('minutos').setValue(data.substr(14, 2));
          this.form.get('tipo').setValue(dados.data.tipo);
          this.localizacao = dados.data.localizacao;
        },
        err => {
          const msg: string = "Erro obtendo lançamento";
          this.sncakBar.open(msg, "Erro", { duration: 5000 });
          this.router.navigate(['/admin']);
        }
      );
  }

  gerarForm() {
    this.form = this.fb.group({
      data: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      horas: ['', [Validators.required]],
      minutos: ['', [Validators.required]]
    });
  }

  gerarListaNumeros(inicio: number, termino: number) {
    const numeros: string[] = Array();
    for (let i = inicio; i <= termino; i++) {
      let numero: string = i.toString();
      if (i < 10) {
        numero = "0" + numero;
      }
      numeros.push(numero);
    }
    return numeros;
  }

  atualizar() {
    if (this.form.invalid) return;

    const dados = this.form.value;
    this.lancamentoService.atualizar(this.obterLancamento(dados))
      .subscribe(
        data => {
          const msg: string = "Lancamento atualizado com sucesso!";
          this.sncakBar.open(msg, "Sucesso", { duration: 5000 });
          this.router.navigate(['/admin']);
        },
        err => {
          let msg: string = "Tente novamente em instantes.";
          if (err.status == 400) {
            msg = err.error.errors.join(' ');
          }
          this.sncakBar.open(msg, "Erro",{ duration: 5000 });
        }
      );
  }

  obterLancamento(dados: any): Lancamento{
    const data = moment(dados.data);
    data.set(
      {
        hour: dados.horas,
        minute: dados.minutos,
        second: 0
      }
    );

    return new Lancamento(
      data.format('YYYY-MM-DD HH:mm:ss'),
      dados.tipo,
      this.localizacao,
      this.funcionarioId,
      this.lancamentoId
    );
  }

  get funcionarioId(): string{
    return sessionStorage['funcionarioId']
  }

}
