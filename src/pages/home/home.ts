import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  arquivo: MediaObject = this.media.create('/storage/emulated/0/Download/lobo.mp3');
  pause = false;
  pp="play";
  loader: any;

  constructor(public navCtrl: NavController,
              private media: Media,
              public loadingCtrl: LoadingController) {
            
  }

    public toca(){
    //  this.arquivo = this.media.create('/storage/sdcard0/DCIM/Podcast MdM Melhores do Mundo1499513298.mp3');
    //const arquivo: MediaObject = this.media.create('https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3');

      if (this.pp=="play"){
        this.pp="pause";
        console.log("Tocando arquivo");
        if (!this.pause){
          this.startLoad("Carregando...");
          this.arquivo.play();  
          this.endLoad();
        }else{
          this.arquivo.play();
        }
      }else{
        this.pp="play";
        this.arquivo.pause();
        this.pause=true;
      }
    
    }


    public para(){
     console.log("parando arquivo");
     this.arquivo.stop();   
     this.pause = false;  
     this.pp="play";
    }

    private startLoad(load){
      this.loader = this.loadingCtrl.create({
      content: load,
      }); 
    this.loader.present();
    }

    private endLoad(){
      this.loader.dismiss();
    }
}
