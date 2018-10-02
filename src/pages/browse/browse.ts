import { Component, NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, List } from 'ionic-angular';
//import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { HomePage } from '../home/home';
import { ListaProvider, Arquivo, Lista } from '../../providers/lista/lista';
import { elementEnd } from '@angular/core/src/render3/instructions';
import { JsonPipe } from '@angular/common';
import { stringify } from '@angular/compiler/src/util';
import { TypeModifier } from '@angular/compiler/src/output/output_ast';

/**
 * Generated class for the BrowsePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-browse',
  templateUrl: 'browse.html',
})
export class BrowsePage {
  itensFiltrado;
  savedParentNativeURLs = [];
  ItensCompelto;
  teste;
  dirAtual;
    
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              //private file: File,
              private platform: Platform,
              private fileChooser: FileChooser,
              public filePath: FilePath,
              public plt: Platform,
              public ngZone: NgZone,
              public lista: ListaProvider) {
   plt.ready()
    .then(() => {
      this.listRootDir();
    })
  }
  
  ionViewDidLoad() {
    
    
  }

  listRootDir = () => {

    const ROOT_DIRECTORY = "file:///sdcard/";
    this.dirAtual = ROOT_DIRECTORY;

    (<any> window).resolveLocalFileSystemURL(ROOT_DIRECTORY,
      (fileSystem) => {

        var reader = fileSystem.createReader();
        this.dirAtual=(reader.localURL);
        reader.readEntries(
          (entries) => {

              this.ngZone.run(()=> {
                this.itensFiltrado='';
                
              this.itensFiltrado = this.filtro(entries);
                

              
              this.teste = JSON.stringify(this.ItensCompelto); 
            });
          }, this.handleError);
      }, this.handleError);

   
  }
  handleError = error => { //to fix handleError's
    console.log("error reading,", error);

  };

  toPlayer(arquivo, caminho){
    this.lista.insert(arquivo);
    this.navCtrl.setRoot(HomePage, caminho);
  }

goDown (item){
    let childName = this.ItensCompelto[0].name;
    let childNativeURL = this.ItensCompelto[0].nativeURL;

    const parentNativeURL = childNativeURL.replace(childName, "");

    this.savedParentNativeURLs.push(parentNativeURL);

    this.ItensCompelto.forEach(temp => { 
      if((temp.nativeURL.indexOf(item.nativeURL)>=0)){
        var reader = temp.createReader();
        this.dirAtual=(reader.localURL);
        
        //this.teste = JSON.stringify(temp.createReader());

        reader.readEntries(children => {
          this.ngZone.run(() => {
            this.itensFiltrado = this.filtro(children);
            this.teste = JSON.stringify(children);
        });
      }, this.handleError);
    }
    
  console.log('depois'+JSON.stringify(this.itensFiltrado));
});
    
  
}

goUp(){
  const parentNativeURL = this.savedParentNativeURLs.pop();

    (<any> window).resolveLocalFileSystemURL(parentNativeURL,
      (fileSystem) => {

        var reader = fileSystem.createReader();
        this.dirAtual=(reader.localURL);

        reader.readEntries(
          (entries) => {
            this.ngZone.run(()=> {
              this.itensFiltrado = this.filtro(entries);
            })
          }, this.handleError);
      }, this.handleError);
}

filtro(pasta){
  let x=true;
  let filtrado;
  this.ItensCompelto = pasta;
  console.log('antes'+JSON.stringify(pasta));
  //if(completo.hasReadEntries)
  pasta.forEach(element => { //se é um diretorio
    if(element.isDirectory){
        if(x){
          filtrado='[';
          filtrado = filtrado + JSON.stringify(element);
          x=false;
        }else{
          filtrado = filtrado + ',' + JSON.stringify(element);
        }
    }
  });

  pasta.forEach(element => { //se é um mp3
    if((element.name.indexOf(".mp3")>=0)){
        if(x){
          filtrado='[';
          filtrado = filtrado + JSON.stringify(element);
          x=false;
        }else{
          filtrado = filtrado + ',' + JSON.stringify(element);
        }
    }
});
  if(x){
    return JSON.parse('[{"isVazio":true}]')
  }
  filtrado = filtrado + ']';
  return JSON.parse(filtrado);
}

}