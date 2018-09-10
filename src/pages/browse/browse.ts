import { Component, NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
//import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { HomePage } from '../home/home';

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
  savedParentNativeURLs = [];
  items;
  teste;
    
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              //private file: File,
              private platform: Platform,
              private fileChooser: FileChooser,
              public filePath: FilePath,
              public plt: Platform,
              public ngZone: NgZone ) {
   plt.ready()
    .then(() => {
      this.listRootDir();
    })
  }
  
  ionViewDidLoad() {
    
    
  }

  listRootDir = () => {

    const ROOT_DIRECTORY = "file:///sdcard/Download/";

    (<any> window).resolveLocalFileSystemURL(ROOT_DIRECTORY,
      (fileSystem) => {

        var reader = fileSystem.createReader();
        reader.readEntries(
          (entries) => {
            this.ngZone.run(()=> {
             // if(entries.name === '.mp3'){
              this.items = entries;
              this.teste = JSON.stringify(entries);
              
            });
          }, this.handleError);
      }, this.handleError);
  }
  handleError = error => { //to fix handleError's
    console.log("error reading,", error);
  };

  toPlayer(caminho){
    this.navCtrl.push(HomePage,caminho)
    
  }

}
 /* fileChoose(){
    // choose your file from the device
	this.fileChooser.open().then(uri => {
		alert('uri'+JSON.stringify(uri));
        // get file path
		this.filePath.resolveNativePath(uri)
		.then(file => {
			alert('file'+JSON.stringify(file));
			let filePath: string = file;
			if (filePath) {
                // convert your file in base64 format
				this.base64.encodeFile(filePath)
                .then((base64File: string) => {
					alert('base64File'+JSON.stringify(base64File));
				}, (err) => {
					alert('err'+JSON.stringify(err));
				});
      
		})
		.catch(err => console.log(err));
	})
	.catch(e => alert('uri'+JSON.stringify(e)));
  }

}
}*/


    /*this.platform.ready().then(() => {
      this.file.listDir(this.file.externalDataDirectory,'').then((result)=>{
       console.log(result);
      //result will have an array of file objects with 
      //file details or if its a directory
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
      })
      })
      

     this.platform.ready().then(() => {
   console.log('ionViewDidLoad BrowsePage');
    this.file.listDir('/storage/emulated/0/Download/', '').then(list => {
      this.info = JSON.parse(list.toString());
    }).catch(err => {
      //receives err = { "code": "JSON error } in Android 4.4
    });
     this.file.listDir('/storage/emulated/0/Download/','');
  }*/
  

  /*onDeviceReady(){
  }
    
      public teste(){

        window.plugins.mfilechooser.open(['.mp3'], function (uri) {

          alert(uri);
    
        }, function (error) {
    
            alert(error);
    
        });


      }*/

