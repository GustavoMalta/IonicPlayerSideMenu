import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';


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
info;
    
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private file: File,
              private platform: Platform ) {
  }


  ionViewDidLoad() {
    this.platform.ready().then(() => {
      file.listDir(file.externalDataDirectory,'').then((result)=>{
       console.log(result);
      /*result will have an array of file objects with 
      file details or if its a directory*/
      for(let file of result){
        if(file.isDirectory == true && file.name !='.' && file.name !='..'){
        // Code if its a folder
      }else if(file.isFile == true){
        // Code if its a file
        let name=file.name // File name
        let path=file.path // File path
          file.getMetadata(function (metadata) {
          let size=metadata.size; // Get file size
          })
      }
        }
      }
      })
    /*console.log('ionViewDidLoad BrowsePage');
    this.file.listDir('/storage/emulated/0/Download/', '').then(list => {
      this.info = JSON.parse(list.toString());
    }).catch(err => {
      //receives err = { "code": "JSON error } in Android 4.4
    });
     //this.file.listDir('/storage/emulated/0/Download/','').;
     */
  });

    }

}
