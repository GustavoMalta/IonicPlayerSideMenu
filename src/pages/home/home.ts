import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private media: Media) {
            
  }
  
         

    public toca(){
      const arquivo: MediaObject = this.media.create(encodeURI('/storage/sdcard0/DCIM/Podcast MdM Melhores do Mundo1499513298.mp3'));

    //const arquivo: MediaObject = this.media.create('../assets/lobo.mp3');

    console.log("Tocando arquivo");
    
    arquivo.play();                  

                }

}
