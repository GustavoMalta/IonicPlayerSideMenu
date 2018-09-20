//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Storage } from '@ionic/storage'
import { DatePipe } from '@angular/common';

@Injectable()
export class ListaProvider {

  constructor(public storage: Storage ) {
    console.log('Hello ListaProvider Provider');
  }
  
 

  public insert(caminho: string) {
    let key = Math.random().toString(36).replace(/[^a-z]+/g, '')
    return this.save(key, caminho);
  }
 
  public update(key: string, caminho: string) {
    return this.save(key, caminho);
  }
 
  private save(key: string, caminho: string) {
    return this.storage.set(key, caminho);
  }
 
  public remove(key: string) {
    return this.storage.remove(key);
  }

  public limpa() {
    return this.storage.clear();
  }

  public getAll() {

    let arquivos: Lista[];

    return this.storage.forEach((value: string, key: string, iterationNumber: Number) => {
      let arquivo = new Lista();
      arquivo.key = key;
      arquivo.nome = value;
      arquivos.push(arquivo);
    })
      .then(() => {
        return Promise.resolve(arquivos);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}
export class nomes{
                }

export class Lista {
  key: string
  nome: string
  caminho: string
}
