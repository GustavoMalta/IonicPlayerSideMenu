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
  
 

  public insert(caminho:string, arquivo: string) {
   //let key = Math.random().toString(36).replace(/[^a-z]+/g, '')
    return this.save(caminho, arquivo);
  }
 
  public update(key: string, arquivo:string) {
    return this.save(key, arquivo);
  }
 
  private save(key: string, arquivo:string) {
    //let temptemp.caminho=caminho; temp.nome=nome;
    
   
    return this.storage.set(key,arquivo);
  }
 
  public remove(key: string) {
    return this.storage.remove(key);
  }

  public limpa() {
    return this.storage.clear();
  }

  public getAll() {

    let arquivos: Lista[]=[];

    return this.storage.forEach((value: string, key: string, iterationNumber: Number) => {
      let file = new Lista();
      file.path = key;
      file.nome = value;
      arquivos.push(file);
    })
      .then(() => {
        return Promise.resolve(arquivos);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}
/*export class arquivo{
  nome: string;
  caminho: string;
                }
*/
export class Lista {
  path: string;
  nome: string;
}
