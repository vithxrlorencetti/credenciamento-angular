import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { Guid } from 'guid-typescript';
import { FormGroup, FormControl } from '@angular/forms';
import { CepServiceService } from '../cep-service.service';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes!: Cliente[];
  formulario: any;

  constructor(
    private cepService: CepServiceService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.ListarClientes();
    this.formulario = new FormGroup({
      id: new FormControl(),
      nome: new FormControl(),
      tipoCliente: new FormControl(),
      documento: new FormControl(),
      nomeFantasia: new FormControl(),
      CEP: new FormControl(),
      endereco: new FormControl(),       
      bairro: new FormControl(),    
      cidade: new FormControl(),     
      email: new FormControl(),    
      telefone: new FormControl(),
    });
  }

  CadastrarCliente() : void{
    this.formulario.value.id = Guid.create().toString();
    const cliente : Cliente = this.formulario.value;
    this.clientes.push(cliente);
    localStorage.setItem("BD", JSON.stringify(this.clientes));
    this.formulario.reset();
  }

  ListarClientes() : void{
    
    if(localStorage.getItem('BD')){
      this.clientes = JSON.parse(localStorage.getItem('BD')!);
    }
    else{
      this.clientes = [];
    }
  }

  consultaCep(valor: any, formulario: any){
    this.cepService.buscar(valor).subscribe((dados) => this.populaForm(dados, this.formulario));
  }

  populaForm(dados: any, formulario: any){
    this.formulario.patchValue({
      CEP: dados.CEP,
      endereco: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
    })
  }

  selectedType = 'opentype';

  onChange(event: any) {
    this.selectedType = event.target.value;
  }
  

}
