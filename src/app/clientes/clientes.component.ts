import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { Guid } from 'guid-typescript';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes!: Cliente[];
  formulario: any;

  constructor() { }

  ngOnInit(): void {
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

}
